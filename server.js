const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const multer = require("multer");
const sharp = require("sharp");
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const archiver = require('archiver'); // for creating ZIP
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cliProgress = require('cli-progress');
const pLimit = require('p-limit');
const fsp = fs.promises;



const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "f6e8f9bcb2e34c93880ec8541a4e80a2e6a1f1734a30e945f6f5d8d5f97c4f84",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Base paths
const usersDir = path.join(__dirname, "users");
console.log("📍 usersDir resolved to:", usersDir);




console.log('Users directory is:', usersDir)
const categoriesFilePath = path.join(__dirname, "data/categories.json");
const uploadDir = path.join(__dirname, "uploads");

// Ensure directories and base files exist
if (!fs.existsSync(categoriesFilePath)) {
  fs.writeFileSync(categoriesFilePath, JSON.stringify({ REGIONS: {} }, null, 2));
}
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ✅ Helper to get user folder path
function getUserDir(accountId) {
  return path.join(usersDir, accountId);
}

// ✅ Helper to get user file path
function getUserFilePath(accountId) {
  return path.join(usersDir, accountId, `${accountId}.json`);
}


// ✅ Save user to nested folder structure
function saveUserRecord(userRecord) {
  const accountId = userRecord.accountId;
  const userDir = getUserDir(accountId);
  const userFilePath = getUserFilePath(accountId);

  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
  fs.writeFileSync(userFilePath, JSON.stringify([userRecord], null, 2));
}
console.log("📌 Loaded from:", __filename);


// ✅ Read all user records
function findUserByEmail(email) {
  if (!email) return null;
  const wanted = email.trim().toLowerCase();

  if (!fs.existsSync(usersDir)) return null;

  const topEntries = fs.readdirSync(usersDir, { withFileTypes: true });

  // First, check JSON files directly inside /users/ (legacy)
  for (const e of topEntries) {
    if (e.isFile() && e.name.endsWith(".json")) {
      const fp = path.join(usersDir, e.name);
      try {
        const data = JSON.parse(fs.readFileSync(fp, "utf8"));
        const arr = Array.isArray(data) ? data : [data];
        for (const u of arr) {
          if (u?.email && u.email.toLowerCase() === wanted) {
            return { user: u, accountId: u.accountId || null, folderName: null, filePath: fp };
          }
        }
      } catch (err) {
        console.warn("Skipping invalid JSON:", fp, err.message);
      }
    }
  }

  // Next, search inside each folder under /users/
  for (const e of topEntries) {
    if (!e.isDirectory()) continue;
    const folderName = e.name;
    const folderPath = path.join(usersDir, folderName);
    let files = [];
    try {
      files = fs.readdirSync(folderPath);
    } catch (err) {
      console.warn("Could not read folder:", folderPath, err.message);
      continue;
    }

    // check any .json file inside the folder
    for (const f of files.filter(x => x.endsWith(".json"))) {
      const fp = path.join(folderPath, f);
      try {
        const data = JSON.parse(fs.readFileSync(fp, "utf8"));
        const arr = Array.isArray(data) ? data : [data];
        for (const u of arr) {
          if (u?.email && u.email.toLowerCase() === wanted) {
            // Use accountId from file if present, otherwise fall back to folderName
            const accountId = u.accountId || folderName;
            return { user: u, accountId, folderName, filePath: fp };
          }
        }
      } catch (err) {
        console.warn("Skipping invalid JSON:", fp, err.message);
      }
    }
  }

  return null;
}















// Multer setup for image uploads
const storage = multer.memoryStorage();

// Define allowed file types and max size
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check if the file's mimetype is in the allowed list
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      // Reject the file and provide an error message
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, AVIF, and GIF are allowed.'), false);
    }
  },
  limits: {
    fileSize: MAX_FILE_SIZE // Set the maximum file size
  }
});

// 📌 Process and Save Image
const processImage = async (buffer, fileName) => {
  const filePath = path.join(uploadDir, fileName);
  await sharp(buffer)
    .resize({ width: 1280, height: 720, fit: "inside" })
    .toFormat("webp", { quality: 80 })
    .toFile(filePath);
  return `/uploads/${fileName}`; // Corrected template literal
};

// 1. DEFINE updateStorage FIRST
const updateStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure this directory exists!
        // It's good practice to make sure the directory is relative to server.js
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Use the full path
    },
    filename: function (req, file, cb) {
        // Generate a unique filename to prevent collisions and ensure new uploads are distinct
        // Example: event_timestamp_randomnumber.extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Get original extension
        cb(null, `event_${uniqueSuffix}${fileExtension}`);
    }
});

// 2. THEN, INITIALIZE multer using updateStorage
const updateUpload = multer({ storage: updateStorage }); // <-- updateStorage is now defined her


// 📌 Generate Unique Account ID
const generateAccountId = () => "user-" + Date.now();

app.post("/register-email", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords do not match" });

    const existingUsers = readAllUsers();
    if (existingUsers.some((user) => user.email === email)) {
      return res.status(400).json({ error: "Account already exists for this email. Use the appropriate sign-in method." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountId = generateAccountId();
    const newUser = { accountId, email, password: hashedPassword };

    fs.writeFileSync(getUserFilePath(accountId), JSON.stringify([newUser], null, 2));

    console.log("✅ New user registered:", newUser);
    res.json({ message: "User registered successfully!", accountId });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});


// 📌 Updated Login Endpoint
app.post("/login-email", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const found = findUserByEmail(email);
    if (!found) {
      return res.status(400).json({ error: "User not found" });
    }

    const { user, accountId, filePath } = found;
    console.log("🔎 Found user:", user.email, "accountId:", accountId, "file:", filePath);

    // If this account has no password, it's a Google/Apple account
    if (!user.password) {
      return res.status(403).json({ error: "This email is linked to a Google account. Please use Google Sign-In." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Ensure accountId exists (if missing in file, use folder name)
    const finalAccountId = user.accountId || accountId || null;
    if (!finalAccountId) {
      console.warn("⚠️ No accountId found for user, generating one.");
      const newId = generateAccountId();
      user.accountId = newId;
      saveUserRecord(user); // will create users/<newId>/<newId>.json
      req.session.user = { accountId: newId, email: user.email };
      return res.json({ message: "User logged in successfully!", accountId: newId });
    }

    req.session.user = { accountId: finalAccountId, email: user.email };
    console.log("✅ User logged in:", req.session.user);
    return res.json({ message: "User logged in successfully!", accountId: finalAccountId });
  } catch (err) {
    console.error("❌ Error logging in user:", err);
    res.status(500).json({ error: "Failed to log in user" });
  }
});






// 📌 Google Sign-In Login Endpoint
app.post("/google-login", async (req, res) => {
  try {
    const { email, access_token } = req.body;

    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const profile = await profileRes.json();
    let { name, picture, sub: googleId } = profile;

    if (!email) return res.status(400).json({ error: "Email is required" });

    // 🔍 Look through user folders for matching email
    let accountId = null;
    const userDirs = fs.readdirSync(usersDir).filter((file) => {
      const fullPath = path.join(usersDir, file);
      return fs.lstatSync(fullPath).isDirectory();
    });

    for (const dir of userDirs) {
      const userFilePath = path.join(usersDir, dir, `${dir}.json`);
      if (fs.existsSync(userFilePath)) {
        try {
          const userData = JSON.parse(fs.readFileSync(userFilePath, "utf8"))[0];
          if (userData.email?.toLowerCase() === email.toLowerCase()) {
            accountId = userData.accountId;
            break;
          }
        } catch (err) {
          console.warn(`Could not parse user file: ${userFilePath}`, err);
        }
      }
    }

    // If no match, create a new user
    if (!accountId) {
      accountId = generateAccountId();
      const userRecord = {
        accountId,
        email,
        name,
        googleId,
      };
      const userFolder = path.join(usersDir, accountId);
      if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder, { recursive: true });

      const userFilePath = path.join(userFolder, `${accountId}.json`);
      fs.writeFileSync(userFilePath, JSON.stringify([userRecord], null, 2));
      console.log("✅ New Google login user created:", userRecord);
    }

    // Load user info again
    const userFile = path.join(usersDir, accountId, `${accountId}.json`);
    const user = JSON.parse(fs.readFileSync(userFile, "utf8"))[0];

    // Set session
    req.session.user = {
      accountId: user.accountId,
      email: user.email,
      name: user.name,
      picture,
    };

    res.json({
      message: "User logged in successfully!",
      accountId: user.accountId,
      email: user.email,
      name: user.name,
      picture,
    });
  } catch (error) {
    console.error("❌ Error during Google login:", error);
    res.status(500).json({ error: "Failed to log in with Google" });
  }
});



// 📌 Apple Sign-In Login Endpoint
app.post("/apple-login", async (req, res) => {
  const { id_token, user } = req.body;

  if (!id_token) {
    return res.status(400).json({ error: "Missing ID token" });
  }

  const client = jwksClient({ jwksUri: "https://appleid.apple.com/auth/keys" });

  function getAppleKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) return callback(err);
      callback(null, key.getPublicKey());
    });
  }

  jwt.verify(id_token, getAppleKey, { algorithms: ["RS256"] }, async (err, decoded) => {
    if (err) {
      console.error("❌ Apple ID token verification failed:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    const { email, sub: appleId } = decoded;

    try {
      const users = readAllUsers();
      let userRecord = users.find(u => u.appleId === appleId || u.email?.toLowerCase() === email?.toLowerCase());

      if (!userRecord) {
        const accountId = generateAccountId();
        userRecord = {
          accountId,
          email,
          appleId,
          name: user?.name || null,
        };
        saveUserRecord(userRecord);
        console.log("✅ New Apple login user created:", userRecord);
      } else {
        console.log("🔁 Existing Apple user logged in:", userRecord);
      }

      req.session.user = {
        accountId: userRecord.accountId,
        email: userRecord.email,
      };

      res.json({
        message: "User logged in successfully!",
        accountId: userRecord.accountId,
        email: userRecord.email,
      });

    } catch (error) {
      console.error("❌ Error during Apple login:", error);
      res.status(500).json({ error: "Failed to log in with Apple" });
    }
  });
});



// 📌 Logout Endpoint
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Failed to log out" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully!" });
  });
});

// 📌 Check Authentication
app.get("/check-auth", (req, res) => {
  console.log("check-auth request received");
  console.log("req.session.user:", req.session.user);
  if (req.session.user) {
      res.json({
          loggedIn: true,
          accountId: req.session.user.accountId,
          user: req.session.user,
      });
  } else {
      res.json({ loggedIn: false, user: null });
  }
});

// 🔹 User Info Endpoint
app.get("/user-info", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "User not logged in" });
  }
  res.json(req.session.user);
});






// Email sender function
function sendOrderConfirmationEmail(email, orderDetails) {
  // Calculate total price (parse price since they might be strings)
  const totalPrice = orderDetails.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const subject = "Your Order Confirmation – My Cup Of Earth";

  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
      <div style="margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <img src="${COMPANY_LOGO_URL}" alt="Company Logo" style="width: 100px; height: auto; margin-right: 15px;">
        <h2 style="color: #0066ff; margin: 0;">Thank You For Your Purchase!</h2>
          
          </div>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
        <p>We've received your order and it's now being processed.</p>
        <p><strong>Order Summary:</strong></p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; border-bottom: 1px solid #ccc; padding: 8px;">Item</th>
              <th style="text-align: right; border-bottom: 1px solid #ccc; padding: 8px;">Quantity</th>
              <th style="text-align: right; border-bottom: 1px solid #ccc; padding: 8px;">Price</th>
              <th style="text-align: right; border-bottom: 1px solid #ccc; padding: 8px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${orderDetails
              .map(
                (item) => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${parseFloat(item.price).toFixed(2)}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
            <tr>
              <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 8px; text-align: right; font-weight: bold;">$${totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          Best regards,<br>
          <strong>MY CUP OF EARTH</strong><br>
          <a href="https://m-cochran.github.io/Randomerr/" style="color: #0056b3; text-decoration: none;">Visit our website</a>
        </p>
        <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
          Follow us on social media:
        </p>
      <div style="margin-top: 10px;">
        <a href="https://www.facebook.com/profile.php?id=100074631399155" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://x.com/MyCupOfEarth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png" alt="Twitter Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.instagram.com/mycupofearth/" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.tiktok.com/@mycupofearth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ionicons_logo-tiktok.svg/512px-Ionicons_logo-tiktok.svg.png?20230423144016" alt="TikTok Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/512px-YouTube_social_white_squircle.svg.png?20200112151940" alt="Youtube Logo" style="width: 24px; height: 24px; border: none;">
        </a>
      </div>

        <footer style="margin-top: 20px; font-size: 12px; color: #666;">
          <p>© ${new Date().getFullYear()} MY CUP OF EARTH. All rights reserved.</p>
        </footer>
      </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: '"MY CUP OF EARTH" <your.email@gmail.com>',
    to: email,
    subject: subject,
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Failed to send order email to ${email}:`, err);
    } else {
      console.log(`Order confirmation sent to ${email}:`, info.response);
    }
  });
}





















// 📌 Save Order
const PRINTFUL_API_KEY = 'WobRaX7QqTL73AsDLuQS4BNEYaH49l8idVDdTWz2';

app.post("/save-order", async (req, res) => {
  try {
    const newOrder = req.body;

    // Inject external_variant_id into cartItems
    const productsPath = path.join(__dirname, "Products.json");
    const productData = fs.existsSync(productsPath)
      ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
      : [];

    newOrder.cartItems = newOrder.cartItems.map((item) => {
      const variant = productData.flatMap(p => p.sync_variants).find(v => v.sku === item.sku);
      if (!variant || !variant.external_id) {
        throw new Error(`Cart item missing external_id: ${JSON.stringify(item)}`);
      }
      return { ...item, external_id: variant.external_id };
    });

    // Construct Printful order payload
    const orderData = {
      recipient: {
        name: newOrder.customer.name,
        address1: newOrder.customer.address.line1,
        city: newOrder.customer.address.city,
        state_code: newOrder.customer.address.state,
        country_code: newOrder.customer.address.country,
        zip: newOrder.customer.address.postal_code,
        phone: newOrder.customer.phone,
        email: newOrder.customer.email
      },
      items: newOrder.cartItems.map(item => ({
        external_variant_id: item.external_id,
        quantity: item.quantity
      })),
      external_id: newOrder.orderId,
      shipping: "STANDARD"
    };

    // Send order to Printful
    let printfulResponse, printfulResult;
    try {
      printfulResponse = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      printfulResult = await printfulResponse.json();

      if (!printfulResponse.ok) {
        console.error("Error from Printful:", printfulResult);
        throw new Error(printfulResult.error || 'Failed to send order to Printful');
      }

      console.log("✅ Order sent to Printful:", printfulResult);

// Enrich newOrder with tracking-related data
newOrder.printfulOrderId = printfulResult.result.id;
newOrder.tracking_numbers = [];          // Array of tracking numbers
newOrder.tracking_urls = [];             // Array of tracking URLs (in same order)
newOrder.tracking_email_sent = [];       // Array of booleans for each tracking number sent

    } catch (pfErr) {
  console.error("❌ Failed to send order to Printful:", pfErr);
  newOrder.printfulOrderId = null;
  newOrder.tracking_numbers = [];
  newOrder.tracking_urls = [];
  newOrder.tracking_email_sent = [];
}


 // Save order as users/{accountId}/orders/{accountId}_{orderId}.json
const ordersDir = path.join(__dirname, "users", newOrder.accountId, "orders");
const orderFile = path.join(ordersDir, `${newOrder.accountId}_${newOrder.orderId}.json`);

try {
  fs.mkdirSync(ordersDir, { recursive: true });
  fs.writeFileSync(orderFile, JSON.stringify(newOrder, null, 2));
  console.log("✅ Order saved:", orderFile);
  trackAffiliateSales();
} catch (err) {
  console.error("❌ Failed to save order:", err);
  return res.status(500).json({ error: "Failed to save order" });
}






function trackAffiliateSales() {
  const usersDir = path.join(__dirname, 'users');
  const userFolders = fs.readdirSync(usersDir, { withFileTypes: true })
    .filter(e => e.isDirectory());

  for (const userFolder of userFolders) {
    const ordersDir = path.join(usersDir, userFolder.name, 'orders');
    if (!fs.existsSync(ordersDir)) continue;

    const affiliateDir = path.join(usersDir, userFolder.name, 'affiliate-data');
    const affiliateFile = path.join(affiliateDir, 'affiliatecode.json');
    if (!fs.existsSync(affiliateFile)) continue;

    let affJson;
    try {
      affJson = JSON.parse(fs.readFileSync(affiliateFile, 'utf8'));
    } catch (err) {
      console.error(`❌ Error reading ${affiliateFile}:`, err.message);
      continue;
    }

    const orderFiles = fs.readdirSync(ordersDir).filter(f => f.endsWith('.json'));

    for (const orderFile of orderFiles) {
      const orderPath = path.join(ordersDir, orderFile);

      try {
        const orderDataArray = JSON.parse(fs.readFileSync(orderPath, 'utf8'));
        const orderData = Array.isArray(orderDataArray) ? orderDataArray[0] : orderDataArray;

        if (!orderData.affiliateRef) continue;

        // If this affiliatecode.json contains the affiliateRef key, update it
        if (affJson[orderData.affiliateRef]) {
          const affObj = affJson[orderData.affiliateRef];
          if (!Array.isArray(affObj.sales)) affObj.sales = [];

          const alreadyExists = affObj.sales.some(s => s.orderId === orderData.orderId);
          if (!alreadyExists) {
            affObj.sales.push({
              orderId: orderData.orderId,
              amount: orderData.totalAmount || 0,
              date: orderData.orderDate || new Date().toISOString()
            });
            console.log(`🏷️ Sale recorded for affiliate: ${orderData.affiliateRef}`);
          }

          // Save back the updated affiliate file
          fs.writeFileSync(affiliateFile, JSON.stringify(affJson, null, 2));
        }
      } catch (err) {
        console.error(`❌ Error processing order ${orderFile}:`, err.message);
      }
    }
  }
}












// Clear cart and reminders (per-user folder)
if (newOrder.accountId) {
  try {
    const savedCartDir = path.join(__dirname, "users", newOrder.accountId, "saved-cart");
    const cartsFilePath = path.join(savedCartDir, "UserSavedCarts.json");
    const remindersPath = path.join(savedCartDir, "RemindersSent.json");

    // Ensure saved-cart directory exists
    if (!fs.existsSync(savedCartDir)) {
      fs.mkdirSync(savedCartDir, { recursive: true });
    }

    // Clear saved cart
    if (fs.existsSync(cartsFilePath)) {
      const carts = JSON.parse(fs.readFileSync(cartsFilePath, "utf8"));
      if (carts[newOrder.accountId]) {
        delete carts[newOrder.accountId];
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
        console.log(`🧹 Cleared cart for accountId: ${newOrder.accountId}`);
      }
    }

    // Clear reminders
    if (fs.existsSync(remindersPath)) {
      const reminders = JSON.parse(fs.readFileSync(remindersPath, "utf8"));
      if (reminders[newOrder.accountId]) {
        delete reminders[newOrder.accountId];
        fs.writeFileSync(remindersPath, JSON.stringify(reminders, null, 2));
        console.log(`🧹 Cleared reminders for accountId: ${newOrder.accountId}`);
      }
    } else {
      // If file doesn't exist, create it empty
      fs.writeFileSync(remindersPath, JSON.stringify({}, null, 2));
    }

  } catch (cleanupErr) {
    console.error("❌ Error clearing cart or reminders:", cleanupErr);
  }
}

// Send confirmation email
if (newOrder.customer?.email && Array.isArray(newOrder.cartItems) && newOrder.cartItems.length > 0) {
  sendOrderConfirmationEmail(newOrder.customer.email, newOrder.cartItems);
  console.log(`📧 Sent order confirmation email to ${newOrder.customer.email}`);
}

res.json({ message: "Order saved successfully!" });
} catch (error) {
  console.error("❌ Error saving order:", error);
  res.status(500).json({ error: "Failed to save order" });
}
});






























// 📌 Add Event with Image
app.post("/upload-event", upload.array("images"), async (req, res) => {
  try {
      if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });

      const { title, description, date, location, region, province, city, category, price, accountId, chatType } = req.body;
      if (!title || !description || !date || !location || !region || !province || !city || !category) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const formattedCategory = category.replace("-", " ");
      let imagePaths = [];
      let coverImage = null;

      if (req.files && req.files.length > 0) {
          for (const file of req.files) {
              // No need for explicit size check here as Multer's limits handle it
              // No need for explicit type check here as Multer's fileFilter handles it

              const fileName = `event_${Date.now()}_${Math.round(Math.random() * 1E9)}.webp`; // Corrected template literal
              const imagePath = await processImage(file.buffer, fileName);
              imagePaths.push(imagePath);
          }
          if (imagePaths.length > 0) {
              coverImage = imagePaths[0];
              imagePaths = [coverImage, ...imagePaths.slice(1)];
          }
      }

      // Read and update categories.json
      fs.readFile(categoriesFilePath, "utf8", (err, data) => {
          if (err) return res.status(500).json({ message: "Error reading categories" });

          let categories = JSON.parse(data);

          // Find the last used ID across all categories
          let maxIdNumber = 0;
          for (const regionKey in categories.REGIONS) {
              for (const provinceKey in categories.REGIONS[regionKey]) {
                  for (const cityKey in categories.REGIONS[regionKey][provinceKey]) {
                      if (categories.REGIONS[regionKey][provinceKey][cityKey].categories) {
                          for (const categoryKey in categories.REGIONS[regionKey][provinceKey][cityKey].categories) {
                              const categoryEvents = categories.REGIONS[regionKey][provinceKey][cityKey].categories[categoryKey];
                              if (categoryEvents && categoryEvents.length > 0) {
                                  for (const event of categoryEvents) {
                                      const eventIdNumber = parseInt(event.id.replace("event-", ""));
                                      if (!isNaN(eventIdNumber) && eventIdNumber > maxIdNumber) {
                                          maxIdNumber = eventIdNumber;
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }

          const nextIdNumber = maxIdNumber + 1;
          const eventId = "event-" + nextIdNumber;

          const newEvent = {
              id: eventId,
              accountId: accountId, // Add accountId to the event object
              title,
              location,
              price: price,
              picture: coverImage,
              description,
              date,
              images: imagePaths,
              chatType
          };

          if (!categories.REGIONS[region]) categories.REGIONS[region] = {};
          if (!categories.REGIONS[region][province]) categories.REGIONS[region][province] = {};
          if (!categories.REGIONS[region][province][city]) categories.REGIONS[region][province][city] = { categories: {} };
          if (!categories.REGIONS[region][province][city].categories[formattedCategory]) {
              categories.REGIONS[region][province][city].categories[formattedCategory] = [];
          }

          categories.REGIONS[region][province][city].categories[formattedCategory].push(newEvent);

          fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2), (err) => {
              if (err) return res.status(500).json({ message: "Error saving event" });
              res.json({ message: "Event uploaded successfully!" });
          });
      });

  } catch (error) {
      console.error("❌ Error uploading event:", error);
      // Handle Multer errors specifically
      if (error instanceof multer.MulterError) {
          if (error.code === 'LIMIT_FILE_SIZE') {
              return res.status(400).json({ error: `File size too large. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` });
          }
      } else if (error.message === 'Invalid file type. Only JPEG, PNG, WebP, AVIF, and GIF are allowed.') {
          return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
  }
});





// 📌 Update Event Endpoint (Simplified)
// 📌 Update Event Endpoint
// Define allowed file types and max size (these should be consistent with your upload-event route)

app.post("/update-event/:id", updateUpload.array("images"), async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const eventId = req.params.id;
        const { title, description, location, price } = req.body;
        // Parse the arrays sent from the frontend
        const removedImages = JSON.parse(req.body.removedImages || "[]");
        const currentExistingImages = JSON.parse(req.body.currentExistingImages || "[]"); // Use this as the definitive list of images to keep

        fs.readFile(categoriesFilePath, "utf8", async (err, data) => {
            if (err) {
                console.error("Error reading categories file:", err);
                return res.status(500).json({ message: "Error reading categories" });
            }

            let categories = JSON.parse(data);
            let eventFound = false;

            for (const regionKey in categories.REGIONS) {
                for (const provinceKey in categories.REGIONS[regionKey]) {
                    for (const cityKey in categories.REGIONS[regionKey][provinceKey]) {
                        const allCategories = categories.REGIONS[regionKey][provinceKey][cityKey].categories;
                        for (const categoryKey in allCategories) {
                            const events = allCategories[categoryKey];
                            const eventIndex = events.findIndex(event => event.id === eventId);

                            if (eventIndex !== -1) {
                                // Check for ownership
                                if (events[eventIndex].accountId !== req.session.user.accountId) {
                                    // If new files were uploaded before ownership check, clean them up
                                    if (req.files && req.files.length > 0) {
                                        // Multer with memory storage means files are in buffer, no need to unlink from disk yet
                                    }
                                    return res.status(403).json({ error: "Forbidden: You do not own this event" });
                                }

                                // Update basic event data and price
                                // Assuming price validation happens on frontend or is handled here if necessary
                                const formattedPrice = parseFloat(price).toLocaleString('en-US');
                                events[eventIndex] = {
                                    ...events[eventIndex],
                                    title,
                                    description,
                                    location,
                                    price: String(formattedPrice)
                                };

                                // --- Image Handling Logic ---

                                // 1. Start with the current existing images that the frontend says to keep
                                let finalImageUrls = [...currentExistingImages];

                                // 2. Process and add newly uploaded images
                                let newUploadedImageUrls = [];
                                if (req.files && req.files.length > 0) {
                                    for (const file of req.files) {
                                        // Multer's fileFilter and limits have already pre-validated these files.
                                        const fileName = `event_${Date.now()}_${Math.round(Math.random() * 1E9)}.webp`;
                                        const imagePath = await processImage(file.buffer, fileName);
                                        newUploadedImageUrls.push(imagePath);
                                    }
                                }

                                // 3. Combine all images
                                finalImageUrls = [...finalImageUrls, ...newUploadedImageUrls];

                                // 4. Enforce the 16-image limit
                                if (finalImageUrls.length > 16) {
                                    // If exceeding limit, delete newly uploaded images that caused the overflow
                                    const excessImages = newUploadedImageUrls.slice(16 - currentExistingImages.length);
                                    excessImages.forEach(url => {
                                        const fileNameToDelete = url.substring(url.lastIndexOf('/') + 1);
                                        const filePathToDelete = path.join(__dirname, 'uploads', fileNameToDelete);
                                        fs.unlink(filePathToDelete, (unlinkErr) => {
                                            if (unlinkErr) console.error("Error deleting excess newly uploaded file:", unlinkErr);
                                        });
                                    });
                                    return res.status(400).json({ error: `You can only have a maximum of 16 images per event. Please remove some existing images or upload fewer new ones.` });
                                }

                                // 5. Update event's image properties
                                if (finalImageUrls.length > 0) {
                                    events[eventIndex].picture = finalImageUrls[0];
                                    events[eventIndex].images = finalImageUrls;
                                } else {
                                    // If all images are removed
                                    delete events[eventIndex].picture;
                                    delete events[eventIndex].images;
                                }

                                // 6. Delete images that were explicitly removed by the user from storage
                                for (const imageUrl of removedImages) {
                                    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                                    const filePath = path.join(__dirname, 'uploads', fileName);

                                    fs.unlink(filePath, (unlinkErr) => {
                                        if (unlinkErr) {
                                            console.error(`Error deleting removed file ${filePath}:`, unlinkErr);
                                        } else {
                                            console.log(`Successfully deleted removed file: ${filePath}`);
                                        }
                                    });
                                }

                                // --- End Image Handling Logic ---

                                fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2), (writeErr) => {
                                    if (writeErr) {
                                        console.error("Error writing categories file after update:", writeErr);
                                        return res.status(500).json({ message: "Error updating event data" });
                                    }
                                    res.json({ message: "Event updated successfully!" });
                                });

                                eventFound = true;
                                break;
                            }
                        }
                        if (eventFound) break;
                    }
                    if (eventFound) break;
                }
                if (eventFound) break;
            }

            if (!eventFound) {
                return res.status(404).json({ message: "Event not found" });
            }
        });
    } catch (error) {
        console.error("❌ Error updating event:", error);
        // Handle Multer errors specifically
        if (error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: `File size too large. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` });
            }
        } else if (error.message === 'Invalid file type. Only JPEG, PNG, WebP, AVIF, and GIF are allowed.') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});




// 📌 Delete Event Endpoint
app.delete("/delete-event/:id", async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });

        const eventId = req.params.id;

        fs.readFile(categoriesFilePath, "utf8", async (err, data) => {
            if (err) return res.status(500).json({ message: "Error reading categories" });

            let categories = JSON.parse(data);
            let eventFound = false;
            let deletedEvent;

            for (const regionKey in categories.REGIONS) {
                for (const provinceKey in categories.REGIONS[regionKey]) {
                    for (const cityKey in categories.REGIONS[regionKey][provinceKey]) {
                        const allCategories = categories.REGIONS[regionKey][provinceKey][cityKey].categories;
                        for (const categoryKey in allCategories) {
                            const events = allCategories[categoryKey];
                            const eventIndex = events.findIndex(event => event.id === eventId);
                            if (eventIndex !== -1) {
                                // Check for ownership
                                if (events[eventIndex].accountId !== req.session.user.accountId) {
                                    return res.status(403).json({ error: "Forbidden: You do not own this event" });
                                }

                                deletedEvent = events.splice(eventIndex, 1)[0]; // Store deleted event
                                eventFound = true;
                                break;
                            }
                        }
                        if (eventFound) break;
                    }
                    if (eventFound) break;
                }
                if (eventFound) break;
            }

            if (eventFound) {
                if (deletedEvent) {
                    await deleteEventImages(deletedEvent); // Wait for images to be deleted
                    await deleteMessagesForEvent(eventId); // Delete messages associated with the event
                }

                fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2), (err) => {
                    if (err) return res.status(500).json({ message: "Error deleting event" });
                    res.json({ message: "Event deleted successfully!" });
                });
            } else {
                return res.status(404).json({ message: "Event not found" });
            }
        });
    } catch (error) {
        console.error("❌ Error deleting event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Function to delete messages associated with an event
// Function to delete messages associated with an event across all users
// Function to delete messages associated with an event across all users
async function deleteMessagesForEvent(eventId) {
  try {
    const usersDir = path.join(__dirname, "users");

    if (!fs.existsSync(usersDir)) return;

    const userFolders = fs.readdirSync(usersDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const accountId of userFolders) {
      const eventMessagesDir = path.join(usersDir, accountId, "messages", eventId);

      if (fs.existsSync(eventMessagesDir)) {
        await fsp.rm(eventMessagesDir, { recursive: true, force: true });
        console.log(`🗑️ Deleted messages for event ${eventId} from user ${accountId}`);
      }
    }
  } catch (error) {
    console.error("❌ Error deleting messages for event:", error);
  }
}




async function deleteEventImages(event) {
  if (!event || !event.images || !Array.isArray(event.images)) return;

  for (const imageUrl of event.images) {
    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    const filePath = path.join(__dirname, "uploads", fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting image: ${filePath}`, err);
      } else {
        console.log(`Deleted image: ${filePath}`);
      }
    });
  }
}


// 📌 Get All Categories
app.get("/categories", (req, res) => {
  fs.readFile(categoriesFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading file" });
    res.json(JSON.parse(data));
  });
});






// --- Helpers ---
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    console.error('Error reading JSON:', filePath, err);
    return [];
  }
}

function writeJSON(filePath, data) {
  try {
    ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing JSON:', filePath, err);
  }
}

// --- Routes ---

// Send message
app.post('/api/messages', (req, res) => {
  const { senderId, receiverId, postId, messageText, conversationId, chatType } = req.body;
  if (!senderId || !receiverId || !postId || !messageText) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const convId = conversationId || Date.now().toString();
  const msgId = convId + '-' + Date.now();

  const newMessage = {
    conversationId: convId,
    messageId: msgId,
    senderId,
    receiverId,
    messageText,
    timestamp: new Date().toISOString(),
    read: false
  };

  // Write to sender and receiver files
  const senderPath = path.join(__dirname, 'users', senderId, 'messages', postId, 'messages.json');
  const receiverPath = path.join(__dirname, 'users', receiverId, 'messages', postId, 'messages.json');

  const senderMessages = readJSON(senderPath);
  const receiverMessages = readJSON(receiverPath);

  senderMessages.push(newMessage);
  receiverMessages.push(newMessage);

  writeJSON(senderPath, senderMessages);
  writeJSON(receiverPath, receiverMessages);

  res.status(201).json({ message: 'Message sent successfully', conversationId: convId });
});

// Read messages for a user & post
app.get('/api/messages/:postId/:accountId', (req, res) => {
  const { postId, accountId } = req.params;
  const chatType = req.query.chatType || 'standard';

  const messagesPath = path.join(__dirname, 'users', accountId, 'messages', postId, 'messages.json');
  const messages = readJSON(messagesPath);

  if (chatType === 'standard') {
    // Only messages where user is sender or receiver
    const filtered = messages.filter(msg => msg.senderId === accountId || msg.receiverId === accountId);
    return res.json(filtered);
  }

  res.json(messages);
});

// Mark messages as read
app.post('/api/messages/mark-read', (req, res) => {
  const { postId, receiverId, conversationId } = req.body;
  if (!postId || !receiverId || !conversationId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const messagesPath = path.join(__dirname, 'users', receiverId, 'messages', postId, 'messages.json');
  const messages = readJSON(messagesPath);

  let changed = false;
  const updatedMessages = messages.map(msg => {
    if (msg.conversationId === conversationId && msg.receiverId === receiverId && !msg.read) {
      changed = true;
      return { ...msg, read: true };
    }
    return msg;
  });

  if (changed) writeJSON(messagesPath, updatedMessages);

  res.json({ success: true });
});

// Delete all messages for a post (useful when event is deleted)
app.delete('/api/messages/:postId/:accountId', (req, res) => {
  const { postId, accountId } = req.params;
  const messagesDir = path.join(__dirname, 'users', accountId, 'messages', postId);

  if (fs.existsSync(messagesDir)) {
    fs.rmSync(messagesDir, { recursive: true, force: true });
    return res.json({ success: true });
  }

  res.status(404).json({ error: 'Messages folder not found' });
});




// === READ ALL MESSAGES FOR A USER ===
app.get("/api/messages/read", async (req, res) => {
  const { accountId } = req.query;
  if (!accountId) {
    return res.status(400).json({ error: "accountId is required" });
  }

  const userMessagesDir = path.join(__dirname, "users", accountId, "messages");
  if (!fs.existsSync(userMessagesDir)) {
    return res.json({}); // No messages yet
  }

  let allMessages = {};

  try {
    const eventDirs = fs.readdirSync(userMessagesDir);
    for (const eventId of eventDirs) {
      const filePath = path.join(userMessagesDir, eventId, "messages.json");
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        allMessages[eventId] = data;
      }
    }
    res.json(allMessages);
  } catch (err) {
    console.error("Error reading user messages:", err);
    res.status(500).json({ error: "Failed to read messages" });
  }
});










// --- Helpers ---
function forumMessagesPath(eventOwnerId, eventId) {
  return path.join(__dirname, 'users', eventOwnerId, 'messages', eventId, 'forum-messages.json');
}

function mentionsPath(accountId) {
  return path.join(__dirname, 'users', accountId, 'mentions.json');
}

// --- POST: send forum message + handle mentions ---
// --- POST: send forum message + handle mentions ---
app.post('/api/forum-messages/send', async (req, res) => {
  try {
    const { senderId, eventOwnerId, eventId, messageText } = req.body;
    if (!senderId || !eventOwnerId || !eventId || !messageText) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // --- 1. Save forum message in original path ---
    const forumDir = path.join(__dirname, 'users', eventOwnerId, 'messages', eventId);
    await fsp.mkdir(forumDir, { recursive: true });

    const forumFile = path.join(forumDir, 'forum-messages.json');
    let messages = [];
    try {
      const data = await fsp.readFile(forumFile, 'utf8');
      messages = JSON.parse(data);
      if (!Array.isArray(messages)) messages = [];
    } catch {
      messages = [];
    }

    const newMsg = {
      messageId: `msg-${Date.now()}`,
      senderId,
      messageText,
      timestamp: new Date().toISOString()
    };

    messages.push(newMsg);
    await fsp.writeFile(forumFile, JSON.stringify(messages, null, 2));

    // --- 2. Handle mentions ---
    const mentionMatches = messageText.match(/@(\S+)/g) || [];
    for (const rawMention of mentionMatches) {
      const mentionedId = rawMention.replace('@', '');
      if (!mentionedId || mentionedId === senderId) continue;

      const mentionDir = path.join(__dirname, 'users', mentionedId);
      await fsp.mkdir(mentionDir, { recursive: true });

      const mentionFile = path.join(mentionDir, 'mentions.json');
      let mentions = [];
      try {
        const data = await fsp.readFile(mentionFile, 'utf8');
        mentions = JSON.parse(data);
        if (!Array.isArray(mentions)) mentions = [];
      } catch {
        mentions = [];
      }

      mentions.push({
        eventId,
        messageId: newMsg.messageId,
        from: senderId,
        snippet: messageText,
        timestamp: newMsg.timestamp,
        read: false
      });

      await fsp.writeFile(mentionFile, JSON.stringify(mentions, null, 2));
    }

    res.json({ success: true, message: newMsg });
  } catch (err) {
    console.error('❌ Error sending forum message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// --- GET: fetch forum messages ---
app.get('/api/forum-messages/:eventOwnerId/:eventId', async (req, res) => {
  try {
    const { eventOwnerId, eventId } = req.params;
    const filePath = forumMessagesPath(eventOwnerId, eventId);

    let messages = [];
    try {
      const data = await fsp.readFile(filePath, 'utf8');
      messages = JSON.parse(data);
    } catch {
      messages = [];
    }

    res.json(messages);
  } catch (err) {
    console.error('❌ Error reading forum messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Fetch mentions for logged-in user
app.get('/api/mentions/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const mentionFile = path.join(__dirname, 'users', accountId, `mentions.json`);
    const mentions = await SafeReadJSON(mentionFile, []);
    res.json(mentions);
  } catch (err) {
    console.error('Error reading mentions', err);
    res.status(500).json({ error: 'Server error fetching mentions' });
  }
});



// POST /users/:accountId/mark-mention-read
// === POST /users/:accountId/mark-mention-read ===
// POST /users/:accountId/mark-mention-read
// --- Mark a mention as read ---
app.post("/users/:accountId/mark-mention-read", async (req, res) => {
  try {
    const { accountId } = req.params;
    const { messageId } = req.body;
    if (!accountId || !messageId) {
      return res.status(400).json({ error: "Missing accountId or messageId" });
    }

    const mentionFile = path.join(__dirname, "users", accountId, "mentions.json");
    let mentions = [];
    try {
      const data = await fsp.readFile(mentionFile, "utf8");
      mentions = JSON.parse(data);
    } catch {
      mentions = [];
    }

    let updated = false;
    mentions = mentions.map(m => {
      if (m.messageId === messageId) {
        updated = true;
        return { ...m, read: true };
      }
      return m;
    });

    if (updated) {
      await fsp.writeFile(mentionFile, JSON.stringify(mentions, null, 2));
    }

    res.json({ success: true, updated });
  } catch (err) {
    console.error("❌ Error marking mention read:", err);
    res.status(500).json({ error: "Failed to mark mention as read" });
  }
});





// === Mark mentions as read ===
app.post('/api/mentions/mark-read', (req, res) => {
  const { accountId, messageId } = req.body;
  if (!accountId || !messageId) {
    return res.status(400).json({ error: "accountId and messageId are required" });
  }

  const mentionsPath = path.join(__dirname, 'users', accountId, 'mentions.json');
  if (!fs.existsSync(mentionsPath)) {
    return res.status(404).json({ error: "mentions.json not found" });
  }

  let mentions = JSON.parse(fs.readFileSync(mentionsPath, 'utf8'));
  let updated = false;

  mentions = mentions.map(m => {
    if (m.messageId === messageId) {
      updated = true;
      return { ...m, read: true };
    }
    return m;
  });

  if (!updated) {
    return res.status(404).json({ error: "Mention not found" });
  }

  fs.writeFileSync(mentionsPath, JSON.stringify(mentions, null, 2), 'utf8');
  return res.json({ success: true });
});






































// Example Express backend handler
app.post('/api/save-cart', (req, res) => {
  const { accountId, cartItem } = req.body;
  if (!accountId) return res.status(400).json({ message: "accountId is required" });

  // If accountId already starts with "user-", leave it
const userFolderName = accountId.startsWith('user-') ? accountId : `user-${accountId}`;

const userCartDir = path.join(__dirname, 'users', userFolderName, 'saved-cart');
const userCartFile = path.join(userCartDir, 'UserSavedCarts.json');


  // Ensure directory exists
  fs.mkdirSync(userCartDir, { recursive: true });

  // Read existing cart for this user (or empty array if none)
  let savedCarts = [];
  if (fs.existsSync(userCartFile)) {
    try {
      savedCarts = JSON.parse(fs.readFileSync(userCartFile, 'utf8')) || [];
    } catch (err) {
      console.error(`Error reading cart file for user ${accountId}:`, err);
      savedCarts = [];
    }
  }

  // Find existing item
  const existingItemIndex = savedCarts.findIndex(item => item.sku === cartItem.sku);

  if (cartItem.quantity <= 0) {
    // Remove item if quantity <= 0
    if (existingItemIndex > -1) {
      savedCarts.splice(existingItemIndex, 1);
    }
  } else {
    cartItem.lastUpdated = new Date().toISOString();
    if (existingItemIndex > -1) {
      savedCarts[existingItemIndex].quantity = cartItem.quantity;
      savedCarts[existingItemIndex].lastUpdated = cartItem.lastUpdated;
    } else {
      savedCarts.push(cartItem);
    }
  }

  // Write updated cart (empty array means no items left)
  fs.writeFile(userCartFile, JSON.stringify(savedCarts, null, 2), (err) => {
    if (err) {
      console.error(`Error saving cart for user ${accountId}:`, err);
      return res.status(500).json({ message: "Failed to save cart." });
    }
    res.json({ message: "Cart saved successfully." });
  });
});


  
  
  



// Get saved cart for a specific user
app.get("/api/get-cart", (req, res) => {
  const { accountId } = req.query;
  if (!accountId) return res.status(400).json({ message: "accountId is required" });

  // Ensure folder naming is correct
  const userFolderName = accountId.startsWith('user-') ? accountId : `user-${accountId}`;
  const userCartFile = path.join(__dirname, "users", userFolderName, "saved-cart", "UserSavedCarts.json");

  if (!fs.existsSync(userCartFile)) {
    return res.json({ cart: [] }); // No saved cart yet
  }

  try {
    const savedCarts = JSON.parse(fs.readFileSync(userCartFile, "utf8")) || [];
    res.json({ cart: savedCarts });
  } catch (err) {
    console.error(`Error reading cart for ${accountId}:`, err);
    res.status(500).json({ message: "Failed to read cart." });
  }
});






/// Gmail SMTP setup

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mycupofearth@gmail.com',
    pass: 'zjae svhz cdoq anwo' // App Password, not regular password
  }
});

function sendReminderEmail(email, windowLabel, cartItems = []) {
  const logoUrl = "localhost:4000/assets/images/logo.svg";
  const facebookUrl = "https://www.facebook.com/profile.php?id=100074631399155";
  const twitterUrl = "https://x.com/MyCupOfEarth";
  const instagramUrl = "https://www.instagram.com/mycupofearth/";
  const tiktokUrl = "https://www.tiktok.com/@mycupofearth";
  const youtubeUrl = "https://www.youtube.com/@MYCUPOFEARTH";
  const cartSummary = cartItems.map(item => `<li>${item.name} x${item.quantity}</li>`).join('');
  const cartUrl = "http://localhost:4000/"; // Replace with actual cart link

  const subject = 'You left something in your cart!';
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
        <div style="margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <img src="${logoUrl}" alt="Company Logo" style="width: 100px; height: auto; margin-right: 15px;">
            <h2 style="color: #0066ff; margin: 0;">Still thinking it over?</h2>
          </div>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            We noticed you left some items in your cart about <strong>${windowLabel}</strong> ago.
            Don’t worry — we’ve saved everything for you!
          </p>
          <ul>${cartSummary}</ul>
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="${cartUrl}" style="background-color: #0066ff; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              Return to Your Cart
            </a>
          </div>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Complete your order now to make sure your items don’t sell out.
          </p>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          Best regards,<br>
          <strong>MY CUP OF EARTH</strong><br>
          <a href="https://m-cochran.github.io/Randomerr/" style="color: #0056b3; text-decoration: none;">Visit our website</a>
        </p>
        <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
          Follow us on social media:
        </p>
      <div style="margin-top: 10px;">
        <a href="https://www.facebook.com/profile.php?id=100074631399155" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://x.com/MyCupOfEarth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png" alt="Twitter Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.instagram.com/mycupofearth/" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.tiktok.com/@mycupofearth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ionicons_logo-tiktok.svg/512px-Ionicons_logo-tiktok.svg.png?20230423144016" alt="TikTok Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/512px-YouTube_social_white_squircle.svg.png?20200112151940" alt="Youtube Logo" style="width: 24px; height: 24px; border: none;">
        </a>
      </div>

        <footer style="margin-top: 20px; font-size: 12px; color: #666;">
          <p>© ${new Date().getFullYear()} MY CUP OF EARTH. All rights reserved.</p>
        </footer>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: '"MY CUP OF EARTH" <mycupofearth@gmail.com>',
    to: email,
    subject: subject,
    text: `Hey! You've had items in your cart for ${windowLabel}. Don't forget to complete your purchase here: ${cartUrl}`,
    html: htmlBody
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Failed to send reminder to ${email}:`, err);
    } else {
      console.log(`Reminder sent to ${email}:`, info.response);
    }
  });
}





const remindersPath = path.join(__dirname, "RemindersSent.json");

const reminderWindows = [
  { label: "2h", durationMs: 2 * 60* 60 * 1000 },
  { label: "6h", durationMs: 6 * 60 * 60 * 1000 },
  { label: "24h", durationMs: 24 * 60 * 60 * 1000 },
  { label: "3d", durationMs: 3 * 24 * 60 * 60 * 1000 },
];

// Read all users
// --- Read all users ---
function readAllUsers() {
  if (!fs.existsSync(usersDir)) return [];
  return fs.readdirSync(usersDir)
    .filter(f => f.startsWith("user-"))
    .map(folderName => {
      const accountId = folderName;
      const userFile = path.join(usersDir, folderName, `${accountId}.json`);
      if (!fs.existsSync(userFile)) return null;
      try {
        const parsed = JSON.parse(fs.readFileSync(userFile, "utf8"));
        return parsed[0];
      } catch { return null; }
    })
    .filter(Boolean);
}

// --- Read all user carts ---
function readAllUserCarts() {
  const carts = {};
  if (!fs.existsSync(usersDir)) return carts;

  fs.readdirSync(usersDir)
    .filter(f => f.startsWith("user-"))
    .forEach(folderName => {
      const accountId = folderName;
      const savedCartDir = path.join(usersDir, folderName, "saved-cart");

      // Auto-create saved-cart folder if missing
      if (!fs.existsSync(savedCartDir)) fs.mkdirSync(savedCartDir, { recursive: true });

      const cartFile = path.join(savedCartDir, "UserSavedCarts.json");
      if (!fs.existsSync(cartFile)) fs.writeFileSync(cartFile, "[]"); // empty cart if missing

      try { carts[accountId] = JSON.parse(fs.readFileSync(cartFile, "utf8")) || []; }
      catch { carts[accountId] = []; }
    });

  return carts;
}

// --- Check cart reminders ---
function checkCartReminders() {
  const now = Date.now();
  const users = readAllUsers();
  const carts = readAllUserCarts();

  const usersMap = users.reduce((acc, u) => { acc[u.accountId] = u; return acc; }, {});
  const allAccountIds = new Set([...Object.keys(carts), ...Object.keys(usersMap)]);

  for (const accountId of allAccountIds) {
  const cartItems = carts[accountId] || [];
  const user = usersMap[accountId];

  const savedCartDir = path.join(usersDir, accountId, "saved-cart");
  if (!fs.existsSync(savedCartDir)) fs.mkdirSync(savedCartDir, { recursive: true });

  const remindersPath = path.join(savedCartDir, "RemindersSent.json");
  if (!fs.existsSync(remindersPath)) fs.writeFileSync(remindersPath, "[]");

  // 🧹 If cart is empty -> clear reminders and skip
  if (!user || !user.email || cartItems.length === 0) {
    fs.writeFileSync(remindersPath, "[]");
    console.log(`🧹 Cleared reminders for ${accountId} (empty cart)`);
    continue;
  }

  // otherwise continue like before...
  const latestUpdate = Math.max(...cartItems.map(i =>
    i.lastUpdated ? new Date(i.lastUpdated).getTime() : 0
  ).filter(ts => !isNaN(ts)), 0);

  let remindersSent = [];
  try { remindersSent = JSON.parse(fs.readFileSync(remindersPath, "utf8")) || []; }
  catch { remindersSent = []; }

  const lastReminderTime = remindersSent.length > 0
    ? Math.max(...remindersSent.map(r => new Date(r.sentAt).getTime()))
    : 0;

  if (latestUpdate > lastReminderTime) remindersSent = [];

  const sentWindows = new Set(remindersSent.map(r => r.window));
  const eligibleWindows = reminderWindows.filter(win =>
    !sentWindows.has(win.label) && now - latestUpdate >= win.durationMs
  );

  if (eligibleWindows.length > 0) {
    const latestWindow = eligibleWindows[eligibleWindows.length - 1];
    console.log(`📧 Sending ${latestWindow.label} reminder to ${user.email}`);
    sendReminderEmail(user.email, latestWindow.label, cartItems);
    remindersSent.push({ window: latestWindow.label, sentAt: new Date().toISOString() });
    fs.writeFileSync(remindersPath, JSON.stringify(remindersSent, null, 2));
  }
}


  console.log(`[Reminder Check] Completed at ${new Date().toISOString()}`);
}

// --- Start interval ---
setInterval(checkCartReminders, 60 * 1000); // every 1 min



// Nodemailer configuration (example using Gmail SMTP)






function embedQrInSvg(qrSvgString, backgroundWidth, backgroundHeight, qrX, qrY, qrSize, backgroundSvgContent = null, targetRectId = null, qrPadding = 0) {
    // Base64 encode the QR SVG string to embed it as a data URI
    const base64QrSvg = Buffer.from(qrSvgString).toString('base64');
    const dataUri = `data:image/svg+xml;base64,${base64QrSvg}`;

    let finalQrX = qrX;
    let finalQrY = qrY;
    let finalQrSize = qrSize;

    if (backgroundSvgContent) {
        // If a targetRectId is provided, try to find the rectangle and use its dimensions
        if (targetRectId) {
            // First, find the specific rect element by its ID
            const rectElementMatch = backgroundSvgContent.match(new RegExp(`<rect[^>]*id="${targetRectId}"[^>]*/>`));

            if (rectElementMatch) {
                const rectTag = rectElementMatch[0]; // Get the full matched rect tag

                // Now, extract attributes from the matched rect tag using individual regexes
                const xMatch = rectTag.match(/x="([^"]+)"/);
                const yMatch = rectTag.match(/y="([^"]+)"/);
                const widthMatch = rectTag.match(/width="([^"]+)"/);
                const heightMatch = rectTag.match(/height="([^"]+)"/);

                const xVal = xMatch ? parseFloat(xMatch[1]) : NaN;
                const yVal = yMatch ? parseFloat(yMatch[1]) : NaN;
                const widthVal = widthMatch ? parseFloat(widthMatch[1]) : NaN;
                const heightVal = heightMatch ? parseFloat(heightMatch[1]) : NaN;

                // Check if all extracted values are valid numbers and dimensions are positive
                if (!isNaN(xVal) && !isNaN(yVal) && !isNaN(widthVal) && !isNaN(heightVal) && widthVal > 0 && heightVal > 0) {
                    // Calculate QR size with padding
                    const effectiveWidth = widthVal * (1 - qrPadding * 2); // Reduce width by padding on both sides
                    const effectiveHeight = heightVal * (1 - qrPadding * 2); // Reduce height by padding on both sides
                    finalQrSize = Math.min(effectiveWidth, effectiveHeight); // QR code is square, fit to smaller dimension

                    // Center the QR code within the rectangle
                    finalQrX = xVal + (widthVal - finalQrSize) / 2;
                    finalQrY = yVal + (heightVal - finalQrSize) / 2;

                    console.log(`Found target rect '${targetRectId}'. Placing QR at x:${finalQrX}, y:${finalQrY}, size:${finalQrSize} (derived from rect with padding).`);
                } else {
                    console.warn(`Target rect '${targetRectId}' found but has invalid or missing x, y, width, or height attributes. Using default QR placement from config.`);
                }
            } else {
                console.warn(`Target rect with ID "${targetRectId}" not found in template. Using default QR placement from config.`);
            }
        }

        // The image tag for the QR code, using the final determined coordinates and size
        const qrImageTag = `<image href="${dataUri}" x="${finalQrX}" y="${finalQrY}" width="${finalQrSize}" height="${finalQrSize}"/>`;

        // Insert the QR image before the closing </svg> tag of the root SVG
        const lastSvgTagIndex = backgroundSvgContent.lastIndexOf('</svg>');
        if (lastSvgTagIndex !== -1) {
            return backgroundSvgContent.substring(0, lastSvgTagIndex) + qrImageTag + backgroundSvgContent.substring(lastSvgTagIndex);
        } else {
            // Fallback if </svg> tag is not found in the provided content (should not happen with valid SVG)
            console.warn("Background SVG content missing closing </svg> tag. Appending QR code.");
            return backgroundSvgContent + qrImageTag + '</svg>';
        }
    } else {
        // Original behavior: create a simple white background SVG
        // This path is taken if templatePath is null or template file not found
        // Apply padding here too if using default background
        const effectiveQrSize = qrSize * (1 - qrPadding * 2);
        const paddedQrX = qrX + (qrSize - effectiveQrSize) / 2;
        const paddedQrY = qrY + (qrSize - effectiveQrSize) / 2;

        const qrImageTag = `<image href="${dataUri}" x="${paddedQrX}" y="${paddedQrY}" width="${effectiveQrSize}" height="${effectiveQrSize}"/>`;
        return `
            <svg width="${backgroundWidth}pt" height="${backgroundHeight}pt" viewBox="0 0 ${backgroundWidth} ${backgroundHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- White background rectangle to ensure consistent background color -->
                <rect x="0" y="0" width="${backgroundWidth}" height="${backgroundHeight}" fill="#FFFFFF"/>
                <!-- Embed the QR code SVG as an image -->
                ${qrImageTag}
            </svg>
        `;
    }
}

// Define the different background configurations with their dimensions and default QR code placements
// Dimensions are in points (1 inch = 72 points)
// Add a 'templatePath' property if you want to use a specific SVG file as the background.
// The paths are set assuming your Node.js script is in a subdirectory (e.g., 'server/')
// and 'Randomerr-main' is at the project's root level, containing 'assets/images/qr backgrounds/'.
// Adjust 'path.join(__dirname, '..', ...)' if your project structure is different.
const backgroundConfigs = [
    {
        name: '8.5x11_vertical',
        width: 8.5 * 72,   // 612pt (These are fallback dimensions if no template or rect is found)
        height: 11 * 72,   // 792pt
        qr: { x: 200, y: 300, size: 200 }, // Default if no targetRectId or rect not found
        templatePath: path.join(__dirname, '..', 'Randomerr-main', 'assets', 'images', 'qr backgrounds', '8.5x11_vertical_template.svg'),
        targetRectId: 'rect15', // Specify the ID of the rectangle in this template
        qrPadding: 0.05 // Add 5% padding on each side (10% total reduction in size)
    },
    {
        name: '11x8.5_horizontal_1',
        width: 11 * 72,    // 792pt
        height: 8.5 * 72,  // 612pt
        qr: { x: 300, y: 200, size: 200 }, // Default if no targetRectId or rect not found
        templatePath: path.join(__dirname, '..', 'Randomerr-main', 'assets', 'images', 'qr backgrounds', '11x8.5_horizontal_template_1.svg'),
        targetRectId: 'rect15', // Specify the ID of the rectangle in this template
        qrPadding: 0.05 // Example padding
    },
    {
        name: '5x7_vertical',
        width: 5 * 72,     // 360pt
        height: 7 * 72,    // 504pt
        qr: { x: 100, y: 150, size: 150 }, // Default if no targetRectId or rect not found
        templatePath: path.join(__dirname, '..', 'Randomerr-main', 'assets', 'images', 'qr backgrounds', '5x7_vertical_template.svg'),
        targetRectId: 'rect15', // Specify the ID of the rectangle in this template
        qrPadding: 0.05 // Example padding
    },
    {
        name: 'business_card_2x3.5_vertical',
        width: 2 * 72,     // 144pt
        height: 3.5 * 72,  // 252pt
        qr: { x: 30, y: 80, size: 80 }, // Default if no targetRectId or rect not found
        templatePath: path.join(__dirname, '..', 'Randomerr-main', 'assets', 'images', 'qr backgrounds', '2x3.5_business_card_template.svg'),
        targetRectId: 'rect15', // Specify the ID of the rectangle in this template
        qrPadding: 0.05 // Example padding
    },
    {
        name: '11x8.5_horizontal_2', // A second horizontal 11x8.5 with different QR placement
        width: 11 * 72,    // 792pt
        height: 8.5 * 72,  // 612pt
        qr: { x: 50, y: 50, size: 180 }, // Different placement, no specific template for this one
        templatePath: path.join(__dirname, '..', 'Randomerr-main', 'assets', 'images', 'qr backgrounds', '11x8.5_horizontal_template_2.svg'),
        targetRectId: 'rect15', // Specify the ID of the rectangle in this template
        qrPadding: 0.05 // Example padding
    },
];


app.post('/api/generate-affiliate', (req, res) => {
  const { accountId, email } = (req.session && req.session.user) || {};
  if (!accountId || !email) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const usersDir = path.join(__dirname, 'users');
  const userDir = path.join(usersDir, accountId);
  const userFile = path.join(userDir, `${accountId}.json`);
  const affiliateDir = path.join(userDir, 'affiliate-data');

  // Ensure user folder exists
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  // Load user JSON
  let userData = {};
  if (fs.existsSync(userFile)) {
    try {
      userData = JSON.parse(fs.readFileSync(userFile, 'utf8'));
    } catch {
      console.warn(`⚠️ Corrupt user JSON, resetting: ${userFile}`);
      userData = {};
    }
  }

  // Generate or reuse affiliateCode and make sure it's unique across all users
  const ensureUniqueCode = (proposed) => {
    // If file exists anywhere under users/*/affiliate-data/{code}.json, pick another
    const folders = fs.readdirSync(usersDir, { withFileTypes: true }).filter(d => d.isDirectory());
    const existsSomewhere = () => {
      for (const f of folders) {
        const p = path.join(usersDir, f.name, 'affiliate-data', `affiliatecode.json`);
        if (fs.existsSync(p)) return true;
      }
      return false;
    };
    while (existsSomewhere()) {
      proposed = `${accountId}-${Math.random().toString(36).slice(2, 8)}`;
    }
    return proposed;
  };

  if (!userData.affiliateCode) {
  const randomNumber = Math.random().toString(36).substr(2, 6);
  userData.affiliateCode = `${accountId}-${randomNumber}`;
  fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));
}


  const affiliateCode = userData.affiliateCode;
  const affiliateLink = `http://localhost:4000/shop/?ref=${affiliateCode}`;

  // Ensure affiliate-data folder exists
  if (!fs.existsSync(affiliateDir)) fs.mkdirSync(affiliateDir, { recursive: true });

  // Create or normalize affiliate JSON (OLD NESTED STRUCTURE)
  const affiliateFile = path.join(affiliateDir, `affiliatecode.json`);
  let affData = {};
  if (fs.existsSync(affiliateFile)) {
    try {
      affData = JSON.parse(fs.readFileSync(affiliateFile, 'utf8'));
    } catch {
      console.warn(`⚠️ Corrupt affiliate file, resetting: ${affiliateFile}`);
      affData = {};
    }
  }

  // Normalize to OLD structure: { [code]: { email, createdAt, clicks:[], sales:[] } }
  const nowISO = new Date().toISOString();
  const nested = affData[affiliateCode];

  if (nested && (Array.isArray(nested.clicks) || Array.isArray(nested.sales))) {
    // Already old shape – ensure fields exist
    if (!nested.email) nested.email = email;
    if (!nested.createdAt) nested.createdAt = nowISO;
    if (!Array.isArray(nested.clicks)) nested.clicks = [];
    if (!Array.isArray(nested.sales)) nested.sales = [];
  } else if (affData && (Array.isArray(affData.clicks) || Array.isArray(affData.sales))) {
    // Convert "new/flat" shape -> old nested
    affData = {
      [affiliateCode]: {
        email: affData.email || email,
        createdAt: affData.createdAt || nowISO,
        clicks: Array.isArray(affData.clicks) ? affData.clicks : [],
        sales: Array.isArray(affData.sales) ? affData.sales : [],
      }
    };
  } else if (!affData[affiliateCode]) {
    // Create fresh old-shaped file
    affData = {
      [affiliateCode]: {
        email,
        createdAt: nowISO,
        clicks: [],
        sales: []
      }
    };
  }

  fs.writeFileSync(affiliateFile, JSON.stringify(affData, null, 2));

    // Generate both PNG and plain SVG QR codes
    QRCode.toBuffer(affiliateLink, { type: 'image/png' }, async (err, pngBuffer) => {
        if (err) {
            console.error('❌ Error generating PNG QR code:', err);
            return res.status(500).json({ error: 'Failed to generate PNG QR code' });
        }

        QRCode.toString(affiliateLink, { type: 'svg' }, async (err, plainSvgString) => {
            if (err) {
                console.error('❌ Error generating plain SVG QR code:', err);
                return res.status(500).json({ error: 'Failed to generate plain SVG QR code' });
            }

            // --- PDF Path Definition ---
            const preExistingPdfPath = path.join(__dirname, '..', 'Randomerr-main', 'assets', 'images', 'qr backgrounds', 'MYCUPOFEARTH_Affiliate_Guide.pdf');
            let pdfExists = false;
            if (fs.existsSync(preExistingPdfPath)) {
                pdfExists = true;
            } else {
                console.warn(`Pre-existing PDF file not found at: ${preExistingPdfPath}. PDF will not be included in the ZIP.`);
            }
            // --- End PDF Path Definition ---

            // Create ZIP with all SVG files and potentially the PDF
            const zipPath = path.join(__dirname, `${affiliateCode}.zip`);
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.on('error', (err) => {
                console.error('❌ Error creating ZIP:', err);
                // Clean up temp files if archive creation fails
                fs.unlink(zipPath, (unlinkErr) => {
                    if (unlinkErr) console.error('Error deleting incomplete ZIP:', unlinkErr);
                });
                return res.status(500).json({ error: 'Failed to create ZIP archive' });
            });

            archive.pipe(output);

            // 1. Add the plain SVG QR code to the archive
            archive.append(plainSvgString, { name: `${affiliateCode}_plain.svg` });

            // 2. Generate and add SVGs with backgrounds to the archive
            const tempSvgPaths = []; // To keep track of temp files for cleanup

            for (const config of backgroundConfigs) {
                try {
                    let backgroundSvgContent = null;
                    // Resolve the full path for better error messages
                    const fullTemplatePath = config.templatePath;
                    // Check if a template path is specified and the file exists
                    if (fullTemplatePath && fs.existsSync(fullTemplatePath)) {
                        backgroundSvgContent = fs.readFileSync(fullTemplatePath, 'utf8');
                    } else if (fullTemplatePath) {
                        // Warn if template path is specified but file not found
                        console.warn(`Template file not found for ${config.name}: ${fullTemplatePath}. Using default white background.`);
                    }

                    const embeddedSvgString = embedQrInSvg(
                        plainSvgString,
                        config.width,
                        config.height,
                        config.qr.x,
                        config.qr.y,
                        config.qr.size,
                        backgroundSvgContent, // Pass the template content to the function
                        config.targetRectId, // Pass the target rect ID
                        config.qrPadding || 0 // Pass the padding, default to 0 if not set
                    );
                    const fileName = `${affiliateCode}_${config.name}.svg`;
                    const tempFilePath = path.join(__dirname, fileName);
                    fs.writeFileSync(tempFilePath, embeddedSvgString);
                    tempSvgPaths.push(tempFilePath); // Add to list for cleanup
                    archive.file(tempFilePath, { name: fileName });
                } catch (embedErr) {
                    console.error(`❌ Error embedding QR in ${config.name} SVG:`, embedErr);
                    // Continue to next background, but log the error
                }
            }

            // --- Add PDF to ZIP if it exists ---
            if (pdfExists) {
                archive.file(preExistingPdfPath, { name: 'MYCUPOFEARTH_Affiliate_Guide.pdf' });
            }
            // --- End Add PDF to ZIP ---

            archive.finalize();

            output.on('close', async () => {
                const qrCodeCid = `qr_${affiliateCode}@mycupofearth.com`; // Unique Content ID

                const mailOptions = {
                    from: 'mycupofearth@gmail.com',
                    to: email,
                    subject: 'Your Affiliate Code and QR Codes',
                    html: `
                        <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    h2 {
      color: #0066ff;
    }
    h3 {
      color: #34495e;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .affiliate-code {
      font-size: 24px;
      font-weight: bold;
      color: #0066ff;
      text-align: center;
      margin: 20px 0;
      padding: 10px;
      border: 2px dashed #e67e22;
      border-radius: 5px;
    }
    .qr-code-section {
      text-align: center;
      margin-top: 30px;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      border-radius: 8px;
    }
    .qr-code-section img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
      border: 1px solid #cccccc;
      border-radius: 4px;
    }
    .button {
      display: inline-block;
      background-color: #3498db;
      color: #ffffff !important;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 15px;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <img src="${COMPANY_LOGO_URL}" alt="Company Logo" style="width: 72px; height: 72px; margin-right: 15px;">
      <h2>Welcome to the MY CUP OF EARTH Affiliate Program!</h2>
    </div>
    <p>Dear Affiliate,</p>
    <p>Thank you for joining our affiliate program! We're excited to have you on board. Below you'll find your unique **affiliate code** and a **QR code** you can use to promote MY CUP OF EARTH.</p>

    ---

    <h3>Your Affiliate Code</h3>
    <p>Your unique affiliate code is:</p>
    <div class="affiliate-code">${affiliateCode}</div>
    <p>Please use this code when referring customers to ensure you receive credit for your sales.</p>

    <p>Your direct affiliate link is:</p>
    <p><a href="${affiliateLink}">${affiliateLink}</a></p>
    <p>Share this link on your website, social media, or directly with your audience.</p>

    ---

    <h3>How to Use Your QR Code</h3>
    <div class="qr-code-section">
      <p>Scan this QR code with your phone:</p>
      <img src="cid:${qrCodeCid}" alt="Affiliate QR Code for ${affiliateCode}" />
      <p>This QR code directly links to your affiliate page. When someone scans it, they will be taken to our website through your unique affiliate link.</p>
    </div>

    <h3>Ways to Use Your QR Code:</h3>
    <ul>
      <li>**Print it:** Include the QR code on business cards, flyers, posters, or other printed materials.</li>
      <li>**Digital Display:** Share it on presentations, digital signage, or as part of your email signature.</li>
      <li>**Social Media:** Post the QR code on your social media channels, encouraging your followers to scan it for easy access.</li>
      <li>**Events:** Display the QR code at events or conferences you attend.</li>
    </ul>

    <p>We've also attached a **.zip file** containing your QR code in various formats, including high-resolution images, for your convenience. This includes the plain QR code and versions embedded in various background sizes.</p>
    <p>Please also find within the ZIP file our **Affiliate Guide PDF** for more detailed information.</p>

    <p>If you have any questions, feel free to reach out to us!</p>
    <p>Happy promoting!</p>
    <p style="font-size:16px;line-height:1.5;margin-bottom:20px">
      Best regards,<br>
      <strong>MY CUP OF EARTH</strong><br>
    </p>
    <p style="font-size:14px;color:#666;margin-bottom:10px">
      Follow us on social media:
    </p>
    <div style="margin-top:10px">
      <a href="https://www.facebook.com/profile.php?id=100074631399155" style="margin-right:10px;text-decoration:none" rel="noopener noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/profile.php?id%3D100074631399155&source=gmail&ust=1750940855205000&usg=AOvVaw0QD2I0Bw9Z8dXitKdTOy7k">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" style="width:24px;height:24px;border:none" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:WzAsMl0.">
      </a>
      <a href="https://x.com/MyCupOfEarth" style="margin-right:10px;text-decoration:none" rel="noopener noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://x.com/MyCupOfEarth&source=gmail&ust=1750940855205000&usg=AOvVaw0U4rSL7h67AwNovoAar3Qp">
        <img src="https://ci3.googleusercontent.com/meips/ADKq_NYp3ZU6Zn0bPsyXel0Bl_1rLN-e1_Uz8dYzUQqnuYl0eQUiuZGJFByjHY4VvTI8h_zSAI4-f2hEgpfNye89bufPXwtnAXDJKrLvb4X7M4TxevGtClTd0A=s0-d-e1-ft#https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png" alt="Twitter Logo" style="width:24px;height:24px;border:none" class="CToWUd" data-bit="iit">
      </a>
      <a href="https://www.instagram.com/mycupofearth/" style="margin-right:10px;text-decoration:none" rel="noopener noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/mycupofearth/&source=gmail&ust=1750940855205000&usg=AOvVaw382DSTr8YJRxxAJTt5ji_Z">
        <img src="https://ci3.googleusercontent.com/meips/ADKq_NaZtyXtS3SFWDuVEngdO5owN13eTcbXrvfOgPmM2mYVv8ogb0JDelGEy_u93gcLofwONmRcFNUOmlUgh0nGl-jwIu1mHD83YEZA9fpuE14mYK4zGx2lABz_iF3t=s0-d-e1-ft#https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" style="width:24px;height:24px;border:none" class="CToWUd" data-bit="iit">
      </a>
      <a href="https://www.tiktok.com/@mycupofearth" style="margin-right:10px;text-decoration:none" rel="noopener noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.tiktok.com/@mycupofearth&source=gmail&ust=1750940855205000&usg=AOvVaw3RBoIUe_i0ELzcZAkE-Fkw">
        <img src="https://ci3.googleusercontent.com/meips/ADKq_NZi6t01K2Yf9GEcO4toCTovOxTK1gyvwBc8pV3_8-M-F-7NpRROis4qi8bjYy1L40CVN79be6U_kcNUTjMxA3VOdoJbC2Q2UsLRdnZ02ltlkgTsEmEWmKve9d9lCOoKKDdTQZIf5VA8HWjosoDHRFlUk9vAyJjSi9-FLg8YwLC7XOxPTKcvpEI7NOLsbE1M1ui62Gqyi7RUiXRb=s0-d-e1-ft#https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ionicons_logo-tiktok.svg/512px-Ionicons_logo-tiktok.svg.png?20230423144016" alt="TikTok Logo" style="width:24px;height:24px;border:none" class="CToWUd" data-bit="iit">
      </a>
      <a href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" style="margin-right:10px;text-decoration:none" rel="noopener noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/channel/YOUR_CHANNEL_ID&source=gmail&ust=1750940855205000&usg=AOvVaw177ijVTLESdSTdunTM_Chm"> <img src="https://ci3.googleusercontent.com/meips/ADKq_NblWcbwq8wt_O-VsXG0kq0-6_loze9ZyUZPTH-r4olu9WnljFbgtZRx-JHPVsl5Bz95SMGyvCFDgS1TwpmJ4_zcWN6LcXyGs3-l92yriltvplJQBpG5vhquHyADSsYfNXt-GPu4fFUaVyQeD8zt_h7tKtnD405oZ-O-U_-vmCW8baG-U8MEoqIizou83JKihAtPyj06cRKOrQtKhoJAQRa1i77YOS7uYk7MJzTp=s0-d-e1-ft#https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/512px-YouTube_social_white_squircle.svg.png?20200112151940" alt="Youtube Logo" style="width:24px;height:24px;border:none" class="CToWUd" data-bit="iit">
      </a>
    </div>

    <div class="footer">
      <span>© ${new Date().getFullYear()} MY CUP OF EARTH. All rights reserved.</span>
    </div>
  </div>
</body>
</html>
                    `,
                    attachments: [
                        {
                            filename: 'qr_code.png',
                            content: pngBuffer,
                            cid: qrCodeCid
                        },
                        {
                            filename: `${affiliateCode}.zip`,
                            path: zipPath
                        }
                    ]
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    // Clean up temp files regardless of email success/failure
                    tempSvgPaths.forEach(tempFilePath => {
                        fs.unlink(tempFilePath, (err) => {
                            if (err) console.error(`Error deleting temp SVG file ${tempFilePath}:`, err);
                        });
                    });
                    fs.unlink(zipPath, (err) => {
                        if (err) console.error('Error deleting temp ZIP:', err);
                    });
                    // No need to delete PDF here if it's a pre-existing file and not dynamically generated
                    // If you decide to dynamically generate it in the future, remember to add cleanup here.

                    if (error) {
                        console.error('❌ Error sending email:', error);
                        return res.status(500).json({ error: 'Failed to send email' });
                    }

                    console.log('✅ Email sent:', info.response);
                    res.json({ code: affiliateCode, link: affiliateLink });
                });
            });
        });
    });
});






app.post('/api/track-click', (req, res) => {
  const { ref } = req.body;
  if (!ref) return res.status(400).json({ error: "Affiliate ref is required" });

  const usersDir = path.join(__dirname, 'users');
  if (!fs.existsSync(usersDir)) {
    return res.status(500).json({ error: "Users directory not found" });
  }

  const userFolders = fs.readdirSync(usersDir, { withFileTypes: true }).filter(e => e.isDirectory());
  const currentTime = new Date().toISOString();
  let found = false;

  for (const userFolder of userFolders) {
    const affDir = path.join(usersDir, userFolder.name, 'affiliate-data');
    const affFile = path.join(affDir, 'affiliatecode.json');

    if (fs.existsSync(affFile)) {
      let affData = {};
      try {
        affData = JSON.parse(fs.readFileSync(affFile, 'utf8'));
      } catch (err) {
        console.error(`❌ Failed to read ${affFile}:`, err);
        return res.status(500).json({ error: "Failed to read affiliate file" });
      }

      // Check if this file contains the affiliate code
      if (affData[ref]) {
        if (!Array.isArray(affData[ref].clicks)) affData[ref].clicks = [];
        affData[ref].clicks.push({ timestamp: currentTime });

        try {
          fs.writeFileSync(affFile, JSON.stringify(affData, null, 2));
          console.log(`✅ Click recorded for affiliate ${ref} at ${currentTime}`);
        } catch (err) {
          console.error(`❌ Failed to write ${affFile}:`, err);
          return res.status(500).json({ error: "Failed to write affiliate file" });
        }

        found = true;
        break; // stop after updating the first match
      }
    }
  }

  if (!found) {
    console.warn(`⚠️ Unknown affiliate ref: ${ref}`);
  }

  res.json({ message: "Click tracked" });
});










app.get("/api/affiliate-by-email", (req, res) => {
  const emailQuery = (req.query.email || "").toLowerCase();
  if (!emailQuery) return res.status(400).json({ error: "Email is required" });

  const usersDir = path.join(__dirname, "users");
  if (!fs.existsSync(usersDir)) {
    console.error("Users directory not found:", usersDir);
    return res.status(500).json({ error: "Users directory not found" });
  }

  const userFolders = fs.readdirSync(usersDir, { withFileTypes: true }).filter(d => d.isDirectory());
  console.log(`Searching ${userFolders.length} user folders for affiliate email: ${emailQuery}`);

  // Helper to normalize & return payload
  const makePayload = (affiliateCode, obj) => ({
    affiliateCode,
    email: obj.email || "",
    createdAt: obj.createdAt || null,
    clicks: Array.isArray(obj.clicks) ? obj.clicks : [],
    sales: Array.isArray(obj.sales) ? obj.sales : []
  });

  // First pass: try to match by the user's main JSON email and then find affiliate file in their folder
  for (const userFolder of userFolders) {
    const userDir = path.join(usersDir, userFolder.name);
    const userFile = path.join(userDir, `${userFolder.name}.json`);
    if (!fs.existsSync(userFile)) continue;

    let userData;
    try {
      userData = JSON.parse(fs.readFileSync(userFile, "utf8"));
    } catch (err) {
      console.warn(`Skipping corrupt user file: ${userFile}`);
      continue;
    }

    if (userData.email && userData.email.toLowerCase() === emailQuery) {
      // Look in this user's affiliate-data folder
      const affDir = path.join(userDir, "affiliate-data");
      if (!fs.existsSync(affDir)) {
        console.warn(`User ${userFolder.name} matched email but has no affiliate-data folder: ${affDir}`);
        return res.status(404).json({ error: "Affiliate data not found for that email" });
      }

      const affFiles = fs.readdirSync(affDir).filter(f => f.endsWith(".json"));
      console.log(`Found ${affFiles.length} affiliate files in ${affDir}`);

      for (const f of affFiles) {
        const p = path.join(affDir, f);
        try {
          const raw = JSON.parse(fs.readFileSync(p, "utf8"));

          // Case A: old nested structure { "<affiliateCode>": { email, clicks, sales } }
          const keys = Object.keys(raw);
          for (const key of keys) {
            const candidate = raw[key];
            if (candidate && candidate.email && candidate.email.toLowerCase() === emailQuery) {
              console.log(`Returning affiliate file ${p} (key=${key})`);
              return res.json(makePayload(key, candidate));
            }
          }

          // Case B: flat structure { email, clicks, sales } (fallback)
          if (raw.email && raw.email.toLowerCase() === emailQuery) {
            const inferredCode = path.basename(f, ".json");
            console.log(`Returning flat affiliate file ${p} (inferred code=${inferredCode})`);
            return res.json(makePayload(inferredCode, raw));
          }
        } catch (err) {
          console.warn(`Failed to parse affiliate file ${p}:`, err.message);
          continue;
        }
      }

      // If we matched the user's account but found no affiliate files that contain the email:
      return res.status(404).json({ error: "No affiliate code found for this user" });
    }
  }

  // Second pass: scan ALL users' affiliate-data files and match by the email inside the file
  for (const userFolder of userFolders) {
    const affDir = path.join(usersDir, userFolder.name, "affiliate-data");
    if (!fs.existsSync(affDir)) continue;

    const affFiles = fs.readdirSync(affDir).filter(f => f.endsWith(".json"));
    for (const f of affFiles) {
      const p = path.join(affDir, f);
      try {
        const raw = JSON.parse(fs.readFileSync(p, "utf8"));

        const keys = Object.keys(raw);
        for (const key of keys) {
          const candidate = raw[key];
          if (candidate && candidate.email && candidate.email.toLowerCase() === emailQuery) {
            console.log(`Found affiliate by scanning all files: ${p} (key=${key})`);
            return res.json(makePayload(key, candidate));
          }
        }

        if (raw.email && raw.email.toLowerCase() === emailQuery) {
          const inferredCode = path.basename(f, ".json");
          console.log(`Found flat affiliate by scanning all files: ${p} (inferred code=${inferredCode})`);
          return res.json(makePayload(inferredCode, raw));
        }
      } catch (err) {
        console.warn(`Skipping unreadable affiliate file ${p}:`, err.message);
        continue;
      }
    }
  }

  console.warn(`Affiliate not found for email: ${emailQuery}`);
  return res.status(404).json({ error: "Affiliate not found for that email" });
});














app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

async function fetchWithRetry(url, options = {}, maxDurationMs = 60000, initialBackoffMs = 1000) {
  let attempt = 0;
  let backoffMs = initialBackoffMs;
  const startTime = Date.now();

  while (Date.now() - startTime < maxDurationMs) {
    attempt++;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      return response;
    } catch (err) {
      console.warn(`Attempt ${attempt} failed for ${url}: ${err.message}`);

      // Wait before retrying
      await new Promise((res) => setTimeout(res, backoffMs));
      backoffMs = Math.min(backoffMs * 2, 10000); // cap backoff at 10s
    }
  }

  throw new Error(`Failed to fetch ${url} within ${maxDurationMs / 1000} seconds`);
}

app.get('/product/:ids', async (req, res) => {
  const ids = req.params.ids.split(',');

  try {
    const results = await Promise.all(
      ids.map(async (id) => {
        try {
          const response = await fetchWithRetry(`https://api.printful.com/products/${id}`, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          });

          const data = await response.json();
          return { id, data };
        } catch (err) {
          console.error(`Final failure for product ${id}:`, err.message);
          return { id, error: err.message };
        }
      })
    );

    res.json(results);
  } catch (error) {
    console.error('Batch fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch one or more products' });
  }
});










































const API_KEY = 'pERFSPlW6HQb5NvLHi4rYkwfTL2vatR87RQv1yNb';
const variantIds = [16785, 16786, 12141, 1320, 4830, 11051, 11049, 12579, 11050, 12578, 11048, 11049, 15004, 15005, 16030, 10798, 16175, 17447, 16176, 16178, 17448, 16177, 16174];

async function fetchWithRetry(url, options = {}, retries = 4, backoff = 1000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      return res;
    } catch (err) {
      if (attempt === retries - 1) throw err;
      console.warn(`Retrying ${url} in ${backoff}ms due to ${err.message}`);
      await new Promise(r => setTimeout(r, backoff));
      backoff *= 2;
    }
  }
}

async function getCountries() {
  const all = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await fetchWithRetry(`https://api.printful.com/v2/countries?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const json = await res.json();
    if (!res.ok || !json.data) break;

    all.push(...json.data);
    if (offset + limit >= json.paging.total) break;
    offset += limit;
  }

  return all;
}

async function getShippingRate(countryCode, stateCode, variantId) {
  const payload = {
    recipient: { country_code: countryCode, state_code: stateCode },
    order_items: [{
      catalog_variant_id: variantId,
      quantity: 1,
      source: 'catalog'
    }],
    currency: 'USD'
  };

  try {
    const res = await fetchWithRetry('https://api.printful.com/v2/shipping-rates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok && data.data?.length) {
      return {
        rate: data.data[0].rate,
        method: data.data[0].name
      };
    }
  } catch (err) {
    console.error(`❌ Error for variant ${variantId} in ${countryCode}: ${err.message}`);
  }

  return null;
}

async function updateShippingRates() {
  const countries = await getCountries();
  if (!countries.length) {
    console.error('No countries loaded.');
    return;
  }

  const limit = pLimit(30); // Limit 10 concurrent requests
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  const total = countries.length * variantIds.length;
  bar.start(total, 0);

  const results = [];

  for (const country of countries) {
    const stateCode = country.states?.[0]?.code || '';
    const countryEntry = {
      country: country.name || country.code,
      code: country.code,
      state_code: stateCode,
      results: []
    };

    const tasks = variantIds.map(variantId =>
      limit(() =>
        getShippingRate(country.code, stateCode, variantId)
          .then(rate => {
            countryEntry.results.push({
              variant_id: variantId,
              shipping: rate || 'Shipping not available'
            });
            bar.increment();
          })
          .catch(err => {
            console.error(`❌ Final failure for variant ${variantId} in ${country.code}: ${err.message}`);
            countryEntry.results.push({
              variant_id: variantId,
              shipping: 'Error'
            });
            bar.increment();
          })
      )
    );

    await Promise.allSettled(tasks);
    results.push(countryEntry);
  }

  bar.stop();
  fs.writeFileSync('shippingRatesByVariant.json', JSON.stringify(results, null, 2));
  console.log('✅ Done. Results saved to shippingRatesByVariant.json');
}


app.get('/trigger-shipping-update', async (req, res) => {
  try {
    await updateShippingRates();
    res.send('Shipping rates update triggered!');
  } catch (error) {
    res.status(500).send('Error occurred during update');
  }
});













function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateVariantPriceWithRetry(variantId, syncId, newRetailPrice, oldRetailPrice, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`https://api.printful.com/store/variants/${syncId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ retail_price: newRetailPrice })
      });

      const result = await response.json();

      if (response.ok) {
        const msg = `✅ Updated Printful variant_id ${variantId} (sync_id: ${syncId}): $${oldRetailPrice} → $${newRetailPrice}`;
        console.log(msg);
        return { success: true, message: msg };
      } else {
        const msg = `❌ Attempt ${attempt} failed for variant_id ${variantId}: ${result.result || result.error}`;
        console.warn(msg);
        if (attempt < maxRetries) await delay(1500 * attempt);
        else return { success: false, message: msg };
      }

    } catch (err) {
      const msg = `❌ Attempt ${attempt} network error for variant_id ${variantId}: ${err.message}`;
      console.error(msg);
      if (attempt < maxRetries) await delay(1500 * attempt);
      else return { success: false, message: msg };
    }
  }
}

app.get('/update-prices', async (req, res) => {
  try {
    const shippingData = JSON.parse(fs.readFileSync('shippingRatesByVariant.json', 'utf-8'));
    const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

    const response = await fetch('http://localhost:3000/product/403,19,678,474,585,382,637');
    const rawData = await response.json();

    const variantPrices = {};
    const variantAvailability = {};
    rawData.forEach(entry => {
      const variants = entry?.data?.result?.variants || [];
      variants.forEach(variant => {
        if (variant.id && variant.price) {
          variantPrices[variant.id] = parseFloat(variant.price);

          const usStatus = (variant.availability_status || []).find(
            s => s.region === 'US'
          );
          variantAvailability[variant.id] = usStatus?.status === 'in_stock';
        }
      });
    });

    const maxRates = {};
    for (const region of shippingData) {
      for (const result of region.results) {
        const id = result.variant_id;
        const rate = parseFloat(result.shipping?.rate || 0);
        if (!maxRates[id] || rate > maxRates[id]) {
          maxRates[id] = rate;
        }
      }
    }

    console.log('✅ Max shipping rates found:', maxRates);

    let updatedCount = 0;
    const updateLog = [];

    for (const product of products) {
      for (const variant of product.sync_variants || []) {
        const variantId = variant.variant_id;

        if (!variantId) {
          const msg = `❌ Skipped: Missing variant_id in a variant of product ${product.id}`;
          console.log(msg);
          updateLog.push(msg);
          continue;
        }

        const basePrice = variantPrices[variantId];
        const shipping = maxRates[variantId];
        const inStock = variantAvailability[variantId];

        if (basePrice == null || isNaN(basePrice)) {
          const msg = `❌ Skipped: No base price for variant_id ${variantId}`;
          console.log(msg);
          updateLog.push(msg);
          continue;
        }

        if (shipping == null || isNaN(shipping)) {
          const msg = `❌ Skipped: No shipping rate for variant_id ${variantId}`;
          console.log(msg);
          updateLog.push(msg);
          continue;
        }

        const markupRate = 0.71 + Math.random() * 0.06;
        const rawPrice = basePrice + shipping;
        const calculatedPrice = rawPrice * (1 + markupRate);
        const newRetailPrice = Math.max(calculatedPrice, rawPrice + 2.5).toFixed(2);
        const oldRetailPrice = parseFloat(variant.retail_price || 0).toFixed(2);

        if (oldRetailPrice !== newRetailPrice) {
          const result = await updateVariantPriceWithRetry(
            variantId,
            variant.id,
            newRetailPrice,
            oldRetailPrice
          );
          updateLog.push(result.message);

          if (result.success) {
            variant.retail_price = newRetailPrice;
            updatedCount++;
          }

          await delay(15000); // slow down between each update
        } else {
          const msg = `ℹ️ No change: Price already up-to-date for variant_id ${variantId} ($${oldRetailPrice})`;
          console.log(msg);
          updateLog.push(msg);
        }

        if (typeof inStock === 'boolean') {
          variant.in_stock = inStock;
        }
      }
    }

    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    fs.writeFileSync('updated_products_log.txt', updateLog.join('\n'));

    res.send({
      updated: updatedCount,
      message: `Update complete. ${updatedCount} variant(s) updated.`,
      log: updateLog
    });

  } catch (err) {
    console.error('❌ Update failed:', err);
    res.status(500).send('Server error during price update.');
  }
});














const ORDERS_FILE = path.join(__dirname, 'Orders.json');

async function getPrintfulOrder(printfulOrderId) {
  const response = await fetch(`https://api.printful.com/orders/${printfulOrderId}`, {
    headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
  });

  if (!response.ok) throw new Error(`Failed to fetch Printful order: ${printfulOrderId}`);
  const data = await response.json();
  return data.result;
}

async function sendTrackingEmail(order, trackingNumber, trackingUrl) {
  const mailOptions = {
    from: '"MY CUP OF EARTH" <your@email.com>',
    to: order.customer.email,
    subject: `Your Order ${order.orderId} Has Shipped!`,
    html: `
      <p>Hello ${order.customer.name},</p>
      <p>Here's one of your tracking numbers for your order:</p>
      <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      <p><a href="${trackingUrl}">Track Your Package</a></p>
      <p>Thanks for shopping with us!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Sent tracking email to ${order.customer.email} for tracking number ${trackingNumber}`);
}

async function syncTrackingNumbers() {
  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  let updated = false;

  for (const order of orders) {
    if (!order.printfulOrderId) continue;

    try {
      const printfulOrder = await getPrintfulOrder(order.printfulOrderId);
      const shipments = printfulOrder.shipments || [];

      if (shipments.length === 0) continue;

      // Initialize arrays if missing
      if (!Array.isArray(order.tracking_numbers)) order.tracking_numbers = [];
      if (!Array.isArray(order.tracking_urls)) order.tracking_urls = [];
      if (!Array.isArray(order.tracking_email_sent)) order.tracking_email_sent = [];

      // Track if this order got any new tracking numbers
      let orderUpdated = false;

      for (const shipment of shipments) {
        const tn = shipment.tracking_number;
        const url = shipment.tracking_url;

        if (!tn) continue;

        // If tracking number is new (not in the order.tracking_numbers array)
        if (!order.tracking_numbers.includes(tn)) {
          order.tracking_numbers.push(tn);
          order.tracking_urls.push(url || '');
          order.tracking_email_sent.push(false);
          updated = true;
          orderUpdated = true;
          console.log(`✅ Added new tracking number ${tn} for Order ${order.orderId}`);
        }
      }

      // Send emails for all tracking numbers that haven't been emailed yet
      for (let i = 0; i < order.tracking_numbers.length; i++) {
        if (!order.tracking_email_sent[i]) {
          await sendTrackingEmail(order, order.tracking_numbers[i], order.tracking_urls[i]);
          order.tracking_email_sent[i] = true;
          updated = true;
          orderUpdated = true;
        }
      }

      if (orderUpdated) {
        console.log(`ℹ️ Updated Order ${order.orderId} tracking info and emails.`);
      }

    } catch (err) {
      console.error(`❌ Error updating Order ${order.orderId}: ${err.message}`);
    }
  }

  if (updated) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
    console.log('✅ Orders file updated with tracking numbers and emails.');
  } else {
    console.log('ℹ️ No new tracking updates.');
  }
}

syncTrackingNumbers();

// Run every 15 minutes (15 * 60 * 1000 milliseconds)
setInterval(syncTrackingNumbers, 15 * 60 * 1000);








app.get("/api/orders", (req, res) => {
  const emailQuery = (req.query.email || "").trim().toLowerCase();

  if (!emailQuery) {
    return res.status(400).json({ error: "Missing email query parameter" });
  }

  const usersDir = path.join(__dirname, "users");
  let accountId = null;

  // 🔍 Look through user subfolders
  const userFolders = fs.readdirSync(usersDir).filter(name =>
    fs.lstatSync(path.join(usersDir, name)).isDirectory()
  );

  for (const folderName of userFolders) {
    const userFilePath = path.join(usersDir, folderName, `${folderName}.json`);
    if (!fs.existsSync(userFilePath)) continue;

    try {
      const userData = JSON.parse(fs.readFileSync(userFilePath, "utf8"))[0];
      if (userData.email?.toLowerCase() === emailQuery) {
        accountId = userData.accountId;
        break;
      }
    } catch (err) {
      console.warn("Error reading user file:", err);
    }
  }

  if (!accountId) {
    console.warn("No matching account found for:", emailQuery);
    return res.json([]); // No user found
  }

  const ordersDir = path.join(usersDir, accountId, "orders");
  if (!fs.existsSync(ordersDir)) {
    return res.json([]); // No orders folder
  }

  const orderFiles = fs.readdirSync(ordersDir).filter(f => f.endsWith(".json"));
  const orders = [];

  for (const filename of orderFiles) {
    const fullPath = path.join(ordersDir, filename);
    try {
      const orderData = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      // Use orderData[0] if stored as array, or just orderData if stored as object
      const order = Array.isArray(orderData) ? orderData[0] : orderData;
      orders.push(order);
    } catch (err) {
      console.warn("Error reading order file:", filename, err);
    }
  }

  return res.json(orders);
});












const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json');

// Employee Recipient Emails (replace with actual emails, separated by commas)
const EMPLOYEE_RECIPIENTS_STRING = "reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, reachmycupofearth@gmail.com, ";

// Company Logo URL (MUST be a publicly accessible web URL, NOT a local file path)
const COMPANY_LOGO_URL = 'localhost:4000/assets/images/logo.svg';

// --- END OF INLINE CONFIGURATION ---


// Derive the sending email user from the transporter's auth configuration
const SENDER_EMAIL_USER = transporter.options.auth.user;


// Verify transporter connection (optional, good for debugging)
transporter.verify(function (error, success) {
  if (error) {
    console.error("Nodemailer Transporter Error:", error);
  } else {
    console.log("Nodemailer Transporter ready for messages.");
  }
});



// Create the submissions file if it doesn't exist
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, '', 'utf8');
    console.log(`Created new submissions file: ${SUBMISSIONS_FILE}`);
  } catch (err) {
    console.error(`Error creating submissions file ${SUBMISSIONS_FILE}:`, err);
    process.exit(1);
  }
}

// --- Helper function to send email to employee ---
async function sendEmployeeNotification(name, email, message) {
  const employeeRecipients = EMPLOYEE_RECIPIENTS_STRING.split(',').map(r => r.trim()).filter(r => r);
  const randomIndex = Math.floor(Math.random() * employeeRecipients.length);
  const recipient = employeeRecipients[randomIndex];

  if (!recipient) {
      console.warn("No employee recipient found to send notification.");
      return;
  }

  const mailOptions = {
    // Use the SENDER_EMAIL_USER variable derived from the transporter
    from: `"Contact Form" <${SENDER_EMAIL_USER}>`,
    to: recipient,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Employee notification sent to ${recipient}`);
  } catch (error) {
    console.error(`Error sending employee notification to ${recipient}:`, error);
  }
}

// --- Helper function to send auto-response to inquirer ---
async function sendAutoResponse(inquirerName, inquirerEmail) {
  const htmlBody = `
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <img src="${COMPANY_LOGO_URL}" alt="Company Logo" style="width: 72px; height: 72px; margin-right: 15px;">
          <h2 style="color: #0066ff; margin: 0;">Thank You For Reaching Out, ${inquirerName}!</h2>
        </div>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          We have received your message and will get back to you shortly.
        </p>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          Best regards,<br>
          <strong>MY CUP OF EARTH</strong><br>
          <a href="https://m-cochran.github.io/Randomerr/" style="color: #0056b3; text-decoration: none;">Visit our website</a>
        </p>
        <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
          Follow us on social media:
        </p>
      <div style="margin-top: 10px;">
        <a href="https://www.facebook.com/profile.php?id=100074631399155" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://x.com/MyCupOfEarth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png" alt="Twitter Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.instagram.com/mycupofearth/" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.tiktok.com/@mycupofearth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ionicons_logo-tiktok.svg/512px-Ionicons_logo-tiktok.svg.png?20230423144016" alt="TikTok Logo" style="width: 24px; height: 24px; border: none;">
        </a>
        <a href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/512px-YouTube_social_white_squircle.svg.png?20200112151940" alt="Youtube Logo" style="width: 24px; height: 24px; border: none;">
        </a>
      </div>

        <footer style="margin-top: 20px; font-size: 12px; color: #666;">
          <p>© ${new Date().getFullYear()} MY CUP OF EARTH. All rights reserved.</p>
        </footer>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"MY CUP OF EARTH" <${SENDER_EMAIL_USER}>`, // Use SENDER_EMAIL_USER here
    to: inquirerEmail,
    subject: "Thank You for Contacting Us!",
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Auto-response sent to ${inquirerEmail}`);
  } catch (error) {
    console.error(`Error sending auto-response to ${inquirerEmail}:`, error);
  }
}

// --- API Endpoint for Form Submission ---
app.post('/submit-contact-form', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  const submission = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  // --- 1. Save to JSONL file ---
  fs.appendFile(SUBMISSIONS_FILE, JSON.stringify(submission) + '\n', 'utf8', (err) => {
    if (err) {
      console.error('Error saving submission to file:', err);
    } else {
      console.log('Submission saved:', submission);
    }
  });

  // --- 2. Send emails (asynchronous operations) ---
  sendEmployeeNotification(name, email, message);
  sendAutoResponse(name, email);

  res.status(200).json({ message: 'Your message has been received and emails are being sent!' });
});












const fsPromises = fs.promises;




// === Helpers ===
async function SafeReadJSON(filePath) {
  try {
    const raw = await fsPromises.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function SafeWriteJSON(filePath, obj) {
  await fsPromises.writeFile(filePath, JSON.stringify(obj, null, 2), 'utf8');
}

function generateToken() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function findUserFileByEmail(email) {
  const usersDir = path.join(__dirname, 'users');
  if (!fs.existsSync(usersDir)) return null;

  const files = fs.readdirSync(usersDir);
  for (const file of files) {
    const full = path.join(usersDir, file, `${file}.json`); // array-style JSON file
    const user = await SafeReadJSON(full);
    if (!Array.isArray(user) || user.length === 0) continue;

    if (String(user[0].email).toLowerCase() === String(email).toLowerCase()) {
      return { user, userFile: full };
    }
  }
  return null;
}



// === Routes ===
app.post('/api/request-password-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const found = await findUserFileByEmail(email);
    const genericResponse = { message: 'If that email is registered, a reset link has been sent.' };
    if (!found) return res.json(genericResponse);

    const { user, userFile } = found; 
    // `user` here is the parsed array from JSON file

    // Find the correct account inside the array
    const userObj = user.find(u => u.email === email);
    if (!userObj) return res.json(genericResponse);

    // Generate token + expiry
    const token = generateToken();
    const expiresMs = Date.now() + 15 * 60 * 1000;

    // Save into user object
    userObj.resetToken = token;
    userObj.resetTokenExpires = expiresMs;

    // Write back updated array
    await SafeWriteJSON(userFile, user);

    // Build reset link
    const resetUrl = `http://localhost:4000/reset-password/?token=${token}`;

    // --- Email setup ---
    const logoUrl = "http://localhost:4000/assets/images/logo.svg";
    const facebookUrl = "https://www.facebook.com/profile.php?id=100074631399155";
    const twitterUrl = "https://x.com/MyCupOfEarth";
    const instagramUrl = "https://www.instagram.com/mycupofearth/";
    const tiktokUrl = "https://www.tiktok.com/@mycupofearth";
    const youtubeUrl = "https://www.youtube.com/@MYCUPOFEARTH";

    const subject = "Password Reset Request";
    const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
        <div style="margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; max-width: 600px;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <img src="${logoUrl}" alt="Company Logo" style="width: 100px; height: auto; margin-right: 15px;">
            <h2 style="color: #0066ff; margin: 0;">Reset Your Password</h2>
          </div>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            You requested a password reset for your <strong>MY CUP OF EARTH</strong> account.
            Click the button below to set a new password. This link will expire in <strong>15 minutes</strong>.
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" style="background-color: #0066ff; color: #fff; padding: 14px 28px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; line-height: 1.5; margin-bottom: 20px; color: #555;">
            If you did not request this, you can safely ignore this email — your password will remain unchanged.
          </p>
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Follow us on social media:</p>
          <div style="margin-top: 10px;">
            <a href="${facebookUrl}" style="margin-right: 10px;" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" style="width: 24px; height: 24px;"></a>
            <a href="${twitterUrl}" style="margin-right: 10px;" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png" style="width: 24px; height: 24px;"></a>
            <a href="${instagramUrl}" style="margin-right: 10px;" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" style="width: 24px; height: 24px;"></a>
            <a href="${tiktokUrl}" style="margin-right: 10px;" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg" style="width: 24px; height: 24px;"></a>
            <a href="${youtubeUrl}" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/YouTube_social_white_squircle.svg" style="width: 24px; height: 24px;"></a>
          </div>
          <footer style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
            <p>© ${new Date().getFullYear()} MY CUP OF EARTH. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>`;

    const mailOptions = {
      from: '"MY CUP OF EARTH" <no-reply@example.com>',
      to: userObj.email,
      subject,
      text: `You requested a password reset. Use this link within 15 minutes: ${resetUrl}`,
      html: htmlBody
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('Failed to send email:', err);
      else console.log('Reset email sent:', info.response);
    });

    res.json(genericResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body || {};
    if (!token || !newPassword) return res.status(400).json({ message: 'Missing token or newPassword' });

    const usersDir = path.join(__dirname, 'users');
    if (!fs.existsSync(usersDir)) return res.status(400).json({ message: 'Invalid or expired token' });

    for (const folder of fs.readdirSync(usersDir)) {
      const userFile = path.join(usersDir, folder, `${folder}.json`);
      const userData = await SafeReadJSON(userFile);
      if (!Array.isArray(userData) || userData.length === 0) continue;

      const u = userData[0];
      if (u.resetToken && u.resetToken === token && Date.now() < (u.resetTokenExpires || 0)) {
        u.password = await bcrypt.hash(newPassword, 10);
        delete u.resetToken;
        delete u.resetTokenExpires;

        await SafeWriteJSON(userFile, userData);
        return res.json({ message: 'Password reset successful. You may now log in.' });
      }
    }

    res.status(400).json({ message: 'Invalid or expired token' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: String(err) });
  }
});








// 📌 Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${PORT} (also accessible via your local IP on the network)`);
  });
  
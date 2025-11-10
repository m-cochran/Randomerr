---
layout: default
title: "Forgot-Password"
permalink: /forgot-password/
---


<div class="forgot-container">
  <h2>Forgot Password</h2>
  <form id="forgot-form" class="forgot-form">
    <input type="email" id="forgot-email" placeholder="Enter your email" required>
    <button type="submit" class="btn">Send Reset Link</button>
  </form>
  <p id="msg" class="msg" aria-live="polite"></p>
</div>


<style>
/* Forgot password page */
.forgot-container {
  max-width: 420px;
  margin: 4rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(10,10,10,0.08);
  background: #ffffff;
  text-align: center;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.forgot-container h2 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: #12202b;
  letter-spacing: -0.2px;
}

/* Form */
.forgot-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: stretch;
}

/* Inputs: single-line, full width */
.forgot-form input[type="email"] {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  border: 1px solid #d4d8dd;
  font-size: 1rem;
  outline: none;
  transition: box-shadow .15s ease, border-color .15s ease;
  box-sizing: border-box;
}

/* Input focus */
.forgot-form input[type="email"]:focus {
  border-color: #5b9bd5;
  box-shadow: 0 4px 18px rgba(91,155,213,0.12);
}

/* Button */
.forgot-form .btn {
  display: inline-block;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(180deg,#1366d6,#0b57b1);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: transform .08s ease, box-shadow .08s ease, opacity .08s ease;
}

/* Button hover & active */
.forgot-form .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(11,87,177,0.12); }
.forgot-form .btn:active { transform: translateY(0); }

/* Disabled/processing */
.forgot-form .btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Message area */
.msg {
  margin-top: 0.75rem;
  min-height: 1.25rem;
  font-size: 0.95rem;
}

/* Success and error variants */
.msg.success { color: #08660d; }
.msg.error { color: #8b1e1e; }

/* Small screens */
@media (max-width: 480px) {
  .forgot-container { margin: 2rem 1rem; padding: 1.25rem; }
  .forgot-container h2 { font-size: 1.25rem; }
}
</style>


<script>
const form = document.getElementById('forgot-form');
const btn  = form.querySelector('.btn');
const msg  = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.textContent = 'Sending…';
  msg.className = 'msg';
  try {
    const email = document.getElementById('forgot-email').value;
    const res = await fetch('http://localhost:3000/api/request-password-reset', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    msg.textContent = data.message || 'If that email is registered, a reset link was sent.';
    msg.classList.add('success');
  } catch (err) {
    msg.textContent = 'Something went wrong — please try again later.';
    msg.classList.add('error');
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Reset Link';
  }
});

</script>

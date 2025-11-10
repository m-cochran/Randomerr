---
layout: default
title: television
permalink: /tv
---
<head>
   <meta charset="UTF-8" />
   <title>MCOETV M3U Player</title>
   <style>
      /*
      * Note: 'body, html' CSS rules are intentionally omitted from here.
      * Your Jekyll theme's global CSS should define these to avoid conflicts.
      * The player container (#player-container) will handle full viewport sizing.
      */
      #player-container {
      position: relative;
      border-radius: 8px;
      height: 65vh;
      /* Full viewport height */
      display: flex;
      /* Centers the video player */
      justify-content: center;
      align-items: center;
      background-color: #000;
      /* Black background for player area */
      overflow: hidden;
      /* Crucial for containing the video and controls cleanly */
      }
      /* Basic styling for the native video element */
      #player {
      width: 100%;
      height: 100%;
      display: block;
      /* Ensures no extra space around the video */
      object-fit: contain;
      /* Ensures the video scales properly within its container */
      background-color: #000;
      /* Fallback background for video element */
      border-radius: 8px;
      /* Apply rounded corners directly to the video */
      }
      /* Styles for the channel list overlay */
      #channel-list {
      position: absolute;
      top: 0px;
      left: 0px;
      max-height: calc(40vh - 20px);
      /* Account for top/bottom padding/margin */
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.7);
      /* Semi-transparent background */
      color: white;
      padding: 10px;
      font-size: 14px;
      border-radius: 8px;
      /* Z-index: Ensure it's above the video, but below controls if they overlap */
      z-index: 100;
      transition: opacity 0.3s ease;
      /* Smooth show/hide transition */
      scrollbar-width: none;
      /* Hide scrollbar for Firefox */
      }
      /* Class to hide the channel list and controls */
      #channel-list.hidden {
      opacity: 0;
      pointer-events: none;
      /* Prevents interaction when hidden */
      }
      /* Styles for individual channel items */
      .channel {
      padding: 6px 10px;
      cursor: pointer;
      user-select: none;
      /* Prevents text selection on click */
      white-space: nowrap;
      /* Keeps channel names on a single line */
      overflow: hidden;
      /* Hides overflowing text */
      text-overflow: ellipsis;
      /* Adds "..." for overflowing text */
      max-width: 200px;
      /* Optional: Constrain channel list width for aesthetics */
      }
      .channel:hover {
      background-color: rgba(255, 255, 255, 0.1);
      /* Hover effect */
      }
      #channel-list {
      /* existing styles */
      overflow-y: auto;
      scrollbar-width: thin;
      /* Firefox */
      scrollbar-color: #888 transparent;
      }
      /* Webkit (Chrome, Edge, Safari) scrollbar styles */
      #channel-list::-webkit-scrollbar {
      width: 8px;
      }
      #channel-list::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 4px;
      }
      #channel-list::-webkit-scrollbar-track {
      background: transparent;
      }
      /* --- Custom Controls Bar Styles --- */
      #custom-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 15px 10px 10px;
      /* Adjust padding for visual appeal */
      display: flex;
      align-items: center;
      justify-content: flex-start;
      /* Align items to the start */
      gap: 15px;
      /* Space between control elements */
      z-index: 101;
      /* Above channel list */
      box-sizing: border-box;
      /* Include padding in width calculation */
      opacity: 1;
      transition: opacity 0.3s ease;
      /* Smooth show/hide transition */
      }
      #custom-controls.hidden {
      opacity: 0;
      pointer-events: none;
      /* Prevents interaction when hidden */
      }
      .control-button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      /* Larger icons */
      cursor: pointer;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      /* Ensure smooth icon changes for play/pause/volume */
      transition: color 0.2s ease;
      }
      .control-button:hover {
      color: #ddd;
      }
      /* Play/Pause Button Specifics */
      #play-pause-btn .play-icon,
      #play-pause-btn .pause-icon {
      display: none;
      /* Controlled by JS */
      }
      #play-pause-btn.paused .play-icon {
      display: block;
      }
      #play-pause-btn.playing .pause-icon {
      display: block;
      }
      /* Volume Button Specifics */
      #volume-btn .volume-high-icon,
      #volume-btn .volume-mute-icon {
      display: none;
      /* Controlled by JS */
      }
      #volume-btn.unmuted .volume-high-icon {
      display: block;
      }
      #volume-btn.muted .volume-mute-icon {
      display: block;
      }
      /* Seek Bar Styles */
      #seek-bar-container {
      flex-grow: 1;
      /* Takes up available space */
      height: 5px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      margin: 0 10px;
      }
      #seek-bar {
      height: 100%;
      width: 0%;
      background-color: #007bff;
      /* Progress color */
      border-radius: 2px;
      }
      /* Current Time and Duration Display */
      /* Fullscreen Button - part of custom-controls */
      #fullscreen-btn {
      margin-left: auto;
      /* Pushes the fullscreen 
      button to the far right */
      }
      #splash-screen {
      position: absolute; /* Covers the entire viewport */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000; /* Black bg or any style you want */
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 1; /* On top of everything */
      font-family: Arial, sans-serif;
      user-select: none;
      text-align: center;
      }
      #volume-slider-container {
      position: absolute;
      bottom: 80px;
      left: 20px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 3.3s ease;
      z-index: 200;
      }
      #volume-slider {
      transform: rotate(-90deg);
      width: 100px;
      height: 5px;
      appearance: none;
      background: #ccc;
      border-radius: 5px;
      cursor: pointer;
      }
      #volume-slider::-webkit-slider-thumb {
      appearance: none;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      }
      #volume-btn:hover + #volume-slider-container,
      #volume-slider-container:hover {
      opacity: 1;
      visibility: visible;
      }

      

    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 10vh;
      margin-top: 20px;
    }

    .container-disclaimer {
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      width: 100%;
      max-width: 42rem;
      border: 1px solid #e5e7eb;
    }



    .warning {
      font-size: 1.875rem;
      /* 3xl */
      font-weight: 700;
      color: #1f2937;
      text-align: center;
      margin-bottom: 1rem;
    }

    .intro-text {
      color: #4b5563;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .button-container {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .toggle-button {
      background-color: #0066ff;
      color: #ffffff;
      font-weight: 600;
      padding: 0.5rem 1.5rem;
      border-radius: 9999px;
      /* full rounded */
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      transition-property: background-color;
      transition-duration: 200ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      border: none;
      cursor: pointer;
    }

    .toggle-button:hover {
      background-color: #07f;
    }

    .disclaimer-box {
      display: none;
      background-color: #f9fafb;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #d1d5db;
      transition: all 0.3s ease-in-out;
      transform-origin: top;
      opacity: 0;
      max-height: 0;
      overflow-y: scroll;
    }

    .disclaimer-box.show {
      display: block;
      opacity: 1;
      max-height: 20rem;
      /* Adjust as needed */
    }

    .disclaimer-box h2 {
      font-size: 1.5rem;
      /* 2xl */
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.75rem;
      text-align: center;
    }

    .disclaimer-box p {
      color: #374151;
      line-height: 1.625;
      text-align: justify;
    }

    .disclaimer-box p+p {
      margin-top: 1rem;
    }
  
   </style>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
</head>
<body>
   <div id="player-container">
      <div id="splash-screen">
         <div class="splash-content">
    
    <h1>Welcome to</h1>
    <img src="assets/images/logotv.svg" alt="MCOETV Logo" class="splash-logo">
    <p>Select a channel to start watching</p>
  </div>
      </div>
      <video id="player" playsinline></video>
      <div id="channel-list"></div>
      <div id="custom-controls">
         <button id="play-pause-btn" class="control-button paused">
            <svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="white">
               <polygon points="5,3 19,12 5,21" />
            </svg>
            <svg class="pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="white">
               <rect x="6" y="4" width="4" height="16" />
               <rect x="14" y="4" width="4" height="16" />
            </svg>
         </button>
         <button id="volume-btn" class="control-button unmuted" aria-label="Toggle Mute">
            <!-- Unmuted (Volume Up) -->
            <svg class="volume-high-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="currentColor">
               <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>
            </svg>
            <!-- Muted (Volume Off) -->
            <svg class="volume-mute-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="currentColor">
               <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM3 10v4h4l5 5V5l-5 5H3z"/>
               <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" />
            </svg>
         </button>
         <div id="volume-slider-container">
            <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="1" />
         </div>
         <div id="seek-bar-container">
            <div id="seek-bar"></div>
         </div>
         <button id="fullscreen-btn" class="control-button" aria-label="Toggle fullscreen">
            <svg id="fullscreen-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" role="img" preserveAspectRatio="xMidYMid meet">
               <title>Fullscreen</title>
               <path d="M4 4h6v2H6v4H4V4zm16 0v6h-2V6h-4V4h6zM6 18h4v2H4v-6h2v4zm12-4h2v6h-6v-2h4v-4z"/>
            </svg>
         </button>
      </div>
   </div>

   
 

  <div class="wrapper">
    <!-- Main container for the disclaimer component -->
    <div class="container-disclaimer">
      <h1 class="warning">MCOETV Disclaimer</h1>
      <p class="intro-text">
        All parties agree by using MCOETV Player.
      </p>

      <!-- Dropdown button to toggle the disclaimer -->
      <div class="button-container">
        <button id="toggleButton" class="toggle-button">
          Show Disclaimer
        </button>
      </div>

      <!-- The disclaimer container, initially hidden -->
      <div id="disclaimer" class="disclaimer-box">
        <h2>Important Disclaimer</h2>
        <p>"Disclaimer: The video links provided herein are for informational and educational purposes only. We do not own, operate, or control the content hosted on these external platforms. The inclusion of any link does not imply a recommendation or endorsement of the content, products, or services offered on the linked site.</p>

        <p>We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the videos or the information contained within them. We shall not be liable for any loss or damage arising from or in connection with the use of these links or the content displayed on external websites, including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>

        <p>All viewers are advised to exercise their own judgment and discretion. Your use of these links is at your sole risk."</p>
        
      </div>
    </div>
  </div>


   <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
   <script>
      let firstChannel = null;
      let streamStarted = false;
      
          (function () {
              "use strict";
              // Get references to DOM elements
              const playerContainer = document.getElementById("player-container");
              const video = document.getElementById("player");
              const channelList = document.getElementById("channel-list");
              const customControls = document.getElementById("custom-controls");
              const playPauseBtn = document.getElementById("play-pause-btn");
              const volumeBtn = document.getElementById("volume-btn");
              const seekBarContainer = document.getElementById("seek-bar-container");
              const seekBar = document.getElementById("seek-bar");
              const fullscreenBtn = document.getElementById("fullscreen-btn");
              const volumeSlider = document.getElementById("volume-slider");
      
              volumeSlider.addEventListener("input", () => {
                  video.volume = volumeSlider.value;
                  video.muted = video.volume === 0;
                  if (video.muted) {
                      volumeBtn.classList.remove("unmuted");
                      volumeBtn.classList.add("muted");
                  } else {
                      volumeBtn.classList.remove("muted");
                      volumeBtn.classList.add("unmuted");
                  }
              });
      
              let hideTimeout;
              let isSeeking = false; // Flag to prevent seek bar updates during drag
              const m3uUrl = "/MCOETV.m3u8";
              // --- Utility Functions ---
              function formatTime(seconds) {
                  if (isNaN(seconds) || seconds < 0) return "00:00";
                  const h = Math.floor(seconds / 3600);
                  const m = Math.floor((seconds % 3600) / 60);
                  const s = Math.floor(seconds % 60);
                  const format = (val) => val.toString().padStart(2, "0");
                  if (h > 0) {
                      return `${h}:${format(m)}:${format(s)}`;
                  }
                  return `${format(m)}:${format(s)}`;
              }
              // --- Fetch and Parse M3U ---
              async function fetchM3U(url) {
                  console.log(`[MCOETV Player] Attempting to fetch M3U from: ${url}`);
                  try {
                      const res = await fetch(url);
                      if (!res.ok) {
                          throw new Error(`HTTP error! Status: ${res.status} for ${url}`);
                      }
                      const text = await res.text();
                      console.log("[MCOETV Player] M3U fetched successfully. Parsing...");
                      return parseM3U(text);
                  } catch (error) {
                      console.error("[MCOETV Player] Error fetching M3U playlist:", error);
                      // Provide a user-friendly error message on the page if channel list isn't visible
                      channelList.innerHTML = '<div style="color:red; text-align:center; padding: 10px;">Failed to load channels.<br>Check console for errors.</div>';
                      return [];
                  }
              }
      
              function parseM3U(data) {
                  const lines = data.split("\n");
                  const channels = [];
                  let name = "";
                  for (let line of lines) {
                      if (line.startsWith("#EXTINF")) {
                          name = line.split(",")[1]?.trim() || "Unnamed Channel";
                      } else if (line && !line.startsWith("#")) {
                          channels.push({
                              name,
                              url: line.trim(),
                          });
                      }
                  }
                  console.log(`[MCOETV Player] Parsed ${channels.length} channels.`);
                  return channels;
              }
              // --- Stream Playback ---
              function playStream(url) {
                  console.log(`[MCOETV Player] Attempting to play stream: ${url}`);
                  // Clean up previous HLS instance if it exists
                  if (video.hlsInstance) {
                      console.log("[MCOETV Player] Destroying previous HLS instance.");
                      video.hlsInstance.destroy();
                      video.hlsInstance = null;
                  }
      
                  if (typeof Hls !== "undefined" && Hls.isSupported()) {
                      const hls = new Hls();
                      hls.on(Hls.Events.ERROR, function (event, data) {
                          console.error("[MCOETV Player] HLS.js error:", data);
                          if (data.fatal) {
                              switch (data.type) {
                                  case Hls.ErrorTypes.NETWORK_ERROR:
                                      console.log("[MCOETV Player] HLS.js: Fatal network error, trying to recover...");
                                      hls.startLoad();
                                      break;
                                  case Hls.ErrorTypes.MEDIA_ERROR:
                                      console.log("[MCOETV Player] HLS.js: Fatal media error, trying to recover...");
                                      hls.recoverMediaError();
                                      break;
                                  default:
                                      console.log("[MCOETV Player] HLS.js: Unhandled fatal error, destroying HLS instance.");
                                      hls.destroy();
                                      break;
                              }
                          }
                      });
                      hls.loadSource(url);
                      hls.attachMedia(video);
                      video.hlsInstance = hls;
                      hls.on(Hls.Events.MANIFEST_PARSED, () => {
                          video.play().catch((e) => console.error("[MCOETV Player] Video play failed (user gesture required):", e));
                          console.log("[MCOETV Player] HLS manifest parsed, attempting to play video.");
                      });
                  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                      console.log("[MCOETV Player] Browser supports native HLS, using native playback.");
                      video.src = url;
                      video.addEventListener(
                          "loadedmetadata",
                          () => {
                              video.play().catch((e) => console.error("[MCOETV Player] Video play failed (user gesture required):", e));
                              console.log("[MCOETV Player] Native HLS loaded metadata, attempting to play video.");
                          },
                          {
                              once: true,
                          }
                      );
                  } else {
                      alert("Your browser does not support HLS playback.");
                      console.error("[MCOETV Player] HLS not supported and native playback failed.");
                  }
              }
              // --- UI Visibility (Channel List & Controls) ---
              /**
               * Makes the channel list and custom controls visible and sets an auto-hide timer.
               */
              function showUI() {
                  // Ensure both elements are made visible
                  channelList.classList.remove("hidden");
                  customControls.classList.remove("hidden");
                  clearTimeout(hideTimeout); // Reset any existing auto-hide timer
                  // Set a new timer to hide the UI elements after 5 seconds of inactivity
                  hideTimeout = setTimeout(() => {
                      channelList.classList.add("hidden");
                      customControls.classList.add("hidden");
                  }, 5000); // 5000 milliseconds = 5 seconds
                  console.log("[MCOETV Player] UI shown, auto-hide timer started.");
              }
              /**
               * Hides the channel list and custom controls and clears its timer.
               */
              function hideUI() {
                  // Ensure both elements are made hidden
                  channelList.classList.add("hidden");
                  customControls.classList.add("hidden");
                  clearTimeout(hideTimeout); // Ensure any pending auto-hide is cancelled
                  console.log("[MCOETV Player] UI hidden, auto-hide timer cleared.");
              }
              /**
               * Renders the fetched channels into the channel list UI.
               * @param {Array<{name: string, url: string}>} channels - Array of channel objects.
               */
              function renderChannelList(channels) {
      if (channels.length === 0) {
          channelList.innerHTML = '<div style="color:gray; text-align:center; padding:10px;">No channels found.</div>';
          return;
      }
      
      firstChannel = channels[0]; // ✅ Save first channel for autoplay
      
      channelList.innerHTML = "";
      channels.slice(0, 50).forEach((ch, i) => {
          const div = document.createElement("div");
          div.className = "channel";
          div.textContent = ch.name;
          div.onclick = () => {
              playStream(ch.url);
              streamStarted = true; // ✅ Mark stream started
              const splash = document.getElementById("splash-screen");
              if (splash) splash.style.display = "none";
              channelList.classList.remove("hidden");
              customControls.classList.remove("hidden");
              hideUI();
          };
          channelList.appendChild(div);
      });
      }
      
      
              // --- Custom Fullscreen Logic ---
              function toggleFullscreen() {
                  if (!document.fullscreenElement) {
                      playerContainer.requestFullscreen().catch((err) => {
                          console.error(`[MCOETV Player] Error attempting to enable fullscreen: ${err.message} (${err.name})`);
                          alert("Could not go fullscreen. Your browser might block it without user gesture or security context.");
                      });
                  } else {
                      document.exitFullscreen();
                  }
              }
              // --- Event Listeners for Custom Controls ---
              // Play/Pause Button
              playPauseBtn.addEventListener("click", () => {
      if (!streamStarted && firstChannel) {
          playStream(firstChannel.url);
          const splash = document.getElementById("splash-screen");
          if (splash) splash.style.display = "none";
          streamStarted = true;
      } else if (video.paused || video.ended) {
          video.play();
      } else {
          video.pause();
      }
      });
      
              video.addEventListener("play", () => {
                  playPauseBtn.classList.remove("paused");
                  playPauseBtn.classList.add("playing");
              });
              video.addEventListener("pause", () => {
                  playPauseBtn.classList.remove("playing");
                  playPauseBtn.classList.add("paused");
              });
              // Volume Toggle Button
              volumeBtn.addEventListener("click", () => {
                  video.muted = !video.muted;
                  if (video.muted) {
                      volumeBtn.classList.remove("unmuted");
                      volumeBtn.classList.add("muted");
                  } else {
                      volumeBtn.classList.remove("muted");
                      volumeBtn.classList.add("unmuted");
                  }
              });
              // Seek Bar Functionality
              seekBarContainer.addEventListener("mousedown", (e) => {
                  isSeeking = true;
                  updateSeek(e);
              });
              document.addEventListener("mousemove", (e) => {
                  if (isSeeking) {
                      updateSeek(e);
                  }
              });
              document.addEventListener("mouseup", () => {
                  isSeeking = false;
              });
      
              function updateSeek(e) {
                  const rect = seekBarContainer.getBoundingClientRect();
                  let percentage = (e.clientX - rect.left) / rect.width;
                  percentage = Math.max(0, Math.min(1, percentage)); // Clamp between 0 and 1
                  video.currentTime = video.duration * percentage;
              }
              video.addEventListener("timeupdate", () => {
                  if (!isSeeking && video.duration && isFinite(video.duration)) {
                      // Check for finite duration for VOD streams
                      const percentage = (video.currentTime / video.duration) * 100;
                      seekBar.style.width = `${percentage}%`;
                  }
              });
              // Fullscreen Button
              fullscreenBtn.addEventListener("click", toggleFullscreen);
              // --- General UI Event Listeners (for auto-hide/show) ---
              // Mouse movement over the player container shows the UI
              playerContainer.addEventListener("mousemove", showUI);
              // Clicks on the player container (if not on a control) also show the UI
              playerContainer.addEventListener("click", showUI);
              // Fullscreen change detection
              document.addEventListener("fullscreenchange", () => {
                  if (document.fullscreenElement === playerContainer) {
                      console.log("[MCOETV Player] Entered fullscreen (playerContainer). Showing UI.");
                      showUI(); // Show UI when entering fullscreen
                  } else {
                      console.log("[MCOETV Player] Exited fullscreen. Showing UI briefly.");
                      showUI(); // Show UI briefly when exiting fullscreen
                  }
              });
              // --- Initialization ---
              document.addEventListener("DOMContentLoaded", async () => {
                  console.log("[MCOETV Player] DOMContentLoaded - Initializing script...");
                  const channels = await fetchM3U(m3uUrl);
                  renderChannelList(channels);
                  showUI(); // Show UI initially on page load
              });
          })();

          
    // Get the button and the disclaimer div from the DOM
    const toggleButton = document.getElementById('toggleButton');
    const disclaimerDiv = document.getElementById('disclaimer');
    // Add a click event listener to the button
    toggleButton.addEventListener('click', () => {
      // Toggle the 'show' class on the disclaimer div
      disclaimerDiv.classList.toggle('show');
      // Change the button text based on the visibility of the disclaimer
      if (disclaimerDiv.classList.contains('show')) {
        toggleButton.textContent = 'Hide Disclaimer';
      } else {
        toggleButton.textContent = 'Show Disclaimer';
      }
    });
  
   </script>
</body>
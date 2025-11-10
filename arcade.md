---
layout: default
title: "Arcade"
permalink: /arcade/
---

<div class="game-wrapper" id="gameWrapper">
  <div class="topbar">
    <h2>Game List</h2>
    <ul id="gameList">
      <li><a href="#" data-game="2048">2048</a></li>
      <li><a href="#" data-game="brick_breaker">Brick Breaker</a></li>
      <li><a href="#" data-game="swim_fish">Swim Fish</a></li>
      <li><a href="#" data-game="memory_match">Memory Match</a></li>
      <li><a href="#" data-game="snake">Snake</a></li>
      <li><a href="#" data-game="space_invaders">Space Invaders</a></li>
      <li><a href="#" data-game="solitaire">Solitaire</a></li>
      <li><a href="#" data-game="tic_tac_toe">Tic Tac Toe</a></li>
      <li><a href="#" data-game="gnop">Gnop</a></li>
      <li><a href="#" data-game="the_paper_plane_game">The Paper Plane Game</a></li>
      <li><a href="#" data-game="cups">Cups</a></li>
    </ul>
  </div>


  <div class="game-display">
    <div class="overlay" id="overlay" style="display: none;">
      <img src="/assets/images/logo.svg" alt="Arcade Logo" class="overlay-logo">
    </div>
     <h2 id="gameTitle" class="animated-title">Select a game to play</h2>
    <div id="gameContainer" class="game-container">
      <iframe id="gameIframe" src="" class="game-iframe"></iframe>
    </div>
  </div>
</div>

<style>
  /* Basic reset */
  * {
    padding: 0;
    box-sizing: border-box;
  }

  /* Layout for the game area */
  .game-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    font-family: Arial, sans-serif;
    user-select: none;
    border-radius: 0 0 8px 8px;
  }

  /* Topbar styling */
  .topbar {
    width: 100%;
    background-color: #06f;
    color: #EFBF04;
    overflow-x: auto;
    white-space: nowrap;
    padding: 5px 0;
    display: flex; /* Use flexbox for layout */
    align-items: center; /* Vertically center content */
  }

  .topbar h2 {
    margin: 0 15px; /* Add margin to the heading */
    font-size: 1.8rem;
  }

  .topbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline-block;
  }

  .topbar ul li {
    display: inline-block;
    margin: 0 15px;
  }

  .topbar ul li a {
    text-decoration: none;
    color: #ecf0f1;
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  .topbar ul li a:hover {
    color: #e74c3c;
  }

  /* Main display area for the game */
  .game-display {
    width: 100%;
    flex-grow: 1;
    padding: 0;
    background-image: url('/assets/images/arcade_background.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }

  .game-display h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #EFBF04;
    text-shadow: 2px 0 #ffffff, 2px 3px 0 #000000;
    z-index: 8;
    padding: 0;
    text-align: center;
  }

  .game-container {
    width: 100%;
    height: 100%;
    overflow: hidden; /* Important! */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/assets/images/arcade_background.svg');
    border: none;
    padding: 0;
    border-radius: 0;
  }

  .game-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: none;
  }

  .game-instructions {
    font-size: 1.2rem;
    color: #555;
    margin-top: 10px;
    text-align: center;
  }

  .gametitle {
    font-size: 120%;
    color: #EFBF04;
    margin-top: 10px;
    text-align: center;
  }

  .overlay {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    z-index: 7;
  }

  .overlay-logo {
    max-width: 52%;
    max-height: 52%;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.1) rotate(0deg);
    }
  }

  @keyframes pulseSpinRight {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.1) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(720deg);
    }
  }

  @keyframes pulseSpinLeft {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.1) rotate(-180deg);
    }
    100% {
      transform: scale(1) rotate(-720deg);
    }
  }

  .pulse {
    animation: pulse 1.5s ease-in-out infinite alternate;
  }

  .pulse-spin-right {
    animation: pulseSpinRight 1.5s ease-in-out infinite alternate;
  }

  .pulse-spin-left {
    animation: pulseSpinLeft 1.5s ease-in-out infinite alternate;
  }

    .animated-title {
    animation: upDown 2s ease-in-out infinite alternate;
  }

  @keyframes upDown {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10px);
    }
  }

  
</style>

<script>
  const gameList = document.getElementById('gameList');
  const gameTitle = document.getElementById('gameTitle');
  const gameIframe = document.getElementById('gameIframe');
  const overlay = document.getElementById('overlay');
  const overlayLogo = document.querySelector('.overlay-logo');

  function showOverlay() {
    overlay.style.display = 'flex';
    animateSequence();
  }

  function hideOverlay() {
    overlay.style.display = 'none';
  }

  gameList.addEventListener('click', function (e) {
    e.preventDefault();
    const game = e.target.getAttribute('data-game');

    if (game) {
      gameTitle.innerText = game.charAt(0).toUpperCase() + game.slice(1);
      gameIframe.style.display = 'block';
      hideOverlay(); //hide overlay when game is started.

      switch (game) {
        case '2048':
          gameIframe.src = '2048.html';
          break;
        case 'brick_breaker':
          gameIframe.src = 'brick_breaker.html';
          break;
        case 'swim_fish':
          gameIframe.src = 'swim_fish.html';
          break;
        case 'memory_match':
          gameIframe.src = 'memory_match.html';
          break;
        case 'snake':
          gameIframe.src = 'snake.html';
          break;
         case 'space_invaders':
          gameIframe.src = 'space_invaders.html';
          break;
        case 'solitaire':
          gameIframe.src = 'solitaire.html';
          break;
        case 'tic_tac_toe':
          gameIframe.src = 'tic_tac_toe.html';
          break;
        case 'gnop':
          gameIframe.src = 'gnop.html';
          break;
        case 'the_paper_plane_game':
          gameIframe.src = 'the_paper_plane_game.html';
          break;
        case 'cups':
          gameIframe.src = 'https://games.gdevelop-app.com/game-47074e11-8e2b-49d8-9724-099ec3953325/index.html';
          break;
        default:
          gameIframe.src = '';
          gameIframe.style.display = 'none';
      }
    }
  });

  function resetAnimations() {
    overlayLogo.classList.remove('pulse', 'pulse-spin-right', 'pulse-spin-left');
  }

function resetAnimations() {
        overlayLogo.classList.remove('pulse', 'pulse-spin-right', 'pulse-spin-left');
    }

    function animateSequence() {
        resetAnimations();
        overlayLogo.classList.add('pulse');

        setTimeout(() => {
            resetAnimations();
            overlayLogo.classList.add('pulse-spin-right');
        }, 3000);

        setTimeout(() => {
            resetAnimations();
            overlayLogo.classList.add('pulse');
        }, 4500);

        setTimeout(() => {
            resetAnimations();
            overlayLogo.classList.add('pulse-spin-right');
        }, 7500);

        setTimeout(() => {
            resetAnimations();
            overlayLogo.classList.add('pulse');
        }, 9000);

        setTimeout(() => {
            resetAnimations();
            overlayLogo.classList.add('pulse-spin-left');
        }, 12000);

        setTimeout(() => {
          resetAnimations();
        }, 13500); // This is the last setTimeout, so 13500 is the total duration
    }

    animateSequence();

    // Corrected setInterval value to match the total duration
    setInterval(animateSequence, 13500);

  // Example usage (replace with your actual game logic)
  showOverlay(); // Call this when you want to show the logo overlay.
</script>
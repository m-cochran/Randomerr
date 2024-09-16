---
layout: default
title: "Arcade"
date: 2024-08-19
permalink: /arcade/
---


<div class="game-wrapper">
  <!-- Sidebar for game list -->
  <div class="sidebar">
    <h2>Game List</h2>
    <ul id="gameList">
      <li><a href="#" data-game="2048">2048</a></li>
      <li><a href="#" data-game="brick_breaker">Brick Breaker</a></li>
      <li><a href="#" data-game="Flappy_bird">Flappy Bird</a></li>
      <li><a href="#" data-game="Memory_Match">Memory Match</a></li>
      <li><a href="#" data-game="Snake">Snake</a></li>
      <li><a href="#" data-game="Space_Invaders">Space Invaders</a></li>
      <li><a href="#" data-game="Tic_Tac_Toe">Tic Tac Toe</a></li>
      <li><a href="#" data-game="pong">Pong</a></li>
    </ul>
  </div>

  <!-- Main content for game display -->
  <div class="game-display">
    <h2 id="gameTitle">Select a game to play</h2>
    <div id="gameContainer" class="game-container">
      <!-- Game iframe or canvas will be loaded here -->
      <iframe id="gameIframe" src="" class="game-iframe"></iframe>
    </div>
  </div>
</div>

<style>
/* Basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Layout for the game area */
.game-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

/* Sidebar styling */
.sidebar {
  width: 20%;
  padding: 20px;
  background-color: #06f;
  color: #ecf0f1;
  overflow-y: auto;
}

.sidebar h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
  color: #ecdbba;
}

.sidebar ul {
  list-style-type: none;
}

.sidebar ul li {
  margin-bottom: 15px;
}

.sidebar ul li a {
  text-decoration: none;
  color: #ecf0f1;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.sidebar ul li a:hover {
  color: #e74c3c;
}

/* Main display area for the game */
.game-display {
  width: 80%;
  padding: 20px;
  background-image: url('https://m-cochran.github.io/Randomerr/assets/images/arcade_background.jpg'); /* Replace with the path to your image */
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}


.game-display h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.game-container {
  width: 100%;
  height: 100%;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://m-cochran.github.io/Randomerr/assets/images/arcade_background.jpg');
}

/* Iframe that displays the game */
.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: none;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: 30vh;
    overflow-y: hidden;
  }
  
  .game-display {
    width: 100%;
  }
}
</style>

<script>
  const gameList = document.getElementById('gameList');
  const gameTitle = document.getElementById('gameTitle');
  const gameIframe = document.getElementById('gameIframe');

  gameList.addEventListener('click', function(e) {
    e.preventDefault();
    const game = e.target.getAttribute('data-game');

    if (game) {
      gameTitle.innerText = game.charAt(0).toUpperCase() + game.slice(1);
      gameIframe.style.display = 'block';

      switch(game) {
        case '2048':
          gameIframe.src = '2048.html';
          break;
        case 'brick_breaker':
          gameIframe.src = 'brick_breaker.html';
          break;
        case 'flappy_bird':
          gameIframe.src = 'flappy_bird.html';
          break;
        case 'memory match':
          gameIframe.src = 'memory_match.html';
          break;
        case 'snake':
          gameIframe.src = 'snake.html';
          break;
         case 'Space_invaders':
          gameIframe.src = 'space_invaders.html';
          break;
         case 'tic_tac_toe':
          gameIframe.src = 'tic_tac_toe.html';
          break;
         case 'pong':
          gameIframe.src = 'pong.html';
          break;
        default:
          gameIframe.src = '';
          gameIframe.style.display = 'none';
      }
    }
  });
</script>

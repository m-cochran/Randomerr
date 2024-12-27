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
      <li><a href="#" data-game="flappy_bird">Flappy Bird</a></li>
      <li><a href="#" data-game="memory_match">Memory Match</a></li>
      <li><a href="#" data-game="snake">Snake</a></li>
      <li><a href="#" data-game="space_invaders">Space Invaders</a></li>
      <li><a href="#" data-game="solitaire">solitaire</a></li>
      <li><a href="#" data-game="tic_tac_toe">Tic Tac Toe</a></li>
      <li><a href="#" data-game="pong">Pong</a></li>
      <li><a href="#" data-game="the_paper_plane_game">The Paper Plane Game</a></li>
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
  overflow-y: scroll;
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
         case 'pong':
          gameIframe.src = 'pong.html';
          break;
         case 'the_paper_plane_game':
          gameIframe.src = 'the_paper_plane_game.html';
          break;
        default:
          gameIframe.src = '';
          gameIframe.style.display = 'none';
      }
    }
  });
</script>

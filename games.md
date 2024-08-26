---
layout: default
title: Games
permalink: /games/
---

# Games

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.


<div style="display: flex; align-items: flex-start;">
  <!-- Sidebar for game list -->
  <div style="width: 30%; padding-right: 20px;">
    <h2>Game List</h2>
    <ul id="gameList">
      <li><a href="#" data-game="pong">Pong</a></li>
      <li><a href="#" data-game="brick_breaker">Breakout</a></li>
      <li><a href="#" data-game="flappy_bird">Flappy Bird</a></li>
      <li><a href="#" data-game="snake">Snake</a></li>
      <li><a href="#" data-game="2048">2048</a></li>
      <li><a href="#" data-game="memorymatch">Memory Match</a></li>
      <li><a href="#" data-game="Tic_Tac_Toe">Tic Tac Toe</a></li>
      <!-- Add more games here -->
    </ul>
  </div>

  <!-- Main content for game display -->
  <div style="width: 70%; text-align: center;">
    <h2 id="gameTitle">Select a game to play</h2>
    <div id="gameContainer">
      <!-- Game iframe or canvas will be loaded here -->
    </div>
  </div>
</div>

<script>
  const gameList = document.getElementById('gameList');
  const gameTitle = document.getElementById('gameTitle');
  const gameContainer = document.getElementById('gameContainer');

  gameList.addEventListener('click', function(e) {
    e.preventDefault();
    const game = e.target.getAttribute('data-game');

    if (game) {
      gameTitle.innerText = game.charAt(0).toUpperCase() + game.slice(1);
      switch(game) {
        case 'pong':
          gameContainer.innerHTML = '<iframe src="pong.html" width="800" height="400"></iframe>';
          break;
        case 'breakout':
          gameContainer.innerHTML = '<iframe src="brick_breaker.html" width="800" height="400"></iframe>';
          break;
        case 'flappy bird':
          gameContainer.innerHTML = '<iframe src="Flappy_bird.html" width="800" height="400"></iframe>';
          break;
        case 'snake':
          gameContainer.innerHTML = '<iframe src="snake.html" width="800" height="400"></iframe>';
          break;
        case '2048':
          gameContainer.innerHTML = '<iframe src="2048.html" width="800" height="400"></iframe>';
          break;
        case 'memory match':
          gameContainer.innerHTML = '<iframe src="Memory_Match.html" width="800" height="400"></iframe>';
          break;
        case 'tic tac toe':
          gameContainer.innerHTML = '<iframe src="Tic_Tac_Toe.html" width="800" height="400"></iframe>';
          break;
        // Add more games here
        default:
          gameContainer.innerHTML = 'Select a game from the list.';
      }
    }
  });
</script>

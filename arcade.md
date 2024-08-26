---
layout: default
title: Arcade
permalink: /arcade/
---

# arcade

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.


<div style="display: flex; align-items: flex-start; height: 100vh; overflow: hidden;">
  <!-- Sidebar for game list -->
  <div style="width: 30%; padding-right: 20px; box-sizing: border-box; overflow-y: auto; height: 100%;">
    <h2>Game List</h2>
    <ul id="gameList">
      <li><a href="#" data-game="pong">Pong</a></li>
      <li><a href="#" data-game="breakout">Breakout</a></li>
      <li><a href="#" data-game="snake">Snake</a></li>
      <li><a href="#" data-game="space-invaders">Space Invaders</a></li>
      <li><a href="#" data-game="tetris">Tetris</a></li>
      <!-- Add more games here -->
    </ul>
  </div>

  <!-- Main content for game display -->
  <div style="width: 70%; text-align: center; box-sizing: border-box; height: 100%; display: flex; flex-direction: column;">
    <h2 id="gameTitle">Select a game to play</h2>
    <div id="gameContainer" style="flex-grow: 1; position: relative;">
      <!-- Game iframe or canvas will be loaded here -->
      <iframe id="gameIframe" src="" style="width: 100%; height: 100%; border: none; display: none;"></iframe>
    </div>
  </div>
</div>

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
        case 'pong':
          gameIframe.src = 'pong.html';
          break;
        case 'breakout':
          gameIframe.src = 'path_to_breakout_game.html';
          break;
        case 'snake':
          gameIframe.src = 'path_to_snake_game.html';
          break;
        case 'space-invaders':
          gameIframe.src = 'path_to_space_invaders_game.html';
          break;
        case 'tetris':
          gameIframe.src = 'path_to_tetris_game.html';
          break;
        // Add more games here
        default:
          gameIframe.src = '';
          gameIframe.style.display = 'none';
      }
    }
  });
</script>

---
layout: default
title: Games
permalink: /games/
---

# Games

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.

<style>

        #sidebar {
            width: 250px;
            background-color: #333;
            color: white;
            overflow-y: auto;
            padding: 10px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }
        #sidebar h2 {
            font-size: 18px;
            margin-top: 0;
        }
        #sidebar a {
            color: white;
            text-decoration: none;
            display: block;
            padding: 8px;
            border-radius: 4px;
            margin-bottom: 5px;
            transition: background-color 0.3s;
        }
        #sidebar a:hover {
            background-color: #575757;
        }
        #content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f4f4f4;
            overflow: hidden;
        }
        #game-container {
            width: 80%;
            height: 80%;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
    <div id="sidebar">
        <h2>Games</h2>
        <!-- List of games -->
        <a href="#" data-src="pong.html">Pong</a>
        <a href="#" data-src="brick_breaker.html">brick breaker</a>
        <a href="#" data-src="Flappy_Bird.html">Flappy Bird</a>
        <a href="#" data-src="Snake.html">Snake</a>
        <a href="#" data-src="Space_Invaders.html">Space Invaders</a>
        <a href="#" data-src="2048.html">2048</a>
        <a href="#" data-src="Memory_Match.html">Memory Match</a>
        <a href="#" data-src="Snake.html">Snake</a>
        <a href="#" data-src="Tic_Tac_Toe.html">Tic Tac Toe</a>
        <a href="#" data-src="2048.html">2048</a>    
        <!-- Add more games up to Game 100 -->
        <a href="#" data-src="game100.html">Game 100</a>
    </div>
    <div id="content">
        <div id="game-container">
            <!-- The game iframe will be loaded here -->
            <iframe id="game-frame" src="" title="Game"></iframe>
        </div>
    </div>

    <script>
        function resizeIframe() {
    const iframe = document.getElementById('game-frame');
    const container = document.getElementById('game-container');
    const aspectRatio = 16 / 9; // Adjust according to the game's aspect ratio

    const containerWidth = container.offsetWidth;
    const containerHeight = containerWidth / aspectRatio;

    iframe.style.height = `${containerHeight}px`;
}

window.addEventListener('resize', resizeIframe);
window.addEventListener('load', resizeIframe);

        document.querySelectorAll('#sidebar a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const src = this.getAttribute('data-src');
                document.getElementById('game-frame').src = src;
            });
        });
    </script>

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
</head>
<body>
    <div id="sidebar">
        <h2>Games</h2>
        <!-- List of games -->
        <a href="#" data-src="/games/pong.html">Pong</a>
        <a href="#" data-src="game2.html">Game 2</a>
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
        document.querySelectorAll('#sidebar a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const src = this.getAttribute('data-src');
                document.getElementById('game-frame').src = src;
            });
        });
    </script>

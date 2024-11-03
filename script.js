// script.js
let score = 0;
let playerPosition = 180; // Initial horizontal position of player
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
let obstacleInterval;
let gameInterval;

// Move player with arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (event.key === 'ArrowRight' && playerPosition < 360) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + 'px';
});

// Start obstacle movement and scoring
function startGame() {
    obstacle.style.left = Math.floor(Math.random() * 360) + 'px';
    gameInterval = setInterval(updateScore, 100);
    obstacleInterval = setInterval(moveObstacle, 20);
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

let obstacleSpeed = 12.5; // Initial speed of obstacle falling

function moveObstacle() {
    let obstacleTop = parseInt(obstacle.style.top || -40);
    
    if (obstacleTop >= 600) {
        // Reset the obstacle to start from the top again
        obstacleTop = -40;
        obstacle.style.left = Math.floor(Math.random() * 360) + 'px'; // Randomize position
        obstacleSpeed += 0.5; // Increase speed each time obstacle resets
    } else {
        obstacleTop += obstacleSpeed;
    }
    obstacle.style.top = obstacleTop + 'px';

    // Check for collision
    if (obstacleTop >= 560 && Math.abs(parseInt(obstacle.style.left) - playerPosition) < 40) {
        endGame();
    }
}


function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    alert('Game Over! Final Score: ' + score);
    resetGame();
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    playerPosition = 180;
    player.style.left = playerPosition + 'px';
    obstacle.style.top = '-40px';
    startGame();
}

// Start the game
startGame();

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const gridSize = 10;
let snake = [{x: 50, y: 50}];
let food = {x: 80, y: 80};
let direction = 'RIGHT';
let gameInterval;

// Función para actualizar el juego
function updateGame() {
    const head = { ...snake[0] };
    
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    snake.unshift(head);

    // Verificar si la serpiente ha comido la comida
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    // Verificar colisión con las paredes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        clearInterval(gameInterval);
        alert('Game Over');
    }

    // Dibujar el juego
    drawGame();
}

// Función para dibujar el juego
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la serpiente
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Dibujar la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Función para generar comida aleatoria
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

// Manejo de las teclas
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Función para iniciar el juego
document.getElementById('startGame').addEventListener('click', () => {
    snake = [{x: 50, y: 50}];
    direction = 'RIGHT';
    food = generateFood();
    gameInterval = setInterval(updateGame, 100);
});

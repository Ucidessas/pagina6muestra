// script.js

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Tamaño de cada celda
let snake = [{x: 200, y: 200}];
let food = generateFood();
let direction = 'RIGHT';
let gameInterval;

// Función para actualizar el juego
function updateGame() {
    const head = { ...snake[0] }; // Copiar la cabeza de la serpiente
    
    // Determinar la nueva posición de la cabeza según la dirección
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    snake.unshift(head); // Añadir la nueva posición al principio de la serpiente

    // Verificar si la serpiente ha comido la comida
    if (head.x === food.x && head.y === food.y) {
        food = generateFood(); // Generar nueva comida
    } else {
        snake.pop(); // Eliminar el último segmento si no comió
    }

    // Verificar colisiones con las paredes o con el propio cuerpo
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collisionWithBody()) {
        clearInterval(gameInterval); // Detener el juego
        alert('¡Juego terminado! Recarga la página para jugar de nuevo.');
    }

    drawGame(); // Dibujar el juego
}

// Función para dibujar el juego
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar la serpiente
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Dibujar la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Función para generar comida en una posición aleatoria
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

// Verificar si la cabeza colisiona con el cuerpo
function collisionWithBody() {
    const [head, ...body] = snake;
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

// Manejo de las teclas para cambiar la dirección
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Función para iniciar el juego
document.getElementById('startGame').addEventListener('click', () => {
    snake = [{x: 200, y: 200}]; // Reiniciar la serpiente
    direction = 'RIGHT';
    food = generateFood();
    gameInterval = setInterval(updateGame, 150); // Actualizar cada 150 ms
});

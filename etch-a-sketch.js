// Select all elements on the page - canvas, shake button

const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');

const shakebutton = document.querySelector('.shake');

const MOVE_AMOUNT = 50;

// Setup canvas for drawing

// const { width } = canvas;
// const { height } = canvas;

// Destructuring example

const { width, height } = canvas;
console.log(width, height);

// Create random X and Y starting points on canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // Starts the drawing
ctx.lineTo(x, y);
ctx.moveTo(x, y);
ctx.stroke();

// Write a draw function

function draw({ key }) {
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // Move our x and y values based on what the user did
  // x -= MOVE_AMOUNT;
  // y -= MOVE_AMOUNT;
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Write a handler for keys

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({
      key: e.key,
    });
  }
}

// Clear or shake function

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      console.log('test');
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}
// Listen for arrow keys

window.addEventListener('keydown', handleKey);

shakebutton.addEventListener('click', clearCanvas);

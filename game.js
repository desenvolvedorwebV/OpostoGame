const GRID_SIZE = 20;
let currentLevel = 2;
let grid = [];
let player = { x: 0, y: 0 };
let swapRemaining = 0;
let lives = 3;
let coinsCollected = 0;
let totalCoins = 0;
let isFalling = false;
let isDead = false;
let enemyIntervals = [];
let DEBUG_COORDS = false;


let audioCtx;


const levels = [
{
name: "Desafio do Espelho",
swapLimit: 1,
objects: [
/*
//H
{ x: 0, y: 0, type: "brick" }, { x: 0, y: 1, type: "brick" }, { x: 0, y: 2, type: "brick" }, { x: 0, y: 3, type: "brick" }, { x: 0, y: 4, type: "brick" },
{ x: 1, y: 2, type: "brick" },
{ x: 2, y: 0, type: "brick" }, { x: 2, y: 1, type: "brick" }, { x: 2, y: 2, type: "brick" }, { x: 2, y: 3, type: "brick" }, { x: 2, y: 4, type: "brick" },

//E
{ x: 4, y: 0, type: "brick" }, { x: 4, y: 1, type: "brick" }, { x: 4, y: 2, type: "brick" }, { x: 4, y: 3, type: "brick" }, { x: 4, y: 4, type: "brick" },
{ x: 5, y: 0, type: "brick" }, { x: 5, y: 2, type: "brick" }, { x: 5, y: 4, type: "brick" },
{ x: 6, y: 0, type: "brick" }, { x: 6, y: 2, type: "brick" }, { x: 6, y: 4, type: "brick" },

//L
{ x: 9, y: 0, type: "brick" }, { x: 9, y: 1, type: "brick" }, { x: 9, y: 2, type: "brick" }, { x: 9, y: 3, type: "brick" }, { x: 9, y: 4, type: "brick" },
{ x: 10, y: 4, type: "brick" },
{ x: 11, y: 4, type: "brick" },

//L
{ x: 13, y: 0, type: "brick" }, { x: 13, y: 1, type: "brick" }, { x: 13, y: 2, type: "brick" }, { x: 13, y: 3, type: "brick" }, { x: 13, y: 4, type: "brick" },
{ x: 14, y: 4, type: "brick" },
{ x: 15, y: 4, type: "brick" },

//O
{ x: 17, y: 0, type: "brick" }, { x: 17, y: 1, type: "brick" }, { x: 17, y: 2, type: "brick" }, { x: 17, y: 3, type: "brick" }, { x: 17, y: 4, type: "brick" },
{ x: 18, y: 0, type: "brick" }, { x: 18, y: 4, type: "brick" },
{ x: 19, y: 0, type: "brick" }, { x: 19, y: 1, type: "brick" }, { x: 19, y: 2, type: "brick" }, { x: 19, y: 3, type: "brick" }, { x: 19, y: 4, type: "brick" },
*/

{ x: 3, y: 18, type: "player" },
{ x: 18, y: 18, type: "coin" },

{ x: 0, y: 18, type: "brick" },  { x: 0, y: 19, type: "brick" },  
{ x: 1, y: 19, type: "brick" },    
{ x: 2, y: 19, type: "brick" },      
{ x: 3, y: 19, type: "brick" },    
{ x: 4, y: 19, type: "brick" },    
{ x: 5, y: 19, type: "brick" },    
{ x: 6, y: 19, type: "brick" },    
{ x: 7, y: 19, type: "brick" },
{ x: 8, y: 19, type: "brick" },  
{ x: 9, y: 19, type: "brick" },
{ x: 10, y: 19, type: "brick" },
{ x: 11, y: 19, type: "brick" },
{ x: 12, y: 19, type: "brick" },
{ x: 13, y: 19, type: "brick" },
{ x: 14, y: 19, type: "brick" },
{ x: 15, y: 19, type: "brick" },
{ x: 16, y: 19, type: "brick" },
{ x: 17, y: 19, type: "brick" },
{ x: 18, y: 19, type: "brick" },
{ x: 19, y: 19, type: "brick" }, { x: 19, y: 18, type: "brick" }
],
},
{
name: "Desafio do Espelho",
swapLimit: 1,
objects: [
{ x: 3, y: 15, type: "player" },

{ x: 1, y: 18, type: "coin" },
{ x: 16, y: 15, type: "coin" },

{ x: 0, y: 15, type: "brick" },  { x: 0, y: 16, type: "brick" },   { x: 0, y: 17, type: "brick" }, { x: 0, y: 18, type: "brick" }, { x: 0, y: 19, type: "brick" },
{ x: 1, y: 19, type: "brick" },
{ x: 2, y: 16, type: "brick" },  { x: 2, y: 19, type: "brick" },  
{ x: 3, y: 16, type: "brick" },  { x: 3, y: 19, type: "brick" },  
{ x: 4, y: 16, type: "brick" },  { x: 4, y: 19, type: "brick" },  
{ x: 5, y: 16, type: "brick" },  { x: 5, y: 19, type: "brick" },
{ x: 6, y: 16, type: "brick" },  { x: 6, y: 19, type: "brick" },
{ x: 7, y: 16, type: "brick" },  { x: 7, y: 19, type: "brick" },
{ x: 8, y: 16, type: "brick" },  { x: 8, y: 19, type: "brick" },
{ x: 9, y: 16, type: "brick" },  { x: 9, y: 19, type: "brick" },
{ x: 10, y: 16, type: "brick" }, { x: 10, y: 19, type: "brick" },
{ x: 11, y: 16, type: "brick" }, { x: 11, y: 19, type: "brick" },
{ x: 12, y: 16, type: "brick" }, { x: 12, y: 19, type: "brick" },
{ x: 13, y: 16, type: "brick" }, { x: 13, y: 19, type: "brick" },
{ x: 14, y: 16, type: "brick" }, { x: 14, y: 19, type: "brick" },
{ x: 15, y: 16, type: "brick" }, { x: 15, y: 19, type: "brick" },
{ x: 16, y: 16, type: "brick" }, { x: 16, y: 19, type: "brick" },
{ x: 17, y: 16, type: "brick" }, { x: 17, y: 19, type: "brick" },
{ x: 18, y: 16, type: "brick" }, { x: 18, y: 19, type: "brick" },
{ x: 19, y: 15, type: "brick" }, { x: 19, y: 16, type: "brick" }, { x: 19, y: 17, type: "brick" }, { x: 19, y: 18, type: "brick" }, { x: 19, y: 19, type: "brick" },
]
},
{
name: "Desafio do Espelho",
swapLimit: 1,
objects: [
{ x: 3, y: 15, type: "player" },

{ x: 1, y: 18, type: "coin" },
{ x: 19, y: 15, type: "coin" },  { x: 16, y: 18, type: "coin" },

{ x: 0, y: 15, type: "brick" },  { x: 0, y: 16, type: "brick" },   { x: 0, y: 17, type: "brick" }, { x: 0, y: 18, type: "brick" }, { x: 0, y: 19, type: "brick" },
{ x: 1, y: 19, type: "brick" },
{ x: 2, y: 17, type: "brick" },  { x: 2, y: 19, type: "brick" },  
{ x: 3, y: 17, type: "brick" },  { x: 3, y: 19, type: "brick" },  
{ x: 4, y: 17, type: "brick" },  { x: 4, y: 19, type: "brick" },  
{ x: 5, y: 17, type: "brick" },  { x: 5, y: 19, type: "brick" },
{ x: 6, y: 17, type: "brick" },  { x: 6, y: 19, type: "brick" },
{ x: 7, y: 17, type: "brick" },  { x: 7, y: 19, type: "brick" },
{ x: 8, y: 17, type: "brick" },  { x: 8, y: 19, type: "brick" },
{ x: 9, y: 17, type: "brick" },  { x: 9, y: 19, type: "brick" },
{ x: 10, y: 17, type: "brick" }, { x: 10, y: 19, type: "brick" },
{ x: 11, y: 17, type: "brick" }, { x: 11, y: 19, type: "brick" },
{ x: 12, y: 17, type: "brick" }, { x: 12, y: 19, type: "brick" },
{ x: 13, y: 17, type: "brick" }, { x: 13, y: 19, type: "brick" },
{ x: 14, y: 17, type: "brick" }, { x: 14, y: 19, type: "brick" },
{ x: 15, y: 17, type: "brick" }, { x: 15, y: 19, type: "brick" },
{ x: 16, y: 17, type: "brick" }, { x: 16, y: 19, type: "brick" },
{ x: 17, y: 17, type: "brick" }, { x: 17, y: 19, type: "brick" },
{ x: 18, y: 15, type: "ladder" }, { x: 18, y: 16, type: "ladder" }, { x: 18, y: 17, type: "brick" }, { x: 18, y: 19, type: "brick" },
{ x: 19, y: 17, type: "brick" }, { x: 19, y: 16, type: "brick" }, { x: 19, y: 17, type: "brick" }, { x: 19, y: 18, type: "brick" }, { x: 19, y: 19, type: "brick" },
]
},

{
name: "Desafio do Espelho",
swapLimit: 2,
objects: [
{ x: 1, y: 0, type: "player" },

{ x: 1, y: 5, type: "coin" },
{ x: 17, y: 16, type: "coin" },  { x: 16, y: 18, type: "coin" },

{ x: 0, y: 0, type: "brick" },   { x: 0, y: 1, type: "brick" },   { x: 0, y: 2, type: "brick" },   { x: 0, y: 3, type: "brick" }, { x: 0, y: 4, type: "brick" }, { x: 0, y: 5, type: "brick" }, { x: 0, y: 6, type: "brick" },
{ x: 1, y: 1, type: "brick" },   { x: 1, y: 2, type: "brick" },   { x: 1, y: 6, type: "brick" },   { x: 1, y: 7, type: "brick" },
{ x: 2, y: 3, type: "brick" },   { x: 2, y: 4, type: "brick" },   { x: 2, y: 6, type: "brick" },   { x: 2, y: 7, type: "brick" },  
{ x: 3, y: 3, type: "brick" },   { x: 3, y: 4, type: "brick" },   { x: 3, y: 8, type: "brick" },   { x: 3, y: 9, type: "brick" },  
{ x: 4, y: 5, type: "brick" },   { x: 4, y: 6, type: "brick" },   { x: 4, y: 8, type: "brick" },   { x: 4, y: 9, type: "brick" },  
{ x: 5, y: 5, type: "brick" },   { x: 5, y: 6, type: "brick" },   { x: 5, y: 10, type: "brick" },  { x: 5, y: 11, type: "brick" },
{ x: 6, y: 7, type: "brick" },   { x: 6, y: 8, type: "brick" },   { x: 6, y: 10, type: "brick" },  { x: 6, y: 11, type: "brick" },
{ x: 7, y: 7, type: "brick" },   { x: 7, y: 8, type: "brick" },   { x: 7, y: 12, type: "brick" },  { x: 7, y: 13, type: "brick" },
{ x: 8, y: 9, type: "brick" },   { x: 8, y: 10, type: "brick" },  { x: 8, y: 12, type: "brick" },  { x: 8, y: 13, type: "brick" },
{ x: 9, y: 9, type: "brick" },   { x: 9, y: 10, type: "brick" },  { x: 9, y: 14, type: "brick" },  { x: 9, y: 15, type: "brick" },
{ x: 10, y: 11, type: "brick" }, { x: 10, y: 12, type: "brick" }, { x: 10, y: 14, type: "brick" }, { x: 10, y: 15, type: "brick" },
{ x: 11, y: 11, type: "brick" }, { x: 11, y: 16, type: "brick" }, { x: 11, y: 17, type: "brick" },
{ x: 12, y: 13, type: "brick" }, { x: 12, y: 14, type: "brick" }, { x: 12, y: 16, type: "brick" }, { x: 12, y: 17, type: "brick" }, { x: 11, y: 12, type: "brick" },
{ x: 13, y: 13, type: "brick" }, { x: 13, y: 14, type: "brick" }, { x: 13, y: 18, type: "brick" }, { x: 13, y: 19, type: "brick" },
{ x: 14, y: 15, type: "brick" }, { x: 14, y: 16, type: "brick" }, { x: 14, y: 18, type: "brick" }, { x: 14, y: 19, type: "brick" },
{ x: 15, y: 15, type: "brick" }, { x: 15, y: 16, type: "brick" }, { x: 15, y: 19, type: "brick" },
{ x: 16, y: 17, type: "brick" }, { x: 16, y: 19, type: "brick" },
{ x: 17, y: 17, type: "brick" }, { x: 17, y: 18, type: "brick" }, { x: 17, y: 19, type: "brick" },
{ x: 18, y: 17, type: "brick" }, { x: 18, y: 18, type: "brick" }, { x: 18, y: 19, type: "brick" },
{ x: 19, y: 17, type: "brick" }, { x: 19, y: 16, type: "brick" }, { x: 19, y: 17, type: "brick" }, { x: 19, y: 18, type: "brick" }, { x: 19, y: 19, type: "brick" },
]
},

{
name: "Desafio do Espelho",
swapLimit: 2,
objects: [
{ x: 3, y: 18,  type: "player" },
{ x: 2, y: 17,  type: "coin" },   { x: 4, y: 16, type: "coin" },   { x: 13, y: 5, type: "coin" },   { x: 16, y: 3, type: "coin" },  { x: 18, y: 18, type: "coin" },
{ x: 10, y: 18, type: "enemy", patrolToX: 17, patrolToY: 18, speed: 800 },

{ x: 0, y: 16, type: "brick" },  { x: 0, y: 17, type: "brick" },  { x: 0, y: 18, type: "brick" },  { x: 0, y: 19, type: "brick" },  
{ x: 1, y: 18, type: "brick" },  { x: 1, y: 19, type: "brick" },    
{ x: 2, y: 18, type: "brick" },  { x: 2, y: 19, type: "brick" },      
{ x: 3, y: 17, type: "brick" },  { x: 3, y: 19, type: "brick" },    
{ x: 4, y: 17, type: "brick" },  { x: 4, y: 19, type: "brick" },    
{ x: 5, y: 16, type: "brick" },  { x: 5, y: 17, type: "brick" }, { x: 5, y: 19, type: "brick" },    
{ x: 6, y: 15, type: "brick" },  { x: 6, y: 19, type: "brick" },    
{ x: 7, y: 15, type: "brick" },  { x: 7, y: 19, type: "brick" },
{ x: 8, y: 14, type: "brick" },  { x: 8, y: 15, type: "brick" },  { x: 8, y: 19, type: "brick" },  
{ x: 9, y: 19, type: "brick" },
{ x: 10, y: 19, type: "brick" },
{ x: 11, y: 19, type: "brick" },
{ x: 12, y: 19, type: "brick" },
{ x: 13, y: 6, type: "brick" },  { x: 13, y: 19, type: "brick" },
{ x: 14, y: 6, type: "brick" },  { x: 14, y: 19, type: "brick" },
{ x: 15, y: 6, type: "brick" },  { x: 15, y: 19, type: "brick" },
{ x: 16, y: 2, type: "brick" },  { x: 16, y: 4, type: "brick" },  { x: 16, y: 19, type: "brick" },
{ x: 17, y: 4, type: "brick" },  { x: 17, y: 19, type: "brick" },
{ x: 18, y: 4, type: "brick" },  { x: 18, y: 19, type: "brick" },
{ x: 19, y: 19, type: "brick" }, { x: 19, y: 18, type: "brick" }
]
}
];


function playCoin()
{

if (!audioCtx)
{
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

const now = audioCtx.currentTime;

function playNote(freq, startTime, duration)
{
const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();

osc.type = "square";
osc.frequency.setValueAtTime(freq, startTime);

gain.gain.setValueAtTime(0.001, startTime);
gain.gain.exponentialRampToValueAtTime(0.4, startTime + 0.01);
gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

osc.connect(gain);
gain.connect(audioCtx.destination);

osc.start(startTime);
osc.stop(startTime + duration);
}
playNote(1000, now, 0.08);
playNote(1500, now + 0.08, 0.1);
}

function playFallTick()
{
   if (!audioCtx)
       audioCtx = new (window.AudioContext || window.webkitAudioContext)();

   const now = audioCtx.currentTime;

   const osc = audioCtx.createOscillator();
   const gain = audioCtx.createGain();

   osc.type = "square";          // combina com seu estilo retrô
   osc.frequency.setValueAtTime(1800, now);
   osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

   gain.gain.setValueAtTime(0.001, now);
   gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
   gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

   osc.connect(gain);
   gain.connect(audioCtx.destination);

   osc.start(now);
   osc.stop(now + 0.08);
}

function loadLevel(index)
{
grid = Array.from({ length: GRID_SIZE }, () =>
Array.from({ length: GRID_SIZE }, () => ({ type: "empty" }))
);

const level = levels[index];
enemyIntervals.forEach(i => clearInterval(i));
enemyIntervals = [];
swapRemaining = level.swapLimit;
coinsCollected = 0;
totalCoins = 0;

level.objects.forEach(obj => {
if (obj.type === "player")
{
player.x = obj.x;
player.y = obj.y;
}
else if (obj.type === "enemy")
{
   const enemy = {
       type: "enemy",
       x: obj.x,
       y: obj.y,
       startX: obj.x,
       startY: obj.y,
       targetX: obj.patrolToX,
       targetY: obj.patrolToY,
       dir: 1,
       speed: obj.speed || 400
   };

   grid[enemy.y][enemy.x] = enemy;
   startEnemy(enemy);
}
else
{
   grid[obj.y][obj.x] = obj;

   if (obj.type === "coin")
       totalCoins++;
}
});

applyGravity();
render();
}

function playDeathSound() {
   const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   const oscillator = audioCtx.createOscillator();
   const gainNode = audioCtx.createGain();

   oscillator.type = "square";
   oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
   oscillator.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.4);

   gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
   gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

   oscillator.connect(gainNode);
   gainNode.connect(audioCtx.destination);

   oscillator.start();
   oscillator.stop(audioCtx.currentTime + 0.4);
}

function breakFragile(x, y)
{
const tileIndex = y * GRID_SIZE + x;
const game = document.getElementById("game");
const tileDiv = game.children[tileIndex];

if (!tileDiv || tileDiv.classList.contains("broken")) return;

tileDiv.classList.add("shaking");

setTimeout(() =>
{
tileDiv.classList.add("broken");

setTimeout(() =>
{
grid[y][x] = { type: "empty" };
render();
applyGravity();
}, 200);

}, 100);
}

function isSolid(x, y)
{
if (y < 0 || y >= GRID_SIZE || x < 0 || x >= GRID_SIZE)
return true;

const type = grid[y][x].type;

// Bloco frágil é sólido apenas para o PLAYER
if (type === "fragile") return true;

return type === "brick" || type === "wall" || type === "ladder";
}

function applyGravity()
{
if (isFalling || grid[player.y][player.x].type === "ladder")
return;

const fallStep = () =>
{
if (player.y < GRID_SIZE - 1 && !isSolid(player.x, player.y + 1))
{
if (!isFalling)
playFallTick();

isFalling = true;
player.y++;
checkTile();
render();
setTimeout(fallStep, 50);
}
else
{
isFalling = false;
}
checkEnemyCollision();
};
fallStep();
}

function checkEnemyCollision() {

   if (isDead) return; // 👈 impede morte dupla

   const tile = grid[player.y][player.x];

   if (tile.type === "enemy") {

       isDead = true; // 👈 trava aqui

       const game = document.getElementById("game");
       const tiles = game.children;
       const index = player.y * GRID_SIZE + player.x;
       const playerTile = tiles[index];

       if (playerTile)
           playerTile.classList.add("dead");

       playDeathSound();

       setTimeout(() => {

           lives--;

           if (lives <= 0) {
               alert("Game Over!");
               lives = 3;
               currentLevel = 0;
           }

           isDead = false; // 👈 libera novamente
           loadLevel(currentLevel);

       }, 400);
   }
}

function render()
{
const game = document.getElementById("game");
game.innerHTML = "";

for (let y = 0; y < GRID_SIZE; y++)
{
for (let x = 0; x < GRID_SIZE; x++)
{
const div = document.createElement("div");
div.classList.add("tile");
if (grid[y][x].type !== "empty")
div.classList.add(grid[y][x].type);

if (grid[y][x].type === "enemy") {
   const teeth = document.createElement("div");
   teeth.className = "teeth";
   div.appendChild(teeth);

   const shadow = document.createElement("div");
   shadow.className = "shadow";
   div.appendChild(shadow);
}

if (x === player.x && y === player.y)
div.classList.add("player");

// Renderiza a sombra do Alter Ego
//let alterX = GRID_SIZE - 1 - player.x; //TOTALMENTE INVERTIDOS (INCLUSIVE CIMA/BAIXO)
//let alterY = GRID_SIZE - 1 - player.y; //TOTALMENTE INVERTIDOS (INCLUSIVE CIMA/BAIXO)
let alterX = GRID_SIZE - 1 - player.x;
let alterY = player.y;

if (x === alterX && y === alterY)
div.classList.add("alter");

game.appendChild(div);

// 🔎 DEBUG COORDENADAS
if (DEBUG_COORDS)
{
if (grid[y][x].type !== 'coin')
{
div.innerHTML = `<small>${x},${y}</small>`;
}
}
}
}
document.getElementById("lives").innerText = lives;
document.getElementById("swaps").innerText = swapRemaining;
document.getElementById("coins").innerText = `${coinsCollected}/${totalCoins}`;
}

function swap()
{
   if (swapRemaining <= 0)
       return;

   let newX = GRID_SIZE - 1 - player.x;
   let newY = player.y; // NÃO inverter Y

   if (grid[newY][newX].type !== "wall" && grid[newY][newX].type !== "brick")
   {
       player.x = newX;
       player.y = newY;

       swapRemaining--;

checkTile();
checkEnemyCollision();

       render();
       setTimeout(applyGravity, 100);
   }
}

//TOTALMENTE INVERTIDOS (INCLUSIVE CIMA/BAIXO)
/*function swap()
{
if (swapRemaining <= 0) //|| isFalling pra impedir de trocar no alto
return;

let newX = GRID_SIZE - 1 - player.x;
let newY = GRID_SIZE - 1 - player.y;

if (grid[newY][newX].type !== "wall" && grid[newY][newX].type !== "brick")
{
player.x = newX;
player.y = newY;
swapRemaining--;

render(); // Primeiro mostra onde ele apareceu
setTimeout(applyGravity, 100); // Pequena pausa antes de começar a cair
}
}*/

function moveVertical(dy)
{
if (grid[player.y][player.x].type === "ladder" ||
(dy > 0 && grid[player.y + dy]?.[player.x]?.type === "ladder"))
{
let ny = player.y + dy;
if (ny >= 0 && ny < GRID_SIZE)
{
player.y = ny;
checkTile();
render();
}
}
}

function move(dx)
{
if (isFalling) return; // Impede mover enquanto cai

let nx = player.x + dx;
if (nx >= 0 && nx < GRID_SIZE && grid[player.y][nx].type !== "wall" && grid[player.y][nx].type !== "brick")
{
player.x = nx;
checkTile();
applyGravity(); // Verifica se o novo passo levou ao vazio
render();
checkEnemyCollision();
}
}

function checkTile()
{
if (grid[player.y][player.x].type === "coin")
{
playCoin();
grid[player.y][player.x] = { type: "empty" };
coinsCollected++;
if (coinsCollected === totalCoins)
{
nextLevel = currentLevel + 1;
if (levels[nextLevel] !== undefined)
{
alert("Nível Concluído!");
currentLevel = nextLevel;
loadLevel(currentLevel);
}
else
{
alert("Parabéns, você concluiu o jogo!");
}
}
}
if (player.y < GRID_SIZE - 1)
{
   const below = grid[player.y + 1][player.x];

   if (below.type === "fragile")
   {
       breakFragile(player.x, player.y + 1);
   }
}
}

function restart()
{
loadLevel(currentLevel);
}

// Mapping controls
document.addEventListener("keydown", e => {
if (e.key === "ArrowUp") moveVertical(-1);
if (e.key === "ArrowDown") moveVertical(1);
if (e.key === "ArrowLeft") move(-1);
if (e.key === "ArrowRight") move(1);
if (e.key === " ") swap();
});

loadLevel(currentLevel);

function startEnemy(enemy)
{
const interval = setInterval(() =>
{
moveEnemy(enemy);
}, enemy.speed);
enemyIntervals.push(interval);
}

function moveEnemy(enemy)
{
// Limpa posição atual
grid[enemy.y][enemy.x] = { type: "empty" };

   let targetX = enemy.dir === 1 ? enemy.targetX : enemy.startX;
   let targetY = enemy.dir === 1 ? enemy.targetY : enemy.startY;

   if (enemy.x < targetX) enemy.x++;
   else if (enemy.x > targetX) enemy.x--;
   else if (enemy.y < targetY) enemy.y++;
   else if (enemy.y > targetY) enemy.y--;
   else enemy.dir *= -1;


   grid[enemy.y][enemy.x] = enemy;
   // Se bater no player
   checkEnemyCollision();

   render();
}

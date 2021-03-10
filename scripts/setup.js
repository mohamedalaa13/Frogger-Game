//will contain paricle effects 
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = 600;
canvas1.height = 600;

//logs and turtles
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 600;
canvas2.height = 600;

//frog 
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.width = 600;
canvas3.height = 600;

//cars, grass and tree in the top right corner
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = 600;
canvas5.height = 600;

//grid is 80*80 px represent the game size 
//as our game is grid based 
const grid = 80; 
let keys = [];
let score = 0;
let collisonsCount = 0;
let frame = 0;
let gameSpeed = 1;
let safe = false;

const particalesArr = []; //includes all paricales obj for dust effect
const maxParicales = 300;   //will limit how many particales to prevent performance issues
const ripplesArr = [];
const carsArr = []; 
const logArr = [];

const frog = new Image();
//frog.src = 'images/frog_.png';
frog.src = 'images/nurse.png';

const backGroundImg = new Image();
backGroundImg.src = 'images/background_lvl2.png';

const grass = new Image();
grass.src = 'images/grass.png';

const collisions = new Image();
collisions.src = 'images/collisions.png';


const upper = new Image();
upper.src = 'images/1.jpg';

const turtle = new Image();
turtle.src = 'images/turtles.png';

const cars = new Image();
cars.src = 'images/cars.png';
let numOfCars = 3;

const logs = new Image();
// logs.src = 'images/log.png';
logs.src = 'images/boat.png';
const wrapper = document.querySelector('.wrapper')
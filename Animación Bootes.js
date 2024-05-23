const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvas.id = 'myCanvas';

// Set the width and height of the canvas
canvas.width = 1200;
canvas.height = 800;

canvasContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Parámetros
const intervaloBootes = 4000;
const zdiff = 30000;
const normRad = 75;
const bootesTranspStart = 5000;
const logoBuffer = 400;
const factorAjusteEstrellas = 6;
const threshold = 0.2;
const camDist = 200;
const maxSpeed = 100;
const minSpeed = 0.5;
const speedReductStart = 10000;
const speedReductEnd = camDist;
const bootesStop = 1000;
const randSpread = 100;
const hwratio = 2/3;
const factorWeight = 4;
const bootes = [[-1656.6, -300.6, 30468, 111.33], [-1907.3, -145.5, 30566, 153.2], [-1830.3, -402, 30858, 176.33], [-703, 28.9, 30763, 256.8], [-1101.3, 810.4, 30839, 207.8], [-114.1, 832, 30471, 134.2], [288, 65, 30729, 154.83], [1623.4, -355.7, 30712, 668.82], [2000.9, -1123.5, 30870, 321], [1415.7, -922.4, 30515, 95.33], [2300.6, -1280.4, 30841, 208.2], [2689.8, 500.9, 30889, 254.1]];
const bootesInit = 30889;
const lineas = [[0, 1, 1], [0, 2, 1], [1, 2, 1], [2, 3, 1], [3, 4, 2], [4, 5, 2], [3, 6, 2], [6, 7, 2], [5, 7, 2], [7, 8, 1], [8, 9, 1], [9, 10, 1], [7, 11, 1]];
const imageSpawn = [-3267.0, -2178.0, 12889, 47593.87];
const imagePos = [];

// Inicializaciones
var bootesPos = bootesInit;
var pos = 0;
var z = 0;
var puntos = [];
var puntosBootes = [];
var proyeccionBootes = [];
var tintLevel = 0;
var speed = maxSpeed;
var images = false;
var imagesx = 0;
var imagesy = 0;
var imagesw = 0;
var imagesh = 0;
var toDelete;
var imagesz = zdiff;
function deepCopy(originalArray) {
    return originalArray.map(item => Array.isArray(item) ? deepCopy(item) : item);
}

// Constantes calculadas
const width = canvas.width;
const height = canvas.height;
const xspread = width * (camDist + zdiff) / (2 * camDist);
const yspread = height * (camDist + zdiff) / (2 * camDist);
const weightAdjust = factorWeight / (2 * Math.atan(1 / (camDist + bootesStop)));
const colorAdjust = 400 / (2 * Math.atan(1 / (camDist + bootesStop)));

function setup() {
    createCanvas(1200, 800);

    // Draw
    noStroke();
}

function preload() {
    //img = loadImage('El bueno.png');
}

// Funciones
function activateBootes() {
    bootesPos = bootesInit;
    puntosBootes = [];
    //for (var i = 0; i < bootes.length; i++) {
    //    puntosBootes.push(bootes[i]);
    //}

    puntosBootes = deepCopy(bootes);
    console.log(puntosBootes[0]);
    console.log(bootes[0])
}

function coordenadasBootes() {
    for (var i = 0; i < puntosBootes.length; i++) {
        var xpart = puntosBootes[i][0] * camDist / (camDist + puntosBootes[i][2]) + width / 2;
        var ypart = puntosBootes[i][1] * camDist / (camDist + puntosBootes[i][2]) + height / 2;
        var rad = 2 * normRad * atan(puntosBootes[i][3] / (2 * (puntosBootes[i][2] + camDist)));
        
        proyeccionBootes[i] = [xpart, ypart, rad];
    }
}

function estrellasBootes() {
    for (var i = 0; i < proyeccionBootes.length; i++) {
        noStroke();
        fill(255, 255, 255);
        if (puntosBootes[i][2] >= 0) {
            ellipse(proyeccionBootes[i][0], proyeccionBootes[i][1], proyeccionBootes[i][2], proyeccionBootes[i][2]);
        }

        puntosBootes[i][2] -= speed;
    }
}

function lineasBootes() {
    for (var i = 0; i < lineas.length; i++) {
        var linePos = min(puntosBootes[lineas[i][0]][2], puntosBootes[lineas[i][1]][2]);
        var weight = min(weightAdjust * 2 * atan(lineas[i][2] / (2 * (puntosBootes[lineas[i][0]][2] + camDist))), (linePos + camDist) * 4 / ((bootesStop + camDist)));
        var color = min(colorAdjust * 2 * atan(lineas[i][2] / (2 * (puntosBootes[lineas[i][0]][2] + camDist))), (5 / 4) * (linePos + camDist) * 255 / ((bootesStop + camDist)));
            
        stroke(color, color, color);
        strokeWeight(weight);
        if (linePos > 0) {
            line(proyeccionBootes[lineas[i][0]][0], proyeccionBootes[lineas[i][0]][1],proyeccionBootes[lineas[i][1]][0], proyeccionBootes[lineas[i][1]][1]);
        } 
    }
}

function determineSpeed() {
    if( (bootesPos < camDist + speedReductStart) && (bootesPos > camDist + speedReductEnd)) {
        if (bootesPos > bootesStop) {
            speed = (maxSpeed - minSpeed) * (bootesPos - bootesStop) / (speedReductStart - bootesStop) + minSpeed;
            tintLevel = max(0, 255 - 255 * (bootesPos - bootesStop) / ((bootesTranspStart - logoBuffer) - bootesStop));
        } else {
            speed = (maxSpeed - minSpeed) * (- bootesPos + bootesStop) / (bootesStop - speedReductEnd) + minSpeed;
            tintLevel = max(0, 255- 255 * (- bootesPos + bootesStop) / (bootesStop - (speedReductEnd  + logoBuffer)));
        }
    } else {
            speed = maxSpeed;
            tintLevel = 0;
    }
}

function randomStar() {
    var xtemp = random(-xspread, xspread) + width / 2;
    var ytemp = random(-yspread, yspread) + height / 2;
    var rad = randSpread * random(0, 1) ^ 4;
        
    if((!(((xtemp > - rad)&&(xtemp < width + rad))&&((ytemp > - rad)&&(ytemp < height + rad))))&&(rad>1)) {
        puntos.push([xtemp, ytemp, zdiff, rad]);
    }
}

function drawRandomStars() {
    for (var i = 0; i < puntos.length; i++) {
        var xpart = puntos[i][0] * camDist / (camDist + puntos[i][2]) + width / 2;
        var ypart = puntos[i][1] * camDist / (camDist + puntos[i][2]) + height / 2;
        var rad = 2 * normRad * factorAjusteEstrellas * atan(puntos[i][3] / (2 * (puntos[i][2] + camDist)));
        
        noStroke();
        fill(255, 255, 255);
        if (puntos[i][2] >= 0) {
            ellipse(xpart, ypart, rad, rad);
        } else {
            toDelete.push(i);
        }
        puntos[i][2] -= speed;
        
        //if ((xpart + rad < 0)||(xpart - rad > width)||(ypart + rad < 0)||(ypart - rad > height)) {
            //toDelete.push(i);
        //}
    }
}

function drawImage() {

    var x = imageSpawn[0] * camDist / (camDist + bootesPos) + width / 2;
    var y = imageSpawn[1] * camDist / (camDist + bootesPos) + height / 2;
    var w = 2 * (width / 2 - x);

    tint(255, tintLevel); 
    image(img, x, y, w, w * hwratio);
    noTint();
}


draw = function() {

    //if (frameCount === 1) {
    //    capturer.start();
    //}
    
    fill(0, 0, 0);
    rect(0, 0, width, height);

    determineSpeed();

    // Crea estrellas aleatorias
    for (var i = 0; i < max(1, threshold * speed); i++) {
        if (random(0, 1) < threshold * speed) {
            randomStar();
        }
    }
    
    toDelete = [];

    // Extrae coordenadas de estrellas Bootes
    if (puntosBootes.length > 0) {
        coordenadasBootes();
                
        if (bootesPos > 0) {
            lineasBootes();
        }
                
        estrellasBootes();
        bootesPos -= speed;
    }
    
    // Dibuja estrellas aleatorias
    drawRandomStars();

    for (var i = toDelete.length - 1; i >= 0; i--) {
        puntos.splice(toDelete[i], 1);
    }
    
    //drawImage();
    
    //if (z % intervaloBootes === Math.floor(intervaloBootes / 3)){
    if (z % intervaloBootes === Math.floor(intervaloBootes / 5)){
        activateBootes();
    }
    
    //console.log(z);
    //println(puntosBootes[0][2]);
    //println(bootesPos);
    z += 1;
    pos += speed;

    //if (z % 100 === 0){
        //console.log(puntos.length);
    //}

    //if (frameCount < 600) {
    //    capturer.capture(canvas);
    //} else if (frameCount === 600) {
    //    capturer.save();
    //    capturer.stop();
    //}

};

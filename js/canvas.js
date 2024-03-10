'use strict'

let dibujoCanvas = document.querySelector('#dibujo-canvas');
dibujoCanvas.width = dibujoCanvas.offsetWidth;
dibujoCanvas.height = dibujoCanvas.offsetHeight;
let myCtx = dibujoCanvas.getContext('2d');

let currentImgIndex = 0;
let imgSources = [
  '/assets/media/image/1.png',
  '/assets/media/image/2.png',
  '/assets/media/image/3.png',
  '/assets/media/image/4.png',
  '/assets/media/image/5.png',
  '/assets/media/image/6.png',
  '/assets/media/image/7.png',
  '/assets/media/image/8.png',
  '/assets/media/image/9.png',
  '/assets/media/image/10.png',
];

function renderImage() {
  let img = new Image();
  img.src = imgSources[currentImgIndex];

  img.onerror = function() {
    console.error(`Error loading image: ${img.src}`);
  };

  img.onload = function() {
    let aspectRatio = img.width / img.height;
    let newImgWidth, newImgHeight;
    let scaleRatio = 0.4; // Cambia este valor para ajustar el tamaño de la imagen

    //Aumentar width
    if(dibujoCanvas.width > 500){
      scaleRatio = 0.6;
    }

    if (dibujoCanvas.width / dibujoCanvas.height > aspectRatio) {
      newImgHeight = (dibujoCanvas.height) * scaleRatio;
      newImgWidth = (newImgHeight * aspectRatio) * scaleRatio;
    } else {
      newImgWidth = (dibujoCanvas.width) * scaleRatio;
      newImgHeight = (newImgWidth / aspectRatio) * scaleRatio;
    }

    let xPos = (dibujoCanvas.width - newImgWidth) / 2;
    let yPos = (dibujoCanvas.height - newImgHeight) / 2;

    myCtx.clearRect(0, 0, dibujoCanvas.width, dibujoCanvas.height);

    myCtx.globalAlpha = 0; // Inicia la transparencia en 0 para la animación
    let alphaStep = 0.01; // Define el paso de la transparencia para la animación

    // Función para animar la transparencia de la imagen
    function animateImage() {
      if (myCtx.globalAlpha < 1) {
        myCtx.globalAlpha += alphaStep;
        myCtx.clearRect(0, 0, dibujoCanvas.width, dibujoCanvas.height);
        myCtx.beginPath();
        drawRoundedRect(myCtx, xPos, yPos, newImgWidth, newImgHeight, 30);
        myCtx.clip();
        myCtx.drawImage(img, xPos, yPos, newImgWidth, newImgHeight);
        requestAnimationFrame(animateImage);
      } else {
        myCtx.globalAlpha = 1; // Asegura que la transparencia se restablezca a 1 después de la animación
      }
    }

    animateImage();
  };
}

function drawRoundedRect(myCtx, xPos, yPos, width, height, radius) {
  myCtx.beginPath();
  myCtx.moveTo(xPos + radius, yPos);
  myCtx.arcTo(xPos + width, yPos, xPos + width, yPos + height, radius);
  myCtx.arcTo(xPos + width, yPos + height, xPos, yPos + height, radius);
  myCtx.arcTo(xPos, yPos + height, xPos, yPos, radius);
  myCtx.arcTo(xPos, yPos, xPos + width, yPos, radius);
  myCtx.closePath();
  refreshIndicators();
}

function refreshIndicators() {
  let indicators = document.getElementById('image-indicators');
  indicators.innerHTML = '';
  for (let i = 0; i < imgSources.length; i++) {
    let indicator = document.createElement('span');
    indicator.classList.add('indicator');
    if (i === currentImgIndex) {
      indicator.classList.add('active');
    }
    indicators.appendChild(indicator);
  }
}

function switchToNextImage() {
  currentImgIndex = (currentImgIndex + 1) % imgSources.length;
  refreshIndicators();
  renderImage();
}

renderImage();
setInterval(switchToNextImage, 3000);

window.onresize = function () {
  let dibujoCanvas = document.querySelector('#dibujo-canvas');
  dibujoCanvas.width = dibujoCanvas.offsetWidth;
  dibujoCanvas.height = dibujoCanvas.offsetHeight;
};
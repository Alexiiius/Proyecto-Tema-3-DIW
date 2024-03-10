'use strict'

let playBtn = document.getElementById('play');
let pauseBtn = document.getElementById('pause');
let stopBtn = document.getElementById('stop');
let rewindBtn = document.getElementById('rewind');
let forwardBtn = document.getElementById('forward');
let muteBtn = document.getElementById('mute');
let unmuteBtn = document.getElementById('unmute');

let songTitle = document.getElementById('song-title');
let songAuthor = document.getElementById('song-author');

let progressBar = document.getElementById('progress-bar');

let songCover = document.getElementById('song-cover');
let bucle = null;

function init() {


  // Cargar archivo y mostrar información
  // Se esta cargando por default el archivo "song.mp3" del directorio "music" 
  // pero se puede subir al input otor archivo mp3 y se mostrara la información del mismo y se podra reproducir
  document.getElementById('input-file').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var url = URL.createObjectURL(file);
    document.getElementById('song').src = url;

    pauseSong();
    song.currentTime = 0;
    playSong();
    
  });


  playBtn.addEventListener('click', function () {
    playSong();
  });

  stopBtn.addEventListener('click', function () {
    pauseSong();
    song.currentTime = 0;
    playBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
  });

  pauseBtn.addEventListener('click', function () {
    pauseSong();
  });

  rewindBtn.addEventListener('click', function () {
    song.currentTime -= 10;
  });

  forwardBtn.addEventListener('click', function () {
    song.currentTime += 10;
  });

  // Boton de mute
  muteBtn.addEventListener('click', function () {
    song.muted = false;
    muteBtn.style.display = 'none';
    unmuteBtn.style.display = 'inline';
  });

  // Boton de unmute
  unmuteBtn.addEventListener('click', function () {
    song.muted = true;
    muteBtn.style.display = 'inline';
    unmuteBtn.style.display = 'none';
  });

}

function pauseSong() {
  song.pause();
  clearInterval(bucle);
  playBtn.style.display = 'inline';
  pauseBtn.style.display = 'none';
}

function playSong() {
  song.play();
  bucle = setInterval(barState, 1000);
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline';
  songCover.classList.add('animate'); // Add the animate class

  function barState() {
    if (!song.ended) {
      let total = parseInt(song.currentTime * 100 / song.duration);
      progressBar.style.width = `${total}%`;
    }
  }
}

function pauseSong() {
  song.pause();
  clearInterval(bucle);
  playBtn.style.display = 'inline';
  pauseBtn.style.display = 'none';
  songCover.classList.remove('animate'); // Remove the animate class
}

stopBtn.addEventListener('click', function () {
  pauseSong();
  song.currentTime = 0;
  playBtn.style.display = 'inline';
  pauseBtn.style.display = 'none';
  songCover.classList.remove('animate'); // Remove the animate class
});

window.addEventListener('load', init, false);

'use strict'
const btnStart = document.querySelector('.start');
const container = document.querySelector('.container');
const bombIcon = '<i class="fas fa-bomb"></i>';
const bombsArray = [];
//const randomNumer = [];
const amountOfBombs = 10;

function createGameboard(){
  
  for(let i = 0; i < 100; i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    container.appendChild(cell);
    }
}

createGameboard();


function setBombs(){
  const cells = document.querySelectorAll('.cell');

  while(bombsArray.length < amountOfBombs){
    const r = Math.floor(Math.random() * cells.length);
    if(!bombsArray.includes(cells[r])){
      bombsArray.push(cells[r]);
    }
  }

  bombsArray.forEach(bomb => bomb.innerHTML = bombIcon);
}



btnStart.addEventListener('click', setBombs);

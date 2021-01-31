'use strict'
const btnStart = document.querySelector('.start');
const container = document.querySelector('.container');

function createGameboard(){
  
  for(let i = 0; i < 100; i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    container.appendChild(cell);
    }
}

createGameboard();
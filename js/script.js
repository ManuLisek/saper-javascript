'use strict'
const btnStart = document.querySelector('.start');
const container = document.querySelector('.container');
const bombIcon = '<i class="fas fa-bomb"></i>';
const bombsArray = [];
const amountOfBombs = 10;
const cellsInRow = 10;

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
  const indexesOfBombs = [...cells].map((e, i) => e.innerHTML !== '' ? i : '').filter(Number.isFinite);
  indexesOfBombs.map(indexOfBomb => {
    
    //right
    if((indexOfBomb + 1)%10 !== 0 && cells[indexOfBomb + 1].innerHTML !== bombIcon){
      cells[indexOfBomb + 1].textContent = '1';
    }
    //left
    if(indexOfBomb % 10 !== 0 && cells[indexOfBomb - 1].innerHTML !== bombIcon){
      cells[indexOfBomb - 1].textContent = '1';
    }
    //up
    if(indexOfBomb - cellsInRow >= 0 && cells[indexOfBomb - cellsInRow].innerHTML !== bombIcon){
      cells[indexOfBomb - cellsInRow].textContent = '1';
    }
    //down*
    if(indexOfBomb + cellsInRow < cells.length  && cells[indexOfBomb + cellsInRow].innerHTML !== bombIcon){
      cells[indexOfBomb + cellsInRow].textContent = '1';
    }
    //up left
    if(indexOfBomb % 10 !== 0 && indexOfBomb - cellsInRow >= 0 && cells[indexOfBomb - cellsInRow - 1].innerHTML !== bombIcon){
      cells[indexOfBomb - cellsInRow - 1].textContent = '1';
    }
    //up right
    if((indexOfBomb + 1)%10 !== 0 && indexOfBomb - cellsInRow >= 0 && cells[indexOfBomb - cellsInRow + 1].innerHTML !== bombIcon){
      cells[indexOfBomb - cellsInRow + 1].textContent = '1';
    }
    //down left*
    if(indexOfBomb % 10 !== 0 && indexOfBomb + cellsInRow -1 < cells.length && cells[indexOfBomb + cellsInRow - 1].innerHTML !== bombIcon){
      cells[indexOfBomb + cellsInRow - 1].textContent = '1';
    }
    //down right
    if((indexOfBomb + 1)%10 !== 0 && indexOfBomb + cellsInRow + 1 < cells.length && cells[indexOfBomb + cellsInRow + 1].innerHTML !== bombIcon){
      cells[indexOfBomb + cellsInRow + 1].textContent = '1';
    }
  })
}



btnStart.addEventListener('click', setBombs);

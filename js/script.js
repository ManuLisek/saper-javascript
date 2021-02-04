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

    const right = cells[indexOfBomb + 1];
    const left = cells[indexOfBomb - 1];
    const up = cells[indexOfBomb - cellsInRow];
    const down = cells[indexOfBomb + cellsInRow];
    const upLeft = cells[indexOfBomb - cellsInRow - 1];
    const upRight = cells[indexOfBomb - cellsInRow + 1];
    const downLeft = cells[indexOfBomb + cellsInRow - 1];
    const downRight = cells[indexOfBomb + cellsInRow + 1];
    const rightCondition = (indexOfBomb + 1) % cellsInRow !== 0;
    const leftCondition = indexOfBomb % cellsInRow !== 0;
    const upCondition = indexOfBomb - cellsInRow >= 0;
    const downCondition = indexOfBomb + cellsInRow < cells.length;
    
    //right
    if(rightCondition && right.innerHTML !== bombIcon){
      right.textContent = '1';
    }
    //left
    if(leftCondition && left.innerHTML !== bombIcon){
      left.textContent = '1';
    }
    //up
    if(upCondition && up.innerHTML !== bombIcon){
      up.textContent = '1';
    }
    //down*
    if(downCondition  && down.innerHTML !== bombIcon){
      down.textContent = '1';
    }
    //up left
    if(leftCondition && upCondition && upLeft.innerHTML !== bombIcon){
      upLeft.textContent = '1';
    }
    //up right
    if(rightCondition && upCondition && upRight.innerHTML !== bombIcon){
      upRight.textContent = '1';
    }
    //down left*
    if(leftCondition && downCondition && downLeft.innerHTML !== bombIcon){
      cells[indexOfBomb + cellsInRow - 1].textContent = '1';
    }
    //down right
    if(rightCondition && downCondition && downRight.innerHTML !== bombIcon){
      downRight.textContent = '1';
    }
  })
}



btnStart.addEventListener('click', setBombs);

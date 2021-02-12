'use strict'
const btnStart = document.querySelector('.start');
const btnEasy = document.querySelector('.easy');
const btnDifficult = document.querySelector('.difficult');
const container = document.querySelector('.container');
const bombIcon = '<i class="fas fa-bomb"></i>';
const bombsArray = [];
const amountOfBombs = 10;
const cellsInRow = 10;

function createGameboard(){
  
  for(let i = 0; i < 100; i++){
    const cell = document.createElement('div');
    cell.className = 'cell hidden';
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
      let sum = Number(right.textContent);
      sum += 1;
      right.textContent = sum;
    }
    //left
    if(leftCondition && left.innerHTML !== bombIcon){
      let sum = Number(left.textContent);
      sum += 1;
      left.textContent = sum;
    }
    //up
    if(upCondition && up.innerHTML !== bombIcon){
      let sum = Number(up.textContent);
      sum += 1;
      up.textContent = sum;
    }
    //down*
    if(downCondition && down.innerHTML !== bombIcon){
      let sum = Number(down.textContent);
      sum += 1;
      down.textContent = sum;
    }
    //up left
    if(leftCondition && upCondition && upLeft.innerHTML !== bombIcon){
      let sum = Number(upLeft.textContent);
      sum += 1;
      upLeft.textContent = sum;
    }
    //up right
    if(rightCondition && upCondition && upRight.innerHTML !== bombIcon){
      let sum = Number(upRight.textContent);
      sum += 1;
      upRight.textContent = sum;
    }
    //down left*
    if(leftCondition && downCondition && downLeft.innerHTML !== bombIcon){
      let sum = Number(downLeft.textContent);
      sum += 1;
      downLeft.textContent = sum;
    }
    //down right
    if(rightCondition && downCondition && downRight.innerHTML !== bombIcon){
      let sum = Number(downRight.textContent);
      sum += 1;
      downRight.textContent = sum;
    }
  })
}



btnStart.addEventListener('click', function startGame(){
  btnStart.disabled = true;
  setBombs();
});


const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', function handleShowCell(){
   const clickedCell = this;
   clickedCell.classList.remove('hidden');
   if(clickedCell.innerHTML === bombIcon){
     for(let bomb of bombsArray){
       bomb.classList.remove('hidden');
       bomb.removeChild(bomb.lastElementChild);
       bomb.innerHTML = bombIcon
     }
     clickedCell.style.color = 'red';
   }
  })
})

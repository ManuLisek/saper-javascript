'use strict'
const btnStart = document.querySelector('.start');
const btnEasy = document.querySelector('.easy');
const btnDifficult = document.querySelector('.difficult');
const container = document.querySelector('.container');
const timer = document.querySelector('.timer');
const bombIcon = '<i class="fas fa-bomb"></i>';
const flagIcon = '<i class="fas fa-flag"></i>';
const questionIcon = '<i class="fas fa-question"></i>';
let bombsArray = [];
let amountOfBombs = 6;
let cellsInRow = 8;
let cellSize = 30;
let seconds = 0;
let minutes = 5;
let idInterval;

function createGameboard(){
  const size = cellSize * cellsInRow
  container.setAttribute('style', `width:${size}px; height:${size}px;`)

  for(let i = 0; i < cellsInRow * cellsInRow; i++){
    const cell = document.createElement('div');
    cell.className = 'cell hidden';
    cell.setAttribute('style', `width:${cellSize}px; height:${cellSize}px;`)
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
  container.classList.remove('disabled');
  btnStart.classList.add('inactive');
  idInterval = setInterval(function start(){
    seconds--;

    if(seconds < 0){
      seconds = 59;
      minutes--;
    }
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    timer.textContent = `${minutes}:${seconds}`;

    if(seconds === '00' && minutes === 0){
      clearInterval(idInterval);
    }
  }, 1000);
  setBombs();
  handleListeners();
});

btnEasy.addEventListener('click', function makeEasy(){
  container.textContent = "";
  btnStart.disabled = false;
  bombsArray = [];
  cellSize = 30
  cellsInRow = 8;
  amountOfBombs = 6;
  container.classList.add('disabled');
  btnDifficult.classList.remove('active');
  btnEasy.classList.add('active');
  btnStart.classList.remove('inactive');
  seconds = 0;
  minutes = 5;
  clearInterval(idInterval);
  timer.textContent = '0:00';
  createGameboard();
  
})

btnDifficult.addEventListener('click', function makeDifficult(){
  container.textContent = "";
  btnStart.disabled = false;
  bombsArray = [];
  cellSize = 26
  cellsInRow = 11;
  amountOfBombs = 12;
  container.classList.add('disabled');
  btnDifficult.classList.add('active');
  btnEasy.classList.remove('active');
  btnStart.classList.remove('inactive');
  seconds = 0;
  minutes = 5;
  clearInterval(idInterval);
  timer.textContent = '0:00';
  createGameboard();
})


function handleListeners(){
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', function handleShowCell(){
   const clickedCell = this;
   clickedCell.classList.remove('hidden');
   if(clickedCell.innerHTML === bombIcon){
     for(let bomb of bombsArray){
       bomb.classList.remove('hidden');
       bomb.removeChild(bomb.lastElementChild);
       bomb.innerHTML = bombIcon;
     }
     clickedCell.style.color = 'red';
     container.classList.add('disabled');
     clearInterval(idInterval);
   }
  })

  cell.addEventListener('contextmenu', function handleFlag(e){
    const clickedCell = this;
    e.preventDefault();
  
    if(e.button == 2 && clickedCell.classList.contains('hidden')){
   
      if(!clickedCell.innerHTML.includes(flagIcon) && !clickedCell.innerHTML.includes(questionIcon)){
        clickedCell.innerHTML += flagIcon;
      }
      else if(clickedCell.innerHTML.includes(flagIcon) ){
        clickedCell.removeChild(clickedCell.lastElementChild);
        clickedCell.innerHTML += questionIcon;
      }
      else if(clickedCell.innerHTML.includes(questionIcon)){
        clickedCell.removeChild(clickedCell.lastElementChild);
      }
    
    }
  });
})
}


'use strict'
const btnStart = document.querySelector('.start');
const btnEasy = document.querySelector('.easy');
const btnDifficult = document.querySelector('.difficult');
const cellsContainer = document.querySelector('.container');
const timer = document.querySelector('.timer');
const face = document.querySelector('.face');
const counterContainer = document.querySelector('.counter');
const bombIcon = '<i class="fas fa-bomb"></i>';
const flagIcon = '<i class="fas fa-flag"></i>';
const questionIcon = '<i class="fas fa-question"></i>';
const mehFace = '<i class="far fa-meh"></i>';
const surpriseFace = '<i class="far fa-surprise"></i>';
const dizzyFace = '<i class="far fa-dizzy"></i>';
let bombsArray = [];
let amountOfBombs = 6;
let cellsInRow = 8;
let cellSize = 30;
let seconds = 0;
let minutes = 5;
let idInterval;
let counter = amountOfBombs;


function createGameboard(){
  const size = cellSize * cellsInRow
  cellsContainer.setAttribute('style', `width:${size}px; height:${size}px;`)

  for(let i = 0; i < cellsInRow * cellsInRow; i++){
    const cell = document.createElement('div');
    cell.className = 'cell hidden';
    cell.setAttribute('style', `width:${cellSize}px; height:${cellSize}px;`)
    cellsContainer.appendChild(cell);
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


function endGame(){
  for(let bomb of bombsArray){
    bomb.classList.remove('hidden');
    bomb.removeChild(bomb.lastElementChild);
    bomb.innerHTML = bombIcon;
  }
  face.innerHTML = dizzyFace;
  face.style.color = 'red';
  clearInterval(idInterval);
  cellsContainer.classList.add('disabled');
}

function clearGameboard(){
  bombsArray = [];
  cellsContainer.textContent = "";
  btnStart.disabled = false;
  cellsContainer.classList.add('disabled');
  btnDifficult.classList.remove('active');
  btnEasy.classList.add('active');
  btnStart.classList.remove('inactive');
  face.innerHTML = mehFace;
  face.style.color = 'orange';
  seconds = 0;
  minutes = 5;
  // console.log(counter);
  let counter = amountOfBombs;
  counterContainer.textContent = counter;
  timer.textContent = '5:00';
  clearInterval(idInterval);
  createGameboard();
}



btnStart.addEventListener('click', function startGame(){
  btnStart.disabled = true;
  cellsContainer.classList.remove('disabled');
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
      endGame();
    }
  }, 1000);
  setBombs();
  handleListeners();
});

btnEasy.addEventListener('click', function makeEasy(){
  cellSize = 30
  cellsInRow = 8;
  amountOfBombs = 6;
  clearGameboard();
})

btnDifficult.addEventListener('click', function makeDifficult(){
  cellSize = 26
  cellsInRow = 11;
  amountOfBombs = 12;
  clearGameboard();
})


function handleListeners(){
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', function handleShowCell(){
   const clickedCell = this;
   clickedCell.classList.remove('hidden');
   if(clickedCell.innerHTML === bombIcon){
     clickedCell.style.color = 'red';
     endGame();
   }
  })

  cell.addEventListener('contextmenu', function handleFlag(e){
    const clickedCell = this;
    e.preventDefault();
  
    if(e.button == 2 && clickedCell.classList.contains('hidden')){
   
      if(!clickedCell.innerHTML.includes(flagIcon) && !clickedCell.innerHTML.includes(questionIcon) && counter > 0){
        clickedCell.innerHTML += flagIcon;
        counter--;
        counterContainer.textContent = counter;
      }
      else if(clickedCell.innerHTML.includes(flagIcon) ){
        clickedCell.removeChild(clickedCell.lastElementChild);
        clickedCell.innerHTML += questionIcon;
        counter++;
        counterContainer.textContent = counter;
      }
      else if(clickedCell.innerHTML.includes(questionIcon)){
        clickedCell.removeChild(clickedCell.lastElementChild);
      }
    
    }
  });
})
}


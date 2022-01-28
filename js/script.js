'use strict';
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
const sweatyFace = '<i class="far fa-grin-beam-sweat"></i>';
let bombsArray = [];
let amountOfBombs = 6;
let cellsInRow = 8;
let cellSize = 30;
let seconds = 0;
let minutes = 5;
let idInterval;
let indexesOfBombs;
let counter = amountOfBombs;
let cellsToCheck;
let cells;

function createGameboard(){
  const size = cellSize * cellsInRow;
  cellsContainer.setAttribute('style', `width:${size}px; height:${size}px;`);
  for(let i = 0; i < cellsInRow * cellsInRow; i++){
    const cell = document.createElement('div');
    cell.className = 'cell hidden';
    cell.setAttribute('style', `width:${cellSize}px; height:${cellSize}px;`);
    cellsContainer.appendChild(cell);
  }
}
createGameboard();


function setBombs(){
  cells = document.querySelectorAll('.cell');
  while(bombsArray.length < amountOfBombs){
    const r = Math.floor(Math.random() * cells.length);
    if(!bombsArray.includes(cells[r])){
      bombsArray.push(cells[r]);
    }
  }
  bombsArray.forEach(bomb => bomb.innerHTML = bombIcon);
  indexesOfBombs = [...cells].map((e, i) => e.innerHTML !== '' ? i : '').filter(Number.isFinite);
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
    if(rightCondition && right.innerHTML !== bombIcon){
      let sum = Number(right.textContent);
      sum += 1;
      right.textContent = sum;
    }
    if(leftCondition && left.innerHTML !== bombIcon){
      let sum = Number(left.textContent);
      sum += 1;
      left.textContent = sum;
    }
    if(upCondition && up.innerHTML !== bombIcon){
      let sum = Number(up.textContent);
      sum += 1;
      up.textContent = sum;
    }
    if(downCondition && down.innerHTML !== bombIcon){
      let sum = Number(down.textContent);
      sum += 1;
      down.textContent = sum;
    }
    if(leftCondition && upCondition && upLeft.innerHTML !== bombIcon){
      let sum = Number(upLeft.textContent);
      sum += 1;
      upLeft.textContent = sum;
    }
    if(rightCondition && upCondition && upRight.innerHTML !== bombIcon){
      let sum = Number(upRight.textContent);
      sum += 1;
      upRight.textContent = sum;
    }
    if(leftCondition && downCondition && downLeft.innerHTML !== bombIcon){
      let sum = Number(downLeft.textContent);
      sum += 1;
      downLeft.textContent = sum;
    }
    if(rightCondition && downCondition && downRight.innerHTML !== bombIcon){
      let sum = Number(downRight.textContent);
      sum += 1;
      downRight.textContent = sum;
    }
  });
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
  cellsContainer.textContent = '';
  btnStart.disabled = false;
  cellsContainer.classList.add('disabled');
  btnStart.classList.remove('inactive');
  face.innerHTML = mehFace;
  face.style.color = 'orange';
  seconds = 0;
  minutes = 5;
  counter = amountOfBombs;
  counterContainer.textContent = counter;
  timer.textContent = '5:00';
  clearInterval(idInterval);
  createGameboard();
}

function winGame(){
  face.innerHTML = sweatyFace;
  face.style.color = 'limegreen';
  clearInterval(idInterval);
  cellsContainer.classList.add('disabled');
  btnStart.disabled = false;
  btnStart.classList.remove('inactive');
}

function checkAroundClickedIndex(clickedIndex){
  const right = clickedIndex + 1;
  const left = clickedIndex - 1;
  const up = clickedIndex - cellsInRow;
  const down = clickedIndex + cellsInRow;
  const downRight = clickedIndex + cellsInRow + 1;
  const downLeft = clickedIndex + cellsInRow - 1;
  const upLeft = clickedIndex - cellsInRow - 1;
  const upRight = clickedIndex - cellsInRow + 1;
  if(right % cellsInRow !== 0 && !cells[right].innerHTML.includes('fas')) {
    cells[right].classList.remove('hidden');
    if(cells[right].innerHTML === '' && !cellsToCheck.includes(right)){
      cellsToCheck.push(right);
      checkAroundClickedIndex(right);
    }
  }
  if((clickedIndex % cellsInRow !== 0 && !cells[left].innerHTML.includes('fas'))){
    cells[left].classList.remove('hidden');
    if(cells[left].innerHTML === '' && !cellsToCheck.includes(left)){
      cellsToCheck.push(left);
      checkAroundClickedIndex(left);
    }
  }
  if(down < cells.length && !cells[down].innerHTML.includes('fas')){
    cells[down].classList.remove('hidden');
    if(cells[down].innerHTML === '' && !cellsToCheck.includes(down)){
      cellsToCheck.push(down);
      checkAroundClickedIndex(down);
    }
  }
  if(up >= 0 && !cells[up].innerHTML.includes('fas')){
    cells[up].classList.remove('hidden');
    if(cells[up].innerHTML === '' && !cellsToCheck.includes(up)){
      cellsToCheck.push(up);
      checkAroundClickedIndex(up);
    }
  }
  if(right % cellsInRow !== 0 && down < cells.length && !cells[downRight].innerHTML.includes('fas')){
    cells[downRight].classList.remove('hidden');
    if(cells[downRight].innerHTML === '' && !cellsToCheck.includes(downRight)){
      cellsToCheck.push(downRight);
      checkAroundClickedIndex(downRight);
    }
  }
  if(clickedIndex % cellsInRow !== 0 && down < cells.length && !cells[downLeft].innerHTML.includes('fas')){
    cells[downLeft].classList.remove('hidden');
    if(cells[downLeft].innerHTML === '' && !cellsToCheck.includes(downLeft)){
      cellsToCheck.push(downLeft);
      checkAroundClickedIndex(downLeft);
    }
  }
  if(clickedIndex % cellsInRow !== 0 && up >= 0 && !cells[upLeft].innerHTML.includes('fas')){
    cells[upLeft].classList.remove('hidden');
    if(cells[upLeft].innerHTML === '' && !cellsToCheck.includes(upLeft)){
      cellsToCheck.push(upLeft);
      checkAroundClickedIndex(upLeft);
    }
  }
  if(right % cellsInRow !== 0 && up >= 0 && !cells[upRight].innerHTML.includes('fas')){
    cells[upRight].classList.remove('hidden');
    if(cells[upRight].innerHTML === '' && !cellsToCheck.includes(upRight)){
      cellsToCheck.push(upRight);
      checkAroundClickedIndex(upRight);
    }
  }
}

function startGame(){
  clearGameboard();
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
      btnStart.disabled = false;
      btnStart.classList.remove('inactive');
    }
  }, 1000);
  setBombs();
  handleListeners();
}

function makeEasy(){
  cellSize = 30;
  cellsInRow = 8;
  amountOfBombs = 6;
  btnDifficult.classList.remove('active');
  btnEasy.classList.add('active');
  clearGameboard();
}

function makeDifficult(){
  cellSize = 26;
  cellsInRow = 11;
  amountOfBombs = 12;
  btnDifficult.classList.add('active');
  btnEasy.classList.remove('active');
  clearGameboard();
}

function handleShowCell(){
  const clickedCell = this;
  if(!clickedCell.innerHTML.includes(flagIcon) && !clickedCell.innerHTML.includes(questionIcon)){
    clickedCell.classList.remove('hidden');
  }
  if(clickedCell.innerHTML === ''){
    cells = [...cells];
    let clickedIndex = cells.indexOf(clickedCell);
    cellsToCheck = [];
    checkAroundClickedIndex(clickedIndex);
  }
  else if(clickedCell.innerHTML.includes(flagIcon)){
    return;
  }
  else if(clickedCell.innerHTML.includes(questionIcon)){
    return;
  }
  else if(clickedCell.innerHTML.includes(bombIcon)){
    clickedCell.style.color = 'red';
    btnStart.disabled = false;
    btnStart.classList.remove('inactive');
  }
}

function handleFlag(e){
  const clickedCell = this;
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
  if(counter === 0){
    const indexesOfFlags = [...cells].map((e, i) => e.innerHTML.includes(flagIcon) ? i : '').filter(Number.isFinite);
    const result = [];
    indexesOfFlags.forEach(indexOfFlag => {
      if(indexesOfBombs.includes(indexOfFlag)){
        result.push(indexOfFlag);
      }
    });
    if(result.length === amountOfBombs){
      winGame();
    } 
  }
}

function handleSurpriseFace(e){
  const clickedCell = this;
  if(e.button == 0 && clickedCell.classList.contains('hidden') && !clickedCell.innerHTML.includes(flagIcon) && !clickedCell.innerHTML.includes(questionIcon)){
    face.innerHTML = surpriseFace;
  }
}

function handleReactionFace(e){
  const clickedCell = this;
  if(clickedCell.innerHTML === bombIcon && e.button == 0){
    endGame();
  } else {
    face.innerHTML = mehFace;
  }
}

function handleListeners(){
  cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', handleShowCell);
    cell.addEventListener('contextmenu', handleFlag);
    cell.addEventListener('mousedown', handleSurpriseFace);
    cell.addEventListener('mouseup', handleReactionFace);
  });
}

btnStart.addEventListener('click', startGame);
btnEasy.addEventListener('click', makeEasy);
btnDifficult.addEventListener('click', makeDifficult);





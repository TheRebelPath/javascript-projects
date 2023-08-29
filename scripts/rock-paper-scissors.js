
let score = JSON.parse(localStorage.getItem('score')) ||{
  wins: 0,
  losses: 0,
  ties: 0
}; 

updateScoreElement();
//document.querySelector('.js-result').innerHTML = result;
// document.querySelector('.js-moves').innerHTML = `You ${playerMove} - ${computerMove} Computer`;

/*
if(!score) {
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
}
*/
let isAutoPlaying = false;
let intervalId;
document.getElementById('js-auto-play-button')
.addEventListener('click', autoPlay);
function autoPlay(){
  const playButtonText = document.getElementById('js-auto-play-button');
  if(!isAutoPlaying){
    intervalId = setInterval(()=> {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    playButtonText.innerHTML = 'Stop Playing';
  isAutoPlaying = true;
  }else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    playButtonText.innerHTML = 'Auto Play';
  }
}

document.getElementById('js-reset-score-button')
.addEventListener('click', showResetAlert )

function showResetAlert(){
  document.getElementById('reset-alert').
  innerHTML = `
  <p class="alert-text" >Are you sure you want to reset the score?</p>
    <button id="reset-yes-button" class="confirm-button">Yes</button>
    <button id="reset-no-button" class="confirm-button">No</button>
  `;
  //This way uses dom manipulation but takes a lot of code.
 /*
  const container = document.getElementById('reset-alert');
  const confirmationText = document.createElement('p');
  const confirmYesButton = document.createElement('button');
  const confirmNoButton = document.createElement('button');
  confirmationText.setAttribute('class', 'alert-text');
  confirmationText.textContent = 'Are you sure you want to reset the score?';
  confirmYesButton.setAttribute('id', 'reset-yes-button');
  confirmYesButton.setAttribute('class', 'confirm-button');
  confirmYesButton.textContent = 'yes';
  confirmNoButton.textContent = 'No';
  confirmNoButton.setAttribute('id', 'reset-no-button');
  confirmNoButton.setAttribute('class', 'confirm-button');
  container.appendChild(confirmationText);
  container.appendChild(confirmYesButton);
  container.appendChild(confirmNoButton);
  */
  document.getElementById('reset-yes-button')
  .addEventListener('click', ()=>{
    resetScoreButton();
    hideResetAlert();
  });
  document.getElementById('reset-no-button')
  .addEventListener('click', hideResetAlert);
}
function hideResetAlert(){
  document.getElementById('reset-alert').innerHTML = '';
}

function resetScoreButton() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
} ;

document.querySelector('.js-rock-button')
.addEventListener('click', ()=>{
  playGame('rock');
});
document.querySelector('.js-paper-button')
.addEventListener('click', ()=>{
  playGame('paper');
});
document.querySelector('.js-scissors-button')
.addEventListener('click', ()=>{
  playGame('scissors');
});
document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p'){
    playGame('paper')
  }else if (event.key === 's'){
    playGame('scissors');
  } else if(event.key === 'a'){
    autoPlay();
  } else if(event.key === ' ') {
    //console.log('pressed enter');
    showResetAlert();
  }
});
function playGame(playerMove) {
  const computerMove = pickComputerMove();
let result = '';
if(playerMove === 'scissors') {
  if (computerMove === 'rock') {
    result = 'You Lose.';
  } else if (computerMove === 'paper') {
    result = 'You Win.';
  } else if (computerMove === 'scissors') {
    result = 'Tie.';
  }
  
} else if(playerMove === 'paper'){
  if(computerMove === 'rock') {
    result = 'You Win.';
  } else if(computerMove === 'paper') {
    result = 'Tie.';
  } else if (computerMove === 'scissors') {
    result = 'You Lose.';
  } 
}else if(playerMove === 'rock') {
    if(computerMove === 'rock') {
      result = 'Tie.';
    } else if(computerMove === 'paper') {
      result = 'You Lose.';
    } else if (computerMove === 'scissors') {
      result = 'You Win.';
    }
   
  }
  if (result === 'You Win.') {
    score.wins ++;
  } else if (result === 'You Lose.') {
    score.losses ++;
  } else if (result === 'Tie.') {
    score.ties ++;
  }

  localStorage.setItem('score', JSON.stringify(score));

 updateScoreElement();
 document.querySelector('.js-result').innerHTML = result;
 document.querySelector('.js-moves').innerHTML 
 = `You 
 <img src="images/${playerMove}-emoji.png" class="move-icon" >
 <img src="images/${computerMove}-emoji.png" class="move-icon" >
 Computer`;  
  }
  
  
  function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  }
  


function pickComputerMove() {
const randomNumber = Math.random();
let computerMove = "";
if (randomNumber >= 0 && randomNumber < 1 / 3) {
  computerMove = "rock";
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
  computerMove = "paper";
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
  computerMove = "scissors";
}
return computerMove;
}
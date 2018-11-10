// Globals

// Available Levels
const levels = {
  easy: 10,
  medium: 7,
  hard: 4
};

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const difficulty = document.querySelector('#difficulty-selector');
const btnRestart = document.getElementById('restart');
const topScoreDisplay = document.getElementById('top-score');

function returnSelectedDiffculity() {

  for ( let i =0; i<difficulty.childElementCount; i++){
    let workingNode = difficulty.children[i];
    if ( workingNode.classList.contains('active') ) {
      return workingNode.firstElementChild.name
    }   
    console.log (workingNode)
  }
}



let score = 0;
let isPlaying;
let topScore = 0; 
console.log(difficulty)
// To change level
let selectedDiffculity = levels[returnSelectedDiffculity()]; 
let time = selectedDiffculity;



// random words for game
const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];
// set display second with javascript 
seconds.innerHTML=time;

difficulty.addEventListener('click', e => {
  if (e.target.tagName === 'INPUT') {
    // take class active off all children
    for (let ele of difficulty.children) {
      if (ele.classList.contains('active')) ele.classList.remove('active');
    }
    // add class active to clicked child
    e.target.parentElement.classList.toggle('active');
    // set frontend and backend with selected
    setData=(time)=> {
      seconds.innerHTML = selectedDiffculity = time;
    }
    switch (e.target.getAttribute('name')) {
      case 'medium':
        this.setData(levels.medium)
        break;
      case 'hard':
        this.setData(levels.hard)
        break;
      default:
        this.setData(levels.easy)
    }
  }
});
btnRestart.addEventListener('click', e=> {
  score = 0;
  inputClear();
  isPlaying = false; 
  time= selectedDiffculity
})
timeDisplay.addEventListener('change', e => {
  console.log(seconds);
});
function inputClear() {
  wordInput.value = '';
}

wordInput.addEventListener('input', () => {
  if (matchWords()) {
    inputClear();
    time = selectedDiffculity + 1
    score++;
    isPlaying ? showWord(words) : init();
  }
});

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = selectedDiffculity;
  // Load word from array
  isPlaying = true;
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  intervalCountDown();
  // Check game status
  setInterval(checkStatus, 50);
}
function intervalCountDown() {
  setInterval(countdown, 1000);
}
// Start match
function startMatch() {
  if (matchWords()) {
    time = selectedDiffculity + 1;
    showWord(words);
    inputClear();
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  if (isPlaying === true && time > 0) {
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
    topScore = Math.max(score, topScore);
    topScoreDisplay.innerText = topScore;
    clearInterval(init);
    clearInterval(intervalCountDown);
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    // score = -1;
    
  }
}

// $('#ex20a').on('click', function(e) {
//   $('#ex20a')
//     .parent()
//     .find(' >.well')
//     .toggle()
//     .find('input')
//     .slider('relayout');
//   e.preventDefault();
// });

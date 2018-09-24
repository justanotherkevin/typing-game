// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const difficulty = document.querySelector('#difficulty-selector');

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

difficulty.addEventListener('click', e => {
  if (e.target.tagName === 'INPUT') {
    for (let ele of difficulty.children) {
      if (ele.classList.contains('active')) ele.classList.remove('active');
    }
    e.target.parentElement.classList.toggle('active');
    switch (e.target.getAttribute('name')) {
      case 'medium':
        levels.medium;
        seconds.innerHTML = '3';
        break;
      case 'hard':
        levels.hard;
        seconds.innerHTML = '1';
        break;
      default:
        levels.easy;
        seconds.innerHTML = '5';
    }
  }
});
timeDisplay.addEventListener('change', e => {
  console.log(seconds);
});
function inputClear() {
  wordInput.value = '';
}

wordInput.addEventListener('input', () => {
  if (matchWords()) {
    init();
    inputClear();
  }
});

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
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
    time = currentLevel + 1;
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
  console.log(isPlaying);
  if (isPlaying === true && time > 0) {
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
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

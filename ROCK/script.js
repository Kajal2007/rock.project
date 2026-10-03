// ===== Game State =====
let userScore = 0;
let computerScore = 0;
let wins = 0;
let losses = 0;
let draws = 0;
let roundNumber = 0;
let historyData = [];

// ===== DOM Elements =====
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('resetBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const userScoreEl = document.getElementById('userScore');
const computerScoreEl = document.getElementById('computerScore');
const winsCountEl = document.getElementById('winsCount');
const lossesCountEl = document.getElementById('lossesCount');
const drawsCountEl = document.getElementById('drawsCount');
const roundNumberEl = document.getElementById('roundNumber');
const totalRoundsEl = document.getElementById('totalRounds');

const userChoiceIconEl = document.getElementById('userChoiceIcon');
const computerChoiceIconEl = document.getElementById('computerChoiceIcon');
const resultDisplayEl = document.getElementById('resultDisplay');
const historyListEl = document.getElementById('historyList');

// ===== Icon Map =====
const icons = {
  Rock: '✊',
  Paper: '📄',
  Scissors: '✂️'
};

// ===== Event Listeners =====
choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const userChoice = button.getAttribute('data-choice');
    playRound(userChoice, button);
  });
});

resetBtn.addEventListener('click', resetGame);
clearHistoryBtn.addEventListener('click', clearHistory);

// ===== Core Game Logic =====
function playRound(userChoice, clickedButton) {
  // Small visual feedback on the clicked button
  choiceButtons.forEach(btn => btn.classList.remove('selected'));
  clickedButton.classList.add('selected');

  const computerChoice = getComputerChoice();
  const result = getResult(userChoice, computerChoice);

  roundNumber++;

  updateBattleDisplay(userChoice, computerChoice);
  updateResultDisplay(result);
  updateScores(result);
  updateStatsDisplay();
  addToHistory(roundNumber, userChoice, computerChoice, result);
}

function getComputerChoice() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function getResult(user, computer) {
  if (user === computer) {
    return 'draw';
  }

  const userWinsConditions =
    (user === 'Rock' && computer === 'Scissors') ||
    (user === 'Scissors' && computer === 'Paper') ||
    (user === 'Paper' && computer === 'Rock');

  return userWinsConditions ? 'win' : 'lose';
}

function updateBattleDisplay(userChoice, computerChoice) {
  userChoiceIconEl.textContent = icons[userChoice];
  computerChoiceIconEl.textContent = icons[computerChoice];
}

function updateResultDisplay(result) {
  resultDisplayEl.classList.remove('win', 'lose', 'draw');

  if (result === 'win') {
    resultDisplayEl.textContent = 'You Win! 🎉';
    resultDisplayEl.classList.add('win');
  } else if (result === 'lose') {
    resultDisplayEl.textContent = 'Computer Wins! 💻';
    resultDisplayEl.classList.add('lose');
  } else {
    resultDisplayEl.textContent = "It's a Draw! 🤝";
    resultDisplayEl.classList.add('draw');
  }
}

function updateScores(result) {
  if (result === 'win') {
    userScore++;
    wins++;
  } else if (result === 'lose') {
    computerScore++;
    losses++;
  } else {
    draws++;
  }

  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
}

function updateStatsDisplay() {
  winsCountEl.textContent = wins;
  lossesCountEl.textContent = losses;
  drawsCountEl.textContent = draws;
  roundNumberEl.textContent = roundNumber;
  totalRoundsEl.textContent = roundNumber;
}

// ===== History =====
function addToHistory(round, userChoice, computerChoice, result) {
  const resultText =
    result === 'win' ? 'You Win!' :
    result === 'lose' ? 'Computer Wins!' : 'Draw';

  historyData.unshift({ round, userChoice, computerChoice, resultText, result });
  renderHistory();
}

function renderHistory() {
  if (historyData.length === 0) {
    historyListEl.innerHTML = '<p class="history-empty">No rounds played yet. Your history will appear here.</p>';
    return;
  }

  historyListEl.innerHTML = historyData.map(item => {
    const borderClass =
      item.result === 'win' ? 'win-border' :
      item.result === 'lose' ? 'lose-border' : 'draw-border';

    return `
      <div class="history-item ${borderClass}">
        <span class="history-round">Round ${item.round}</span>
        <span>You: ${item.userChoice} ${icons[item.userChoice]} &nbsp; | &nbsp; Computer: ${item.computerChoice} ${icons[item.computerChoice]}</span>
        <span>Result: ${item.resultText}</span>
      </div>
    `;
  }).join('');
}

function clearHistory() {
  historyData = [];
  renderHistory();
}

// ===== Reset Game =====
function resetGame() {
  userScore = 0;
  computerScore = 0;
  wins = 0;
  losses = 0;
  draws = 0;
  roundNumber = 0;
  historyData = [];

  userScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  winsCountEl.textContent = 0;
  lossesCountEl.textContent = 0;
  drawsCountEl.textContent = 0;
  roundNumberEl.textContent = 0;
  totalRoundsEl.textContent = 0;

  userChoiceIconEl.textContent = '❔';
  computerChoiceIconEl.textContent = '❔';

  resultDisplayEl.textContent = 'Make your move to start playing!';
  resultDisplayEl.classList.remove('win', 'lose', 'draw');

  choiceButtons.forEach(btn => btn.classList.remove('selected'));

  renderHistory();
}
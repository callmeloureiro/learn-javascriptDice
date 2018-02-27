var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  // if case exist winner in the game
  if (! gamePlaying) return;

  // get random Number
  var dice = Math.floor(Math.random() * 6 + 1);

  // display resuts
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'img/dice-' + dice + '.png';

  if (dice === 6 && lastDice === 6) {
    // Player looses score
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = '0';
    nextPlayer();
  } else if (dice !== 1)  {
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore
  } else {
    nextPlayer();
  }

  lastDice = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (! gamePlaying) return;

  // Add current score to global scope
  scores[activePlayer] += roundScore;

  // update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  // get value from form
  var inputValue = document.querySelector('.final-score').value
  var winningScore;

  if (inputValue) {
    winningScore = inputValue;
  } else {
    winningScore = 100;
  }

  // check if player won the game
  if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    nextPlayer();
  }

});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // remove display dice
  document.querySelector('.dice').style.display = 'none';

  // set 0 to values
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // set to default names on players
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // set state class to default
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
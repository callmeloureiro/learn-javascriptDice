var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  // if case exist winner in the game
  if (! gamePlaying) return;

  // get random Number
  var dice1 = Math.floor(Math.random() * 6 + 1);
  var dice2 = Math.floor(Math.random() * 6 + 1);

  // display resuts
  document.getElementById('dice-1').style.display = 'block';
  document.getElementById('dice-2').style.display = 'block';
  document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
  document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';

  // if dice equals to 1, so, play next player.
  if (dice1 === 1 && dice2 === 1) {
    nextPlayer();
  } else {
    roundScore += dice1 + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore
  }
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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // remove display dice
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

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
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, player1, player2;

player1 = 0;
player2 = 1;
scores = [0, 0];
roundScore = 0;
activePlayer = player1;


//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// Hide the dice for the beginning of the game
document.querySelector('.dice').style.display = 'none';

// Set the initial scores displayed in the DOM to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

// Set the initial current score to 0
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

function setViewsNextPlayer(){

    var prevPlayer = activePlayer;
    activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
    roundScore = 0;

    document.getElementById('current-' + prevPlayer).textContent = '0';

    // make the current active player active in the display
    document.querySelector('.player-' + prevPlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    // // OR
    // document.querySelector('.player-0-panel').classList.toggle('active');
    // document.querySelector('.player-1-panel').classList.toggle('active');

    // Set dice invicible incase of a 1 played
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    // 1. we need the random dice
    // the dice is a maximum of 6 digits non zero positive integer number that is random
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the results
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    

    // 3. Update the round score IF the rolled numeber is not a 1
    if (dice > 1) {
        // add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // Next player, set roundscore to 0, set the current view for that user to 0
        setViewsNextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    // add the roundscore of the current player to the player's score
    scores[activePlayer] += roundScore;

    // Handle the Winning case
    if (scores[activePlayer] >= 10) {

        document.getElementById('name-' + activePlayer).innerHTML = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }

    // Set the view for the score to the new score
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // change the views
    setViewsNextPlayer();
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

})

// // Getting into DOM manipulation
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, dice, activePlayer,permission;
init(); 
//creating function to assign zeros in order to Call when New game starts
function init() {
permission = true;	
scores = [0,0];  // varaible for total score for 2 players 
roundScore = 0;  // varaible for roundescore for every round
activePlayer = 0; // variable to figure out who is activeplayer - contains 0,1 only.. 0 is for player 1, 1 if for player 2
}


document.querySelector('.btn-roll').addEventListener('click', function() {
	// asking permission because variable 'permission' will be false to not to continue game after game is over
if (permission)  {
var dice = Math.floor((Math.random()*6)+1);
scores[activePlayer] += dice;
roundScore += dice;
document.querySelector('.dice').style.display ='block';
document.querySelector('#current-' + activePlayer).textContent = roundScore;

document.querySelector('.dice').src = 'dice-' + dice + '.png';

if (dice==1) { 
	//1. Change player and the active player design for next player
	scores[activePlayer] = 0; 
	document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	nextPlayer();
	//2. Zero the Global Score and Zerp the current score
}
}
}) 

//DRY function. creating function to use when players switched. 
function nextPlayer() {
	roundScore = 0;
	document.querySelector('.dice').style.display ='none';
	
	document.querySelector('#current-' + activePlayer).textContent = 0;
	activePlayer==0 ? activePlayer=1 : activePlayer=0


	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}
// adding eventlistener when 'hold' button clicked
document.querySelector('.btn-hold').addEventListener('click', function() {
	document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	if (scores[activePlayer]>=20)  { 
		document.getElementById('name-' + activePlayer).textContent ='winner!';
		document.querySelector('.dice').style.display = 'none'; 
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		permission = false; // assigning False in order to Stop the "roll button"
	}
	else { nextPlayer();}
})

document.querySelector('.btn-new').addEventListener('click', function() {
	// assigning zero to varaibles and design
document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
document.querySelector('#current-' + activePlayer).textContent = 0;
document.getElementById('score-' + activePlayer).textContent = 0;
document.getElementById('name-' + activePlayer).textContent ='player ' +(activePlayer+1);
 // calling function to assign zero to all Variables
init(); 
})


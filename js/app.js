/*
 * Create a list that holds all of your cards
 */
/*const cards = [
  "fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube",
  "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"
];
*/


const cards = [
  '<image class="icon hide bird" src="img/cards/bird.png" alt="bird">', '<image class="icon hide chicken" src="img/cards/chicken.png" alt="chicken">',
  '<image class="icon hide dog" src="img/cards/dog.png" alt="dog">', '<image class="icon hide flamingo" src="img/cards/flamingo.png" alt="flamingo">',
  '<image class="icon hide kitten"  src="img/cards/kitten.png" alt="kitten">', '<image class="icon hide owl" src="img/cards/owl.png" alt="owl">',
  '<image class="icon hide owl2" src="img/cards/owl2.png" alt="owl2">', '<image class="icon hide turtle" src="img/cards/turtle.png" alt="turtle">',
  '<image class="icon hide bird" src="img/cards/bird.png" alt="bird">', '<image class="icon hide chicken" src="img/cards/chicken.png" alt="chicken">',
  '<image class="icon hide dog" src="img/cards/dog.png" alt="dog">', '<image class="icon hide flamingo" src="img/cards/flamingo.png" alt="flamingo">',
  '<image class="icon hide kitten"  src="img/cards/kitten.png" alt="kitten">', '<image class="icon hide owl" src="img/cards/owl.png" alt="owl">',
  '<image class="icon hide owl2" src="img/cards/owl2.png" alt="owl2">', '<image class="icon hide turtle" src="img/cards/turtle.png" alt="turtle">',
];



const bodyDocFrag = document.createDocumentFragment();
const table = document.querySelector('.deck');
const start = document.querySelector('.start');
const moves = document.querySelector('.moves');
const stars = document.getElementsByClassName('fa-star');
const modal = document.getElementById('myModal');
const modalMessage = document.getElementById('modal-message');
const reStart = document.getElementById('reStart');
const playAgain = document.querySelector('.playAgain')
const numberOfPairs = 8;
let cardsToCompare = new Array();
let startTime;
let counterOfMoves = 0;
let counterOfMatches = 0;
let numberOfStars = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCardsOnPage(cards) {
    // shuffle the list of cards
    let newPositionOfCards = shuffle(cards);
    // oop through each card and create its HTML
    for (const card in newPositionOfCards) {
      let liTag = document.createElement('li');
      liTag.classList.add("card");
      liTag.insertAdjacentHTML('beforeend', newPositionOfCards[card]);
      bodyDocFrag.appendChild(liTag);
    };
    //add each card's HTML to the page
    $(table).empty();
    table.appendChild(bodyDocFrag);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//event listenet to the restart button
start.addEventListener("click", function(evt) {
    startTheGame();

});

reStart.addEventListener("click", function(evt) {
    modal.style.display = "none";
    startTheGame();
});

playAgain.addEventListener("click", function(evt) {
    startTheGame();

});


// event listeber for card
 table.addEventListener("click", function(evt) {
   cardIsClicked(evt);
 });


 function startTheGame(){
     displayCardsOnPage(cards);
     startTime = turnOnTimer();
     resetCounterOfMoves();
     updateMoves();
     resetCounterOFMatches();
     resetStars();
 }

function isShown(card) {
  return card.classList.contains("show")
}

function isCard(card) {
  return card.classList.contains("card");
}

function cardIsClicked(evt) {
  let card = evt.target;
  if (!isShown(card) && isCard(card)) {
    if (cardsToCompare.length < 2){
      openCard(card);
    }
  }
}

function openCard(cardToDisplay){
    cardToDisplay.classList.add("open", "show");
    cardToDisplay.firstChild.classList.remove('hide');
    addCardToCompareList(cardToDisplay);
}

function addCardToCompareList(cardToDisplay){
    let length = cardsToCompare.push(cardToDisplay);
    console.log(length);
    console.log(cardsToCompare);
    if (length === 2) {
        incrementCountertOfMoves();
        updateMoves();
        checkTheStars();
        checkTheMatch(cardsToCompare);
    }
}

function checkTheMatch(cardsToCompare){
    let firstElement = cardsToCompare[0].firstChild.className;
    let secondElement = cardsToCompare[1].firstChild.className;
    if(firstElement === secondElement){
        markCardAsMatched(cardsToCompare);
    } else {
        markCardAsNotMatched(cardsToCompare);
        setTimeout(function() {
          removeCardsFromList(cardsToCompare);
        }, 1000);
    }
}

function markCardAsMatched(cardsToCompare){
    cardsToCompare.pop().classList.add("match");
    cardsToCompare.pop().classList.add("match");
    incrementCountertOfMatches();
    console.log(cardsToCompare.length);
    if(isTheEndOfGame()) {
        setTimeout(function(){
        stopTheGame();
      }, 500);
    }
}

function removeCardsFromList(cardsToCompare){
    let first = cardsToCompare.pop();
    first.classList.remove("open", "show", "notMatched");
    first.firstChild.classList.add("hide");
    let second = cardsToCompare.pop();
    second.classList.remove("open", "show", "notMatched");
    second.firstChild.classList.add("hide");
    console.log(cardsToCompare.length);
}

function markCardAsNotMatched(cardsToCompare) {
    let first = cardsToCompare[0];
    let second = cardsToCompare[1];
    first.classList.add("notMatched");
    second.classList.add("notMatched");
}

function turnOnTimer(){
    let startingTime = performance.now();
    return startingTime;
}

function calculateTime(startTime) {
    let endingTime = performance.now();
    let timeOfGame = (endingTime - startTime)/1000;
    timeOfGame = timeOfGame.toFixed(1);
    return timeOfGame;
}

function resetCounterOfMoves() {
    counterOfMoves = 0;
}

function resetCounterOFMatches() {
    counterOfMatches = 0;
}

function incrementCountertOfMoves(){
    counterOfMoves += 1;
}

function incrementCountertOfMatches() {
    counterOfMatches +=1;
}

function updateMoves() {
    moves.textContent = counterOfMoves;
}

function isTheEndOfGame() {
    return (counterOfMatches === numberOfPairs);
}

function resetStars(){
    numberOfStars = 3;
    for (let index = 0; index <3; index++){
    stars[index].classList.remove("light");
  }
}

function checkTheStars(){
    if(numberOfStars !== 0){
        if ((counterOfMoves === 10) || (counterOfMoves === 14) || (counterOfMoves === 19)) {
            changeTheStars();
        }
    }
}

function changeTheStars(){
      let index = numberOfStars - 1;
      stars[index].classList.add("light");
      numberOfStars -= 1;
    }

function stopTheGame() {
    let time = calculateTime(startTime);
    let message = `With ${counterOfMoves} Moves and ${numberOfStars} stars.\n
    Time of the game: ${time} seconds`;
    modalMessage.textContent = message;
    modal.style.display = "block";
}

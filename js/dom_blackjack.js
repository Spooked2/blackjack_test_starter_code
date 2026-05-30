// Wait for the HTML page to fully load before running the init function
window.addEventListener("load", init);

// DOM elements
let resultsLabel;
let dealerWinLabel;
let playerWinLabel;
let dealerTotalLabel;
let playerTotalLabel;
let dealerCardContainer;
let playerCardContainer;

// Buttons
let newGameButton;
let hitButton;
let standButton;

// Global constants
const suits = ["hearts", "spades", "diamonds", "clubs"];
const cardTypes = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];

// Global variables
let deck = [];
let playerHand = [];
let dealerHand = [];





// Function that runs right after the HTML page has fully loaded
function init() {

    // Get all the needed DOM elements
    resultsLabel = document.getElementById("resultsLabel");
    dealerWinLabel = document.getElementById("dealerWinLabel");
    playerWinLabel = document.getElementById("playerWinLabel");
    dealerTotalLabel = document.getElementById("dealerTotalLabel");
    playerTotalLabel = document.getElementById("playerTotalLabel");
    dealerCardContainer = document.getElementById("dealerCardContainer");
    playerCardContainer = document.getElementById("playerCardContainer");

    newGameButton = document.getElementById("newGameButton");
    hitButton = document.getElementById("hitButton");
    standButton = document.getElementById("standButton");

    // Add event listeners to buttons
    newGameButton.addEventListener("click", onNewGameButtonPressed);
    hitButton.addEventListener("click", onHitButtonPressed);
    standButton.addEventListener("click", onStandButtonPressed);

    // Disable hit and stand buttons
    disableButton(hitButton);
    disableButton(standButton);

    // Set the amount of wins to 0
    setLabel(playerWinLabel, 0);
    setLabel(dealerWinLabel, 0);

    // Reset the labels
    resetRoundLabels();

}


function onNewGameButtonPressed(e) {
    e.preventDefault();
    
    // Remove all cards currently on the page
    clearAllHTMLCards();

    // Reset the player's and dealer's hands
    playerHand = [];
    dealerHand = [];

    // Reset the deck
    resetDeck();

    // Reset certain text
    resetRoundLabels();

    // Enable stand and hit buttons
    enableButton(hitButton);
    enableButton(standButton);

    // Disable new game button
    disableButton(newGameButton);

    // Draw two cards for the dealer

    // Add them to the dealer's hand

    // Get the total of the dealer's hand
    const dealerTotal = getHandTotal(dealerHand)

    // Update the dealer's total on the HTML page
    setLabel(dealerTotalLabel, dealerTotal);

    // Create the HTML cards in the dealer's hand
    //addHTMLCard(?, ?, dealerCardContainer);
    //addHTMLCard(?, ?, dealerCardContainer);

    // Draw two cards for the player

    // Add them to the player's hand

    // Get the total of the player's hand
    const playerTotal = getHandTotal(playerHand)

    // Update the player's total on the HTML page
    setLabel(playerTotalLabel, playerTotal);

}

function onHitButtonPressed(e) {
    e.preventDefault();

    // Draw a card

    // Add it to the player's hand

    // Get the player's hand total

    // Update the player's total on the HTML page
    //setLabel(playerTotalLabel, ?);

    // Create an HTML card in the player's hand
    //addHTMLCard(?, ?, playerCardContainer);

    // If the player's total exceeds 21, the game is over
    //gameOver();

}

function onStandButtonPressed(e) {
    e.preventDefault();

    // Disable buttons before dealer's turn
    disableButton(hitButton);
    disableButton(standButton);

    // Finally, it's the dealer's turn
    dealerTurn();

}

function dealerTurn() {

    // Keep track of the dealer's total
    let dealerTotal = getHandTotal(dealerHand);

    // While the dealer's total is less than or equal to 17, do stuff
    while (dealerTotal <= 17) {

        // If the dealer's total is below 17, always draw
        // If the dealer's total is at exactly 17, there's a 50% chance he draws or stays
        // (use the break keyword to stop the while loop)
        break

    }

    // After the dealer is done, the game is over
    gameOver();

}

function gameOver() {

    // Get the totals of both the player and dealer

    // Show who wins
    //setLabel(resultsLabel, "? wins!");

    // Add a win to the player or dealer

    // Update the total wins on the HTML page
    // setLabel(playerWinLabel, ?);
    // setLabel(dealerWinLabel, ?);

    // Disable the hit and stand buttons, just in case
    disableButton(hitButton);
    disableButton(standButton);

    // Enable the new game button
    enableButton(newGameButton);
}

function resetDeck() {

    // replace the old deck with a new, empty one
    deck = [];

    // Fill the deck using the given cardTypes and suits arrays


    // Finally, shuffle it
    shuffleDeck();

}

function shuffleDeck() {

}

function getHandTotal(hand) {

    let total = 0;

    // Loop through all the cards in the hand, adding them to the total
    // Ignore the aces


    // Loop through the cards again, this time only for the aces


    // Finally, return the total
    return total;
}

function addHTMLCard(cardType, suit, cardContainer) {

    // Create a new img element
    let image = document.createElement("img");

    // Give it the class "playingCard" for styling
    image.classList.add("playingCard");

    // Set the src to the correct image
    image.src = `assets/cards/${cardType}_${suit}.png`;
    image.alt = `${cardType} of ${suit}`;

    // Finally, add the image to the given card container
    cardContainer.appendChild(image);

}

function setLabel(label, value) {
    // The use of a template string here is to
    // automatically convert any given value into a string
    // for ease of use.
    label.innerHTML = `${value}`;
}

function clearAllHTMLCards() {
    playerCardContainer.innerHTML = "";
    dealerCardContainer.innerHTML = "";
}

function resetRoundLabels() {
    setLabel(resultsLabel, "")
    setLabel(playerTotalLabel, 0);
    setLabel(dealerTotalLabel, 0);
}

function disableButton(button) {
    button.disabled = true;
}

function enableButton(button) {
    button.disabled = false;
}

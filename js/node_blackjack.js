// A game of blackjack played in the console through node.js

// Import the Node input stuff
const readline = await import('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Card {

    suit = "";
    type = "";
    pointValue = 0;
    altPointValue = 0;

    constructor(suit, type, value, altValue = 0) {
        this.suit = suit;
        this.type = type;
        this.pointValue = value;
        this.altPointValue = altValue ?? value;
    }

}

class Deck {

    suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
    cardTypes = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
    cards = [];
    topCardIndex = 0;

    constructor() {

        // Fill the card array with all needed cards
        for (const suit of this.suits) {

            for (let i = 0; i < this.cardTypes.length; i++) {

                let cardValue = 0;
                let altValue = 0;

                switch (this.cardTypes[i]) {
                    case "Ace":
                        cardValue = 11;
                        altValue = 1;
                        break;

                    case "Jack":
                    case "Queen":
                    case "King":
                        cardValue = 10;
                        break;

                    default:
                        cardValue = i + 1;
                }

                const newCard = new Card(suit, this.cardTypes[i], cardValue, altValue);

                this.cards.push(newCard);
            }

        }

    }

    // Shuffle the cards using the Fisher-Yates method
    shuffle() {

        for (let i = this.cards.length - 1; i >= 0; i--) {

            const randomIndex = Math.floor(Math.random() * this.cards.length);

            const card1 = this.cards[i];
            const card2 = this.cards[randomIndex];

            this.cards[randomIndex] = card1;
            this.cards[i] = card2;
        }

    }

    // Draw only a single card
    drawOne() {
        const drawnCard = this.cards[this.topCardIndex];

        this.topCardIndex++;

        return drawnCard;
    }

    // Draw several cards at once
    drawMultiple(amount) {
        const drawnCards = [];

        for (let i = 0; i < amount; i++) {
            drawnCards.push(this.drawOne());
        }

        return drawnCards;
    }

    reset() {
        this.topCardIndex = 0;
    }

}

class Hand {

    cards = [];

    addOneCard(card) {

        // Don't add anything that isn't a proper card
        if (!card instanceof Card) {
            return;
        }

        this.cards.push(card);
    }

    addMultipleCards(cards) {

        // Only accept arrays
        if (!cards instanceof Array) {
            return;
        }

        for (const card of cards) {
            this.addOneCard(card);
        }
    }

    getTotal() {

        let total = 0;
        let aceBuffer = [];

        for (const card of this.cards) {

            // Store any aces separately for later counting
            if (card.type === "Ace") {
                aceBuffer.push(card);
                continue;
            }

            total += card.pointValue;

        }

        // Calculate aces if needed
        if (aceBuffer.length > 0) {

            for (const ace of aceBuffer) {

                if ((total + ace.pointValue) > 21) {

                    total += ace.altPointValue;

                } else {
                    total += ace.pointValue;
                }
            }
        }

        return total;
    }

    reset() {
        this.cards = [];
    }

}

const deck = new Deck();
const playerHand = new Hand();
const dealerHand = new Hand();

let dealerWins = 0;
let playerWins = 0;

newGame();

function newGame() {
    console.log("Starting new game...");

    deck.reset();
    playerHand.reset();
    dealerHand.reset();

    deck.shuffle();

    playerHand.addMultipleCards(deck.drawMultiple(2));
    console.log(`The player drew the ${getCardString(playerHand.cards[0])} and the ${getCardString(playerHand.cards[1])}.`);
    console.log(`The player's total is ${playerHand.getTotal()}`);

    dealerHand.addMultipleCards(deck.drawMultiple(2));
    console.log(`The dealer drew the ${getCardString(dealerHand.cards[0])} and the ${getCardString(dealerHand.cards[1])}.`);
    console.log(`The dealer's total is ${dealerHand.getTotal()}`);

    if (dealerHand.getTotal() === 21) {
        console.log("Dealer got Blackjack!");
        console.log("Dealer wins");
        dealerWins++;
        gameOver();
    } else if (playerHand.getTotal() === 21) {
        console.log("Player got Blackjack!");
        console.log("Player wins");
        playerWins++;
        gameOver();
    } else {
        console.log("\n");
        console.log("Player's turn");

        rl.question("Hit or stand? (1 = hit, 2 = stand): ", playerTurn);
    }

}

function getCardString(card) {
    return `${card.type} of ${card.suit}`;
}

function playerTurn(input) {

    if (input === "1") {

        const card = deck.drawOne();
        playerHand.addOneCard(card);

        console.log(`Player drew the ${getCardString(card)}`);
        console.log(`Player's total is ${playerHand.getTotal()}`);
        console.log(`Dealer's total is ${dealerHand.getTotal()}`);

        if (playerHand.getTotal() > 21) {
            console.log("Player went bust!");
            console.log("Dealer wins");
            dealerWins++;
            gameOver();
        } else {
            rl.question("Hit or stand? (1 = hit, 2 = stand): ", playerTurn);
        }

    } else {
        console.log("Player stands");
        console.log("\n");
        console.log("Dealer's turn");
        dealerTurn();
    }

}

function dealerTurn() {
    console.log(`Dealer's total is ${dealerHand.getTotal()}`);

    if (dealerHand.getTotal() > 17) {
        console.log("Dealer stands");
        showdown();
    } else if (dealerHand.getTotal() === 17) {

        const coinFlip = Math.round(Math.random());

        if (coinFlip) {
            const card = deck.drawOne();
            dealerHand.addOneCard(card);
            console.log(`Dealer drew the ${getCardString(card)}`);
            console.log(`Dealer's total is ${dealerHand.getTotal()}`);
        }

        if (dealerHand.getTotal() > 21) {
            console.log("Dealer went bust!");
            console.log("Player wins");
            playerWins++;
            gameOver();
        } else {
            console.log("Dealer stands");
            showdown();
        }

    } else {

        while (dealerHand.getTotal() < 17) {
            const card = deck.drawOne();
            dealerHand.addOneCard(card);
            console.log(`Dealer drew the ${getCardString(card)}`);
            console.log(`Dealer's total is ${dealerHand.getTotal()}`);
        }

        if (dealerHand.getTotal() > 21) {
            console.log("Dealer went bust!");
            console.log("Player wins");
            playerWins++;
            gameOver();
        } else {
            console.log("Dealer stands");
            showdown();
        }

    }
}

function showdown() {

    console.log("\n");
    console.log("Showdown!");
    console.log(`Player's total is ${playerHand.getTotal()}`);
    console.log(`Dealer's total is ${dealerHand.getTotal()}`);

    if (playerHand.getTotal() > dealerHand.getTotal()) {
        console.log("Player wins");
        playerWins++;
        gameOver();
    } else {
        console.log("Dealer wins");
        dealerWins++;
        gameOver();
    }

}

function gameOver() {

    console.log("\n");
    console.log(`Player wins: ${playerWins}`);
    console.log(`Dealer wins: ${dealerWins}`);

    rl.question("Start new game? (1 = yes, 2 = no): ", answer => {

        if (answer === "1") {
            newGame();
        } else {
            rl.close();
        }

    })

}

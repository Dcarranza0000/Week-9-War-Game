class Deck {
  constructor() {
      this.deck = [];
      this.ranks = [
          '2', '3', '4', '5', '6', '7', '8', '9', '10',
          'J', 'Q', 'K', 'A'
      ];
      this.suits = ["♠️", "❤️", "🔷", "♣️"];
  }

  createDeck() {
      for (let i = 0; i < this.suits.length; i++) {
          for (let j = 0; j < this.ranks.length; j++) {
              let card = {
                  name: `${this.ranks[j]} ${this.suits[i]}`,
                  value: j + 2, // Use j + 2 to represent 2 to 14 (Ace)
                  getName() {
                      return this.name;
                  }
              };
              this.deck.push(card);
          }
      }
  }

  shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
  }

  dealHalf() {
      return this.deck.splice(0, 26);
  }
}

class Player {
  constructor(name, hand) {
      this.name = name;
      this.hand = hand;
      this.score = 0;
  }

  playCard() {
      return this.hand.shift();
  }

  addPoint() {
      this.score++;
  }
}

class WarGame {
  constructor() {
      const deck = new Deck();
      deck.createDeck();
      deck.shuffleDeck();

      const half1 = deck.dealHalf();
      const half2 = deck.deck; // remaining 26 cards

      this.player1 = new Player("Player 1", half1);
      this.player2 = new Player("Player 2", half2);
  }

  playGame() {
      for (let i = 0; i < 26; i++) {
          const card1 = this.player1.playCard();
          const card2 = this.player2.playCard();

          console.log(`\nRound ${i + 1}:`);
          console.log(`${this.player1.name} plays: ${card1.getName()}`);
          console.log(`${this.player2.name} plays: ${card2.getName()}`);

          if (card1.value > card2.value) {
              this.player1.addPoint();
              console.log(`${this.player1.name} wins the round!`);
          } else if (card2.value > card1.value) {
              this.player2.addPoint();
              console.log(`${this.player2.name} wins the round!`);
          } else {
              console.log("It's a tie. No points awarded.");
          }
      }

      this.displayResults();
  }

  displayResults() {
      console.log("\n--- Final Scores ---");
      console.log(`${this.player1.name}: ${this.player1.score}`);
      console.log(`${this.player2.name}: ${this.player2.score}`);

      if (this.player1.score > this.player2.score) {
          console.log(`${this.player1.name} wins the game! 🏆`);
      } else if (this.player2.score > this.player1.score) {
          console.log(`${this.player2.name} wins the game! 🏆`);
      } else {
          console.log("It's a tie game!");
      }
  }
}



const game = new WarGame();
game.playGame();

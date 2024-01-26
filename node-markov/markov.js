class MarkovMachine {
  // Constructor function to initialize the MarkovMachine
  constructor(text) {
    // Splits the input text into words and remove empty strings
    const words = text.split(/[ \r\n]+/).filter(c => c !== "");
    // Stores the words in the MarkovMachine instance
    this.words = words;
    // Calls the makeChains method to create Markov chains
    this.makeChains();
  }

  // Function to create Markov chains
  makeChains() {
    // Initializes an empty object to store chains
    this.chains = {};
    // Iterates through the words in the input text
    for (let i = 0; i < this.words.length - 1; i++) {
      // Gets the current word
      const word = this.words[i];
      // Gets the next word
      const nextWord = this.words[i + 1];
      // If the word is not in the chains, create an empty array for it
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      // Adds the next word to the array of possible next words
      this.chains[word].push(nextWord);
    }
    // Handles the last word in the text
    const lastWord = this.words[this.words.length - 1];
    // Sets the last word's chain to [null] to indicate the end of text
    this.chains[lastWord] = [null];
  }

  // Function to get a random word from an array
  getRandomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Function to generate random text
  makeText(numWords = 100) {
    // Finds suitable starting words
    const startWords = Object.keys(this.chains).filter(word => {
      // Starts with a capitalized word or a word that starts a sentence
      return /^[A-Z]/.test(word) || word.endsWith('.');
    });

    // If there are no suitable start words, start with any word
    if (startWords.length === 0) {
      startWords.push(this.getRandomWord(Object.keys(this.chains)));
    }

    // Initializes variables for currentWord and the generated text
    let currentWord = this.getRandomWord(startWords);
    let text = currentWord;

    // Generates text until the desired number of words or until encountering null (end of chain)
    while (text.split(' ').length < numWords) {
      // Gets a random next word from the possible next words
      const nextWord = this.getRandomWord(this.chains[currentWord]);
      // If nextWord is null, end the chain
      if (nextWord === null) {
        break;
      }
      // Appends the nextWord to the generated text
      text += ` ${nextWord}`;
      // Updates currentWord
      currentWord = nextWord;
    }

    // Ensures the generated text ends with a period
    if (!text.endsWith('.')) {
      text += '.';
    }

    // Returns the generated text
    return text;
  }
}

// Exports the MarkovMachine class
module.exports = MarkovMachine;

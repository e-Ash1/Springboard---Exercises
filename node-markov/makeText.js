// Import modules
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

// Defines a function to read the content of a file
async function readFile(filePath) {
  try {
    // Reads the content of the file at filePath
    const data = await fs.promises.readFile(filePath, 'utf8');
    // Returns the content as a string
    return data;
  } catch (err) {
    // Handles any errors and reject the promise if there's an issue
    throw new Error(err.message);
  }
}

// Defines a function to read content from a URL
async function readUrl(url) {
  try {
    // Makes an HTTP GET request to the URL
    const response = await axios.get(url);
    // Retrieves the response data
    const responseData = response.data;
    // Returns the response data as a string
    return responseData;
  } catch (err) {
    // Handles any errors and reject the promise if there's an issue
    throw new Error(err.message);
  }
}

// Defines a function to generate and print text
async function generateText(input) {
  try {
    let text;
    // Determines if the input starts with 'http://' or 'https://':
    if (input.startsWith('http://') || input.startsWith('https://')) {
      // Reads content from the provided URL using readUrl
      text = await readUrl(input);
    } else {
      // Otherwise, read content from the provided file path using readFile
      text = await readFile(input);
    }

    // Creates a MarkovMachine instance using the retrieved "text"
    const markovMachine = new MarkovMachine(text);
    // Generates random text from the MarkovMachine
    const generatedText = markovMachine.makeText();
    // Prints the generated text
    console.log(generatedText);
  } catch (err) {
    // Handles any errors and display an error message
    console.error('Error:', err.message);
  }
}

// Checks if the script was called with the correct number of arguments
if (process.argv.length !== 3) {
  // Displays an error message indicating the correct usage
  console.error('Usage: node makeText.js <file_path_or_url>');
  // Exits the script with an error code
  process.exit(1);
}

// Gets the user-provided input (file path or URL) from command-line arguments
const input = process.argv[2];

// Calls the generateText function with the user-provided input
generateText(input);

const fs = require('fs').promises; // Using promises for file operations
const axios = require('axios');


async function cat(path) {
  try {
    // Attempt to read the file at 'path' using fs.promises.readFile
    const data = await fs.readFile(path, 'utf8');
    // If successful, return the file's content as a string
    return data;
  } catch (err) {
    // If an error occurs, throw an error indicating the problem
    throw new Error(`Error reading ${path}: ${err}`);
  }
}


async function catWrite(path, filename) {
  try {
    // Call cat(path) to read the file at 'path'
    const data = await cat(path);
    // Attempt to write the content to 'filename' using fs.promises.writeFile
    await fs.writeFile(filename, data);
    // If successful, print a success message indicating the write operation
    console.log(`Data from ${path} written to ${filename}`);
  } catch (err) {
    // If an error occurs during either reading or writing, log the error
    console.error(err);
  }
}


async function webCat(url) {
  try {
    // Attempt to make an HTTP GET request to 'url' using axios
    const resp = await axios.get(url);
    // If successful, return the response data
    return resp.data;
  } catch (err) {
    // If an error occurs during the request, throw an error indicating the problem
    throw new Error(`Error fetching ${url}: ${err}`);
  }
}

async function webCatWrite(url, filename) {
  try {
    // Call webCat(url) to make an HTTP GET request and get the response data
    const data = await webCat(url);
    // Attempt to write the response data to 'filename' using fs.promises.writeFile
    await fs.writeFile(filename, data);
    // If successful, print a success message indicating the write operation
    console.log(`Data from ${url} written to ${filename}`);
  } catch (err) {
    // If an error occurs during either the HTTP request or writing, log the error
    console.error(err);
  }
}


async function main() {
  // Get command-line arguments using process.argv
  const args = process.argv.slice(2);

  // Check if the number of arguments is less than 1 and print usage instructions if so
  if (args.length < 1) {
    console.error('Usage: node step3.js [--out output-filename.txt] readfile-or-url [...]');
    process.exit(1);
  }

  // Initialize 'outputFilename' as null
  let outputFilename = null;

  // If the first argument is '--out':
  if (args[0] === '--out') {
    // Check if the number of arguments is less than 3 and print usage instructions if so
    if (args.length < 3) {
      console.error('Usage: node step3.js [--out output-filename.txt] readfile-or-url [...]');
      process.exit(1);
    }
    // Set 'outputFilename' to the second argument
    outputFilename = args[1];
    // Remove the '--out' and filename arguments from the argument list
    args.splice(0, 2);
  }

  // Iterate through the remaining arguments:
  for (const arg of args) {
    // If the argument starts with 'http':
    if (arg.startsWith('http')) {
      // If 'outputFilename' is set, call webCatWrite(arg, outputFilename)
      if (outputFilename) {
        await webCatWrite(arg, outputFilename);
      } else {
        // Otherwise, print the result of webCat(arg)
        console.log(await webCat(arg));
      }
    } else {
      // If the argument is a file path:
      // If 'outputFilename' is set, call catWrite(arg, outputFilename)
      if (outputFilename) {
        await catWrite(arg, outputFilename);
      } else {
        // Otherwise, print the result of cat(arg)
        console.log(await cat(arg));
      }
    }
  }
}

// Call the main() function to start the script.
main();

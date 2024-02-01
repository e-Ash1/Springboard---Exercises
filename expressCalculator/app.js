// Import Library:
const express = require('express');
const fs = require('fs');
const path = require('path');
// Imports statistical operations from a separate module:
const { calculateMean, calculateMedian, calculateMode } = require('./stats');
const app = express();

// Function to parse and validate query parameters for statistical calculations:
const parseQueryNums = (query) => {
  // If no numbers are provided, throw an error indicating nums are required
  if (!query.nums) {
    throw new Error('nums are required');
  }
  // Split the nums query parameter into an array and parse each to a float:
  const numStrs = query.nums.split(',');
  const nums = numStrs.map((numStr) => {
    const num = parseFloat(numStr);
    // If any value is not a number, throw an error indicating the invalid input
    if (isNaN(num)) {
      throw new Error(`${numStr} is not a number`);
    }
    return num;
  });
  return nums;
};

// Function to write the result of a statistical operation to a file
const writeResultToFile = (operation, result) => {
  // Defines the path and structure for the results file
  const resultsPath = path.join(__dirname, 'results.json');
  const timestamp = new Date().toISOString();
  const data = { operation, result, timestamp };

  // Reads the existing results file, parses it, adds the new data, and writes back
  fs.readFile(resultsPath, (err, content) => {
    let results = [];
    if (!err) {
      results = JSON.parse(content.toString() || "[]");
    }
    results.push(data);
    fs.writeFile(resultsPath, JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      }
    });
  });
};

// Routes for Statistical Operations:
app.get('/mean', (req, res) => {
  // Trys to calculate the mean; if an error occurs, catch it and send a 400 response
  try {
    const nums = parseQueryNums(req.query);
    const mean = calculateMean(nums);
    // If save query parameter is true, write the result to a file
    if (req.query.save === 'true') {
      writeResultToFile('mean', mean);
    }
    // Checks if client accepts HTML, if so, respond with HTML, else respond with JSON
    if (req.accepts('html')) {
      res.send(`<html><body>${operation}: ${result}</body></html>`);
    } else {
      res.json({ response: { operation, value: result } });
    }

    // Sends the mean result as a JSON response
    res.json({ response: { operation: 'mean', value: mean } });
  } catch (error) {
    res.status(400).send(error.message);
  }
});



app.get('/median', (req, res) => {
  // Trys to calculate the mean; if an error occurs, catch it and send a 400 response
  try {
    const nums = parseQueryNums(req.query);
    const median = calculateMean(nums);
    // If save query parameter is true, write the result to a file
    if (req.query.save === 'true') {
      writeResultToFile('mean', mean);
    }
    // Checks if client accepts HTML, if so, respond with HTML, else respond with JSON
    if (req.accepts('html')) {
      res.send(`<html><body>${operation}: ${result}</body></html>`);
    } else {
      res.json({ response: { operation, value: result } });
    }


    // Sends the median result as a JSON response
    res.json({ response: { operation: 'median', value: median } });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/mode', (req, res) => {
  // Trys to calculate the mean; if an error occurs, catch it and send a 400 response
  try {
    const nums = parseQueryNums(req.query);
    const mode = calculateMean(nums);
    // If save query parameter is true, write the result to a file
    if (req.query.save === 'true') {
      writeResultToFile('mode', mode);
    }
    // Checks if client accepts HTML, if so, respond with HTML, else respond with JSON
    if (req.accepts('html')) {
      res.send(`<html><body>${operation}: ${result}</body></html>`);
    } else {
      res.json({ response: { operation, value: result } });
    }

    // Sends the mode result as a JSON response
    res.json({ response: { operation: 'mode', value: mode } });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Handles the requests to perform all statistical operations at once:
app.get('/all', (req, res) => {
  try {
    const nums = parseQueryNums(req.query);
    const mean = calculateMean(nums);
    const median = calculateMedian(nums);
    const mode = calculateMode(nums);

    // Saves the results to a file if 'save' query parameter is true
    if (req.query.save === 'true') {
      writeResultToFile('all', { mean, median, mode });
    }

    // Returns results in JSON format
    res.json({ response: { operation: "all", mean, median, mode } });
  } catch (error) {
    res.status(400).send(error.message);
  }
  // Checks if client accepts HTML, if so, respond with HTML, else respond with JSON
    if (req.accepts('html')) {
      res.send(`<html><body>${operation}: ${result}</body></html>`);
    } else {
      res.json({ response: { operation, value: result } });
    }


});

// Sets up the server to listen on a port and starts accepting requests
function hookPort() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

//Calls upon the server-start function to initiate server on port:
hookPort();

// Exports the app for testing purposes:
module.exports = app;

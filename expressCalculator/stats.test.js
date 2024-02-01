// Imports the modules for testing:
const request = require('supertest'); //JS Super Library that includes: jest, mocha, chia, etc...
const app = require('./app');

// Describe the group of tests related to statistical operations
describe('Statistical operations', () => {
  // Test for the mean calculation
  test('GET /mean should calculate mean', async () => {
    
    const response = await request(app).get('/mean?nums=1,2,3,4');
      expect(response.statusCode).toBe(200);
      expect(response.body.response.value).toBe(2.5);
      // Make a GET request to the /mean endpoint and assert the response
  });

  // Test for the median calculation
  test('GET /median should calculate median', async () => {
    
    const response = await request(app).get('/median?nums=1,2,3,4,5');
      expect(response.statusCode).toBe(200);
      expect(response.body.response.value).toBe(3);
    // Make a GET request to the /median endpoint and assert the response
  });

  // Test for the mode calculation
  test('GET /mode should calculate mode', async () => {
    
    const response = await request(app).get('/mode?nums=1,2,2,3');
      expect(response.statusCode).toBe(200);
      expect(response.body.response.value).toEqual(2);
    // Make a GET request to the /mode endpoint and assert the response
  });

// Test for the /all route
  test('GET /all should calculate mean, median, and mode', async () => {
    
    const response = await request(app).get('/all?nums=1,2,3,4,5');
      expect(response.statusCode).toBe(200);
      expect(response.body.response).toHaveProperty('mean');
      expect(response.body.response).toHaveProperty('median');
      expect(response.body.response).toHaveProperty('mode');
      expect(response.body.response.mean).toBe(3);
      expect(response.body.response.median).toBe(3);
      expect(response.body.response.mode).toEqual([1, 2, 3, 4, 5]); 
  });

  // Test for file saving functionality
  test('GET /mean with save should write to file', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,4,5&save=true');
      expect(response.statusCode).toBe(200);

    // Assuming the file is written synchronously
    const resultsPath = path.join(__dirname, '../results.json');
    const data = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    // Check if the file contains the expected data
    const lastEntry = data[data.length - 1];
      expect(lastEntry.operation).toBe('mean');
      expect(lastEntry.result).toBe(3);

  });
});

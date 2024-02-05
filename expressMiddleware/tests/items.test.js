// Import necessary libraries
const request = require('supertest'); // Import Supertest for making HTTP requests in tests
const app = require('../app'); // Import the Express app

// Describe the group of tests related to the Items API
describe('Items API', () => {
  // Define a test item that will be used across different tests
  let testItem = { name: 'Test Popsicle', price: 1.99 }; // Setup initial test item data

  // Test case for retrieving all items
  it('should list all items on GET /items', async () => {
    // Make a GET request to /items endpoint
    const response = await request(app).get('/items');
    // Assert that the HTTP response status code is 200
    expect(response.statusCode).toBe(200);
    // Assert that the response body is an array (regardless of its contents)
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test case for adding a new item
  it('should add an item on POST /items', async () => {
    // Make a POST request to /items endpoint, sending testItem as the body
    const response = await request(app)
      .post('/items')
      .send(testItem)
      .set('Accept', 'application/json'); // Ensure the request sends JSON
    // Assert that the HTTP response status code is 201 (Created)
    expect(response.statusCode).toBe(201);
    // Assert that the response body indicates the item was added correctly
    expect(response.body.added).toEqual(testItem);
  });

  // Test case for retrieving a specific item by name
  it('should retrieve an item on GET /items/:name', async () => {
    // Make a GET request to /items endpoint with the name of the test item
    const response = await request(app).get(`/items/${testItem.name}`);
    // Assert that the HTTP response status code is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Assert that the response body matches the test item
    expect(response.body).toEqual(testItem);
  });

  // Test case for updating an existing item
  it('should update an item on PATCH /items/:name', async () => {
    // Define updated item data
    const updatedItem = { name: 'Test Popsicle', price: 2.99 };
    // Make a PATCH request to /items endpoint with the name of the test item, sending updated data
    const response = await request(app)
      .patch(`/items/${testItem.name}`)
      .send(updatedItem);
    // Assert that the HTTP response status code is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Assert that the response body indicates the item was updated correctly
    expect(response.body.updated).toEqual(updatedItem);
    // Update testItem variable to reflect the changes for consistency in subsequent tests
    testItem = updatedItem;
  });

  // Test case for deleting an item
  it('should delete an item on DELETE /items/:name', async () => {
    // Make a DELETE request to /items endpoint with the name of the test item
    const response = await request(app).delete(`/items/${testItem.name}`);
    // Assert that the HTTP response status code is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Assert that the response body indicates the item was successfully deleted
    expect(response.body).toEqual({ message: "Deleted" });
  });
});

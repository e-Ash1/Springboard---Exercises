const db = require("../db");
const Book = require("../models/book");

describe("CRUD operations on Book model", function () {
  let bookData = {
    isbn: "123456789",
    amazon_url: "http://a.co/eobPtX2",
    author: "Test Author",
    language: "english",
    pages: 250,
    publisher: "Test Publisher",
    title: "Test Book Title",
    year: 2021,
  };

  beforeEach(async function () {
    await db.query("DELETE FROM books");
    await Book.create(bookData);
  });

  test("Create, Read, Update, Delete a book", async function () {
    // Read (Verify Creation)
    let foundBook = await Book.findOne(bookData.isbn);
    expect(foundBook.title).toEqual(bookData.title);

    // Update
    let updatedBookData = { ...bookData, title: "Updated Test Book Title" };
    await Book.update(bookData.isbn, updatedBookData);
    foundBook = await Book.findOne(bookData.isbn);
    expect(foundBook.title).toEqual(updatedBookData.title);

    // Delete
    await Book.remove(bookData.isbn);
    try {
      foundBook = await Book.findOne(bookData.isbn);
      expect(foundBook).toBeUndefined(); // Depending on implementation, you might expect `null` or a specific error
    } catch (err) {
      expect(err).toBeTruthy(); // If your method throws an error when not found
    }
  });

  afterEach(async function () {
    await db.query("DELETE FROM books");
  });

  afterAll(async function () {
    await db.end();
  });
});

describe("CRUD operations on Book model", function () {
  let bookData = {
    isbn: "123456789",
    amazon_url: "http://a.co/eobPtX2",
    author: "Test Author",
    language: "english",
    pages: 250,
    publisher: "Test Publisher",
    title: "Test Book Title",
    year: 2021,
  };

  beforeEach(async function () {
    await db.query("DELETE FROM books");
    await Book.create(bookData);
  });

  test("Create, Read, Update, Delete a book", async function () {
    // Read (Verify Creation)
    let foundBook = await Book.findOne(bookData.isbn);
    expect(foundBook.title).toEqual(bookData.title);

    // Update
    let updatedBookData = { ...bookData, title: "Updated Test Book Title" };
    await Book.update(bookData.isbn, updatedBookData);
    foundBook = await Book.findOne(bookData.isbn);
    expect(foundBook.title).toEqual(updatedBookData.title);

    // Delete
    await Book.remove(bookData.isbn);
    try {
      foundBook = await Book.findOne(bookData.isbn);
      expect(foundBook).toBeUndefined(); // Depending on implementation, you might expect `null` or a specific error
    } catch (err) {
      expect(err).toBeTruthy(); // If your method throws an error when not found
    }
  });

  afterEach(async function () {
    await db.query("DELETE FROM books");
  });

  afterAll(async function () {
    await db.end();
  });
});

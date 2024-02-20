const request = require("supertest");
const app = require("../app"); 
const db = require("../db"); 

beforeAll(async () => {
  await db.query("CREATE TABLE IF NOT EXISTS companies (code text PRIMARY KEY, name text NOT NULL, description text);");
});

beforeEach(async () => {
  await db.query("DELETE FROM companies;");
  await db.query("INSERT INTO companies (code, name, description) VALUES ('apple', 'Apple Inc.', 'Tech giant'), ('google', 'Google LLC', 'Search engine behemoth');");
});

afterAll(async () => {
  await db.query("DROP TABLE IF EXISTS companies;");
  await db.end();
});

describe("GET /companies", () => {
  test("Gets a list of companies", async () => {
    const response = await request(app).get("/companies");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("companies");
    expect(response.body.companies.length).toBe(2);
  });
});

describe("GET /companies/:code", () => {
  test("Gets a single company by code", async () => {
    const response = await request(app).get("/companies/apple");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("company");
    expect(response.body.company.code).toBe("apple");
  });

  test("Responds with 404 for non-existing company code", async () => {
    const response = await request(app).get("/companies/nonexistent");
    expect(response.statusCode).toBe(404);
  });
});


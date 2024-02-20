const request = require("supertest");
const app = require("../app"); 
const db = require("../db"); 

beforeAll(async () => {
  await db.query("CREATE TABLE IF NOT EXISTS invoices (id serial PRIMARY KEY, comp_code text NOT NULL, amt float NOT NULL, paid boolean DEFAULT false, add_date timestamp DEFAULT CURRENT_TIMESTAMP, paid_date timestamp, CONSTRAINT fk_company FOREIGN KEY(comp_code) REFERENCES companies(code));");
});

beforeEach(async () => {
  await db.query("DELETE FROM invoices;");
  await db.query("INSERT INTO invoices (comp_code, amt) VALUES ('apple', 100), ('google', 200);");
});

afterAll(async () => {
  await db.query("DROP TABLE IF EXISTS invoices;");
  await db.end();
});

describe("GET /invoices", () => {
  test("Gets a list of invoices", async () => {
    const response = await request(app).get("/invoices");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("invoices");
    expect(response.body.invoices.length).toBe(2);
  });
});

describe("GET /invoices/:id", () => {
  test("Gets a single invoice by ID", async () => {
    // Assuming '1' is a valid invoice ID. Adjust as necessary.
    const response = await request(app).get("/invoices/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("invoice");
    expect(response.body.invoice.id).toBe(1);
  });

  test("Responds with 404 for non-existing invoice ID", async () => {
    const response = await request(app).get("/invoices/9999");
    expect(response.statusCode).toBe(404);
  });
});


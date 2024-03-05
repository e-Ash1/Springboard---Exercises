"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Company = require("./company.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newCompany = {
    handle: "new",
    name: "New",
    description: "New Description",
    numEmployees: 1,
    logoUrl: "http://new.img",
  };

  test("works", async function () {
    let company = await Company.create(newCompany);
    expect(company).toEqual(newCompany);

    const result = await db.query(
      `SELECT handle, name, description, num_employees, logo_url
       FROM companies
       WHERE handle = 'new'`);
    expect(result.rows).toEqual([
      {
        handle: "new",
        name: "New",
        description: "New Description",
        num_employees: 1,
        logo_url: "http://new.img",
      },
    ]);
  });

  // Changed this test by adding the "bad request with dupe" test to check for the specific error message.
  test("bad request with dupe", async function () {
    await Company.create(newCompany); 
    await expect(Company.create(newCompany)).rejects.toThrow(BadRequestError);
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let companies = await Company.findAll();
    expect(companies).toEqual([
      // Test data based on _testCommon setup for predictability.
      expect.objectContaining({ handle: "c1", name: "C1" }),
      expect.objectContaining({ handle: "c2", name: "C2" }),
      expect.objectContaining({ handle: "c3", name: "C3" }),
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let company = await Company.get("c1");
    expect(company).toEqual(expect.objectContaining({ handle: "c1", name: "C1" }));
  });

  // Using async/await syntax with expect().rejects for consistency and clarity.
  test("not found if no such company", async function () {
    await expect(Company.get("nope")).rejects.toThrow(NotFoundError);
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    name: "New",
    description: "New Description",
    numEmployees: 10,
    logoUrl: "http://new.img",
  };

  test("works", async function () {
    await Company.update("c1", updateData);
    const result = await db.query(
      `SELECT handle, name, description, num_employees, logo_url
       FROM companies
       WHERE handle = 'c1'`);
    expect(result.rows).toEqual([
      expect.objectContaining(updateData),
    ]);
  });

  // Ensures the database reflects updates by comparing null values of the properties:
  test("works: null fields", async function () {
    const updateDataSetNulls = {
      name: "New",
      description: "New Description",
      numEmployees: null, 
      logoUrl: null,
    };

    await Company.update("c1", updateDataSetNulls);
    const result = await db.query(
      `SELECT handle, name, description, num_employees, logo_url
       FROM companies
       WHERE handle = 'c1'`);
    expect(result.rows).toEqual([
      {
        handle: "c1",
        name: "New",
        description: "New Description",
        num_employees: null, 
        logo_url: null,
      },
    ]);
  });

  test("not found if no such company", async function () {
    await expect(Company.update("nope", updateData)).rejects.toThrow(NotFoundError);
  });

  test("bad request with no data", async function () {
    await expect(Company.update("c1", {})).rejects.toThrow(BadRequestError);
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Company.remove("c1");
    const res = await db.query("SELECT handle FROM companies WHERE handle='c1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    await expect(Company.remove("nope")).rejects.toThrow(NotFoundError);
  });
});

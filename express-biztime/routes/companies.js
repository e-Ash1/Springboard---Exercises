const express = require("express");
const db = require("../db"); // Import database connection
const ExpressError = require("../expressError"); // Import custom error class
const router = new express.Router();

// GET route for listing all companies
router.get("/", async (req, res, next) => {
    try {
        // Query the database for all companies
        const results = await db.query("SELECT code, name FROM companies");
        // Return a JSON response with the companies
        return res.json({ companies: results.rows });
    } catch (err) {
        // Pass errors to the error handler
        return next(err);
    }
});

// GET route for fetching a single company by code
router.get("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        // Query the database for a company matching the code
        const companyResult = await db.query("SELECT code, name, description FROM companies WHERE code = $1", [code]);
        if (companyResult.rows.length === 0) {
            // If no company is found, throw a 404 error
            throw new ExpressError(`Company not found with code: ${code}`, 404);
        }
        // Return the company details as JSON
        return res.json({ company: companyResult.rows[0] });
    } catch (err) {
        return next(err);
    }
});

// POST route for creating a new company
router.post("/", async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        // Insert a new company into the database
        const result = await db.query(
            "INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description", 
            [code, name, description]
        );
        // Return the newly created company details
        return res.status(201).json({ company: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});

// PUT route for updating a company's details by code
router.put("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        const { name, description } = req.body;
        // Update the company details in the database
        const result = await db.query(
            "UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING code, name, description",
            [name, description, code]
        );
        if (result.rows.length === 0) {
            // If no company is found, throw a 404 error
            throw new ExpressError(`Company not found with code: ${code}`, 404);
        }
        // Return the updated company details
        return res.json({ company: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});

// DELETE route for removing a company by code
router.delete("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        // Delete the company from the database
        const result = await db.query("DELETE FROM companies WHERE code = $1 RETURNING code", [code]);
        if (result.rows.length === 0) {
            // If no company is found, throw a 404 error
            throw new ExpressError(`Company not found with code: ${code}`, 404);
        }
        // Confirm deletion
        return res.json({ status: "deleted" });
    } catch (err) {
        return next(err);
    }
});

module.exports = router; 

const express = require("express");
const db = require("../db"); // Import database connection
const ExpressError = require("../expressError"); // Import custom error class
const router = new express.Router();

// GET route for listing all invoices
router.get("/", async (req, res, next) => {
    try {
        // Query the database for all invoices
        const results = await db.query("SELECT id, comp_code FROM invoices");
        // Return a JSON response with the invoices
        return res.json({ invoices: results.rows });
    } catch (err) {
        // Pass errors to the error handler
        return next(err);
    }
});

// GET route for fetching a single invoice by ID
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        // Query the database for an invoice matching the ID
        const result = await db.query(
            "SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.code, c.name, c.description FROM invoices i JOIN companies c ON i.comp_code = c.code WHERE i.id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            // If no invoice is found, throw a 404 error
            throw new ExpressError(`Invoice not found with id: ${id}`, 404);
        }
        const invoice = result.rows[0];
        // Return the invoice details, including company info
        return res.json({ invoice: {
            id: invoice.id,
            comp_code: invoice.comp_code,
            amt: invoice.amt,
            paid: invoice.paid,
            add_date: invoice.add_date,
            paid_date: invoice.paid_date,
            company: {
                code: invoice.code,
                name: invoice.name,
                description: invoice.description
            }
        } });
    } catch (err) {
        return next(err);
    }
});

// POST route for creating a new invoice
router.post("/", async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        // Insert a new invoice into the database
        const result = await db.query(
            "INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date",
            [comp_code, amt]
        );
        // Return the newly created invoice details
        return res.status(201).json({ invoice: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});

// PUT route for updating an invoice's amount by ID
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amt, paid } = req.body;
        let paidDate = null;
        // Update the invoice amount in the database
        const result = await db.query(
            "UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING id, comp_code, amt, paid, add_date, paid_date",
            [amt, id]
        );

        const currPaidDate = currResult.rows[0].paid_date;

        if (!currPaidDate && paid) {
            paidDate = new Date();
        } else if (!paid) {
            paidDate = null
        } else {
         paidDate = currPaidDate;
        }
        if (result.rows.length === 0) {
            // If no invoice is found, throw a 404 error
            throw new ExpressError(`Invoice not found with id: ${id}`, 404);
        }
        // Return the updated invoice details
        return res.json({ invoice: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});

// DELETE route for removing an invoice by ID
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        // Delete the invoice from the database
        const result = await db.query("DELETE FROM invoices WHERE id = $1 RETURNING id", [id]);
        if (result.rows.length === 0) {
            // If no invoice is found, throw a 404 error
            throw new ExpressError(`Invoice not found with id: ${id}`, 404);
        }
        // Confirm deletion
        return res.json({ status: "deleted" });
    } catch (err) {
        return next(err);
    }
});

module.exports = router; 

const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

// GET /items
router.get('/', (req, res) => {
    const items = Item.findAll();
    res.json(items);
});

// POST /items
router.post('/', (req, res) => {
    const { name, price } = req.body;
    const item = new Item(name, price);
    item.save();
    res.status(201).json({ added: { name, price } });
});

// GET /items/:name
router.get('/:name', (req, res) => {
    const item = Item.findOne(req.params.name);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// PATCH /items/:name
router.patch('/:name', (req, res) => {
    const updatedItem = Item.update(req.params.name, req.body);
    if (updatedItem) {
        res.json({ updated: updatedItem });
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// DELETE /items/:name
router.delete('/:name', (req, res) => {
    const success = Item.delete(req.params.name);
    if (success) {
        res.json({ message: "Deleted" });
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

module.exports = router;

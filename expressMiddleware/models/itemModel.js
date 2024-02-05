const { readData, writeData } = require('../fakeDb');

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    static findAll() {
        return readData();
    }

    static findOne(name) {
        return readData().find(item => item.name === name);
    }

    save() {
        const items = readData();
        items.push(this);
        writeData(items);
    }

    static update(name, newData) {
        const items = readData();
        const itemIndex = items.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            items[itemIndex] = { ...items[itemIndex], ...newData };
            writeData(items);
            return items[itemIndex];
        }
        return null;
    }

    static delete(name) {
        let items = readData();
        const filteredItems = items.filter(item => item.name !== name);
        writeData(filteredItems);
        return items.length !== filteredItems.length;
    }
}

module.exports = Item;

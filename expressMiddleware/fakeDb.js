const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'items.json');

function readData() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };

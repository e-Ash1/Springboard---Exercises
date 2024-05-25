function twoArrayObject(arrOne, arrTwo) {
    const result = {};

    // Iterate over the keys array
    for (let i = 0; i < arrOne.length; i++) {
        // If there's a matching value, use it; otherwise, use null
        result[arrOne[i]] = i < arrTwo.length ? arrTwo[i] : null;
    }

    return result;
};

module.export = {
    twoArrayObject
};
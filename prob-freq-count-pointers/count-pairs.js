function countPairs(arr, target) {
    let count = 0;
    const seen = new Set();

    // Iterate through each number in the array
    for (let num of arr) {
        // Check if the complement (target - num) exists in the seen set
        if (seen.has(target - num)) {
            count++;
        }
        // Add the current number to the seen set
        seen.add(num);
    }

    return count;
};

module.export = {
    countPairs
};

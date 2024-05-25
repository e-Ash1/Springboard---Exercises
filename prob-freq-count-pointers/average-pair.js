function averagePair(arr, trgt) {
    // Iterate over the sorted array with 2-D iteration:
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            // Set the values for current and next values:
            const curr = arr[i];
            const next = arr[j];
            // Summate and average the pairs:
            const avg = (curr + next) / 2;
            // Conditional to determine if the avg equals the trgt:
            if (avg === trgt) {
                return true;
            }
        }
    }
    // Return false if no pair is found
    return false;
};

module.export = {
    averagePair
};



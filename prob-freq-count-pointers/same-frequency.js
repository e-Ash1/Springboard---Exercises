function sameFrequency(num1, num2) {
    // Helper function to get the count of each digit in a number
    const getDigitCount = (num) => {
        const count = {};
        // Convert number to string and iterate over each character
        for (let digit of String(num)) {
            // Increment the count of the digit in the object
            count[digit] = (count[digit] || 0) + 1;
        }
        return count;
    }

    // Get the digit counts for both numbers
    const count1 = getDigitCount(num1);
    const count2 = getDigitCount(num2);

    // Compare the length of the keys (unique digits) in both counts
    if (Object.keys(count1).length !== Object.keys(count2).length) {
        return false;
    }

    // Compare the count of each digit in both counts
    for (let key in count1) {
        if (count1[key] !== count2[key]) {
            return false;
        }
    }

    return true;
}

module.export = {
    sameFrequency
};


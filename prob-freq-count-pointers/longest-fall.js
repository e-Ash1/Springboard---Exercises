function longestFall(arr) {
    if (arr.length === 0) {
        return 0;
    }

    let longest = 1;
    let current = 1;

    // Iterate through the array starting from the second element
    for (let i = 1; i < arr.length; i++) {
        // Check if current element is less than the previous element
        if (arr[i] < arr[i - 1]) {
            current++;
        } else {
            current = 1;
        }
        // Update the longest length if current length is greater
        longest = Math.max(longest, current);
    }

    return longest;
};

module.export = {
    longestFall
};

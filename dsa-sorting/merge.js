function mergeSort(arr) {
    // Base case: if the array has less than two elements, it's already sorted
    if (arr.length < 2) {
        return arr;
    }
    // Split the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    // Recursively sort both halves and merge them
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let sorted = [];
    // Merge the two arrays by comparing the first elements of each
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }
    // Concatenate the remaining elements (if any)
    return [...sorted, ...left, ...right];
}

module.exports = { mergeSort, merge };

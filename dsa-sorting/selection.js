function selectionSort(arr) {
    // Iterate over the entire array
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        // Find the smallest element in the unsorted region
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap the found minimum element with the first unsorted element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

module.exports = selectionSort;

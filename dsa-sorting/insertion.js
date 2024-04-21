const insertionSort = (arr) => {
    for(let i = 1; i < arr.length; i++) { 
        let current = arr[i]; // Current element to be sorted
        let j = i - 1; // Index of the last element in the sorted section
        // Move elements of arr[0..i-1], that are greater than current, to one position ahead
        // of their current position
        while (j >= 0 && arr[j] > current) { 
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current; // Place the current at its correct position
    }
    return arr;
};

module.exports = insertionSort; 

function quickSort(arr) {
    // Base case: if the array has one or no elements, it's already sorted
    if (arr.length <= 1) {
        return arr;
    }
    // Select the last element as the pivot
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];

    // Divide the array into elements less than and greater than the pivot
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // Recursively sort the left and right arrays and concatenate with the pivot
    return [...quickSort(left), pivot, ...quickSort(right)];
}

module.exports = quickSort;

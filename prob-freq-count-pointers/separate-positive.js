function separatePositive(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // If left is negative and right is positive, swap them
        if (arr[left] < 0 && arr[right] > 0) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        // Move left pointer to the right if the current element is positive
        if (arr[left] > 0) {
            left++;
        }
        // Move right pointer to the left if the current element is negative
        if (arr[right] < 0) {
            right--;
        }
    }
    return arr;
}

module.export = {
    separatePositive
};

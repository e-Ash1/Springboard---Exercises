function findFloor(arr, x) {
    let low = 0;
    let high = arr.length - 1;
    let result = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === x) return arr[mid];

        if (arr[mid] < x) {
            result = arr[mid];
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}



module.exports = findFloor
function findRotationCount(arr) {
    let low = 0;
    let high = arr.length - 1;
    let n = arr.length;

    while (low <= high) {
        if (arr[low] <= arr[high]) return low; // Array is sorted
        let mid = Math.floor((low + high) / 2);
        let next = (mid + 1) % n;
        let prev = (mid - 1 + n) % n;

        if (arr[mid] <= arr[next] && arr[mid] <= arr[prev]) {
            return mid;
        } else if (arr[mid] <= arr[high]) {
            high = mid - 1;
        } else if (arr[mid] >= arr[low]) {
            low = mid + 1;
        }
    }
    return 0;
}


module.exports = findRotationCount
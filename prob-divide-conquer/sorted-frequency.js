function sortedFrequency(arr, num) {
    function findFirst(arr, num) {
        let low = 0;
        let high = arr.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (arr[mid] < num) {
                low = mid + 1;
            } else if (arr[mid] > num || (mid > 0 && arr[mid - 1] === num)) {
                high = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }

    function findLast(arr, num) {
        let low = 0;
        let high = arr.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (arr[mid] > num) {
                high = mid - 1;
            } else if (arr[mid] < num || (mid < arr.length - 1 && arr[mid + 1] === num)) {
                low = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }

    const firstIndex = findFirst(arr, num);
    if (firstIndex === -1) return -1;
    const lastIndex = findLast(arr, num);
    return lastIndex - firstIndex + 1;
}


module.exports = sortedFrequency
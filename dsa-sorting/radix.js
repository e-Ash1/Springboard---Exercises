function getDigit(number, place) {
    // Returns the digit in `number` at the `place` position
    return Math.floor(Math.abs(number) / Math.pow(10, place)) % 10;
}

function digitCount(number) {
    // Returns the count of digits in `number`
    if (number === 0) return 1;
    return Math.floor(Math.log10(Math.abs(number))) + 1;
}

function mostDigits(nums) {
    // Returns the maximum digit length from an array of numbers
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}

function radixSort(nums) {
    let maxDigitCount = mostDigits(nums);
    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({length: 10}, () => []);
        for (let i = 0; i < nums.length; i++) {
            let digit = getDigit(nums[i], k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };
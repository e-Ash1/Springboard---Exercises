// Function to calculate mean of an array of numbers:
const calculateMean = (nums) => {
  // Sums up all numbers and divides by the count of numbers
  return nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
};

// Function to calculate median of an array of numbers:
const calculateMedian = (nums) => {
  // Sorts the numbers in ascending order
  const sortedNums = [...nums].sort((a, b) => a - b);
  const midIndex = Math.floor(sortedNums.length / 2);
  // If there are an odd number of elements, return the middle one; if even, return average of two middle numbers
  return sortedNums.length % 2 !== 0
    ? sortedNums[midIndex]
    : (sortedNums[midIndex - 1] + sortedNums[midIndex]) / 2;
};

// Function to calculate mode of an array of numbers:
const calculateMode = (nums) => {
  // Uses a map to count occurrences of each number
  const numMap = {};
  let maxFreq = 0;
  let mode = [];
  nums.forEach((num) => {
    numMap[num] = (numMap[num] || 0) + 1;
    // Updates the mode if current number's frequency is higher than maxFreq
    if (numMap[num] > maxFreq) {
      maxFreq = numMap[num];
      mode = [num];
    } else if (numMap[num] === maxFreq) {
      mode.push(num);
    }
  });
  // Ensures that unique modes are returned by converting to a Set and back to an array:
  return [...new Set(mode)];
};

// Exports the calculation functions for use in other files:
module.exports = { calculateMean, calculateMedian, calculateMode };

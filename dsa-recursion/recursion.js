/** product: calculate the product of an array of numbers. */

function product(nums, index = 0) {
  // Base case: when index is out of bounds
  if (index === nums.length) return 1;
  // Recursive case: multiply current number with the product of the rest
  return nums[index] * product(nums, index + 1);
}


/** longest: return the length of the longest word in an array of words. */

function longest(words, index = 0, longestLength = 0) {
  // Base case: when index is out of bounds
  if (index === words.length) return longestLength;
  // Recursive case: check current word's length against longest found
  let currentLength = words[index].length;
  return longest(words, index + 1, Math.max(longestLength, currentLength));
}


/** everyOther: return a string with every other letter. */

function everyOther(str, index = 0) {
  // Base case: when index is out of bounds
  if (index >= str.length) return "";
  // Recursive case: add current letter and skip next
  return str[index] + everyOther(str, index + 2);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, left = 0, right = str.length - 1) {
  // Base case: when left meets or crosses right
  if (left >= right) return true;
  // Recursive case: if characters at left and right are equal, check the rest
  if (str[left] !== str[right]) return false;
  return isPalindrome(str, left + 1, right - 1);
}


/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, index = 0) {
  // Base case: when index is out of bounds
  if (index === arr.length) return -1;
  // Check if current element is the value
  if (arr[index] === val) return index;
  // Recursive case: check the next element
  return findIndex(arr, val, index + 1);
}


/** revString: return a copy of a string, but in reverse. */

function revString(str, index = str.length - 1) {
  // Base case: when index is below 0
  if (index < 0) return "";
  // Recursive case: add current character to the result of the rest
  return str[index] + revString(str, index - 1);
}


/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings = [];
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      strings.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      strings = strings.concat(gatherStrings(obj[key]));
    }
  }
  return strings;
}


/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length - 1) {
  // Base case: if range is invalid
  if (left > right) return -1;
  let mid = Math.floor((left + right) / 2);
  // Found the value
  if (arr[mid] === val) return mid;
  // Search in the left half
  if (arr[mid] > val) return binarySearch(arr, val, left, mid - 1);
  // Search in the right half
  return binarySearch(arr, val, mid + 1, right);
}


module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};

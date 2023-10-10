/*
## **hasDuplicate**

Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate
*/

function hasDuplicate(arr){
  const duplicateSet= new Set(arr);
  return duplicateSet.size===arr.length?false:true;
};

console.log(hasDuplicate([1,3,2,1])) // true
console.log(hasDuplicate(([1,5,-1,4]))) // false

function vowelCount(str){
  const vowels='aeiouAEIOU';
  const strMap= new Map();

  [...str].forEach(char=>{
      if(vowels.includes(char)){
        strMap.set(char,(strMap.get(char) || 0)+ 1);
      };
  });
  return strMap;
};

console.log(vowelCount('awesome')); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
console.log(vowelCount('Colt')); // Map { 'o' => 1 }
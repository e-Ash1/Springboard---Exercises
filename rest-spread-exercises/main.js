//findMin
/* Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.
Make sure to do this using the rest and spread operator.*/

const findMin=(...num)=>{
    return num.sort((a,b)=>a-b)[0];
};

console.log(findMin(1,4,12,-3)) // -3
console.log(findMin(1,-1)) // -1
console.log(findMin(3,1)) // 1

//mergeObjects
/* Write a function called mergeObjects that accepts two objects and returns a new object which contains 
all the keys and values of the first object and second object
*/

const mergeObjects=(objOne,objTwo)=>{
    return {...objOne, ...objTwo};
};

console.log(mergeObjects({a:1, b:2}, {c:3, d:4})) // {a:1, b:2, c:3, d:4}

//doubleAndReturnArgs
/*
Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. 
The function should return a new array with the original array values and all of additional arguments doubled.
*/

const doubleAndReturnArgs=((arr,...nums)=>{
    const doubledValues=nums.map(val=>val*=2);
    return arr.concat(...doubledValues);
});

console.log(doubleAndReturnArgs([1,2,3],4,4)) // [1,2,3,8,8]
console.log(doubleAndReturnArgs([2],10,4)) // [2, 20, 8]

//Slice and Dice!
/*
For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!

Make sure that you are always returning a new array or object and not modifying the existing inputs.
*/

const removeRandom= items =>{
    const randomNumber=Math.floor(Math.random()*items.length);
    return [...items.slice(0,randomNumber), ...items.slice(randomNumber+1)];
};


const extend = (arrOne,arrTwo) =>{
    return [...arrOne, ...arrTwo];
};

const addKevVal=(obj,key,val)=>{
    const newObj={...obj};
    newObj[key]=val;
    return newObj;
};

const removeKey=(obj,key)=>{
    const newObj={...obj};
    delete(newObj[key]);
    return newObj;
};

const combine=(objOne,objTwo)=>{
    return {...objOne, objTwo};
};

const update=(obj,key,val)=>{
    let newObj = { ...obj }
    newObj[key] = val;
    return newObj;
};
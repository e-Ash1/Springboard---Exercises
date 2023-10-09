// Convert the functional declarations, into arrow function notation:

function double(arr){
    return arr.map(function(val){
        return val*2;
    });
};

const doubleArray=[2,4,6,8];
const doubleTest=double(doubleArray);
console.log(doubleTest);

const doubleArrow=(arr)=>{
    return arr.map(val=>{
        return val*2;
    });
};

const doubleArrowArray=[3,5,7,9];
const doubleArrowTest=doubleArrow(doubleArrowArray);
console.log(doubleArrowTest);


function squareAndFindEvens(numbers){
    var squares=numbers.map(function(num){
        return num**2;
    });
    var evens = squares.filter(function(square){
        return square % 2 === 0;
      });

    return evens;
};

const squareAndFindEvensArray=[4,8,12,16];
const squareTest=squareAndFindEvens(squareAndFindEvensArray);
console.log(squareTest);

let squareAndFindEvensArrow=numbers=>{
    var squares=numbers.map(num=>{
        return num**2;
    });

    var even=squares.filter(square=>{
        return square%2==0;
    });

    return even;
};

const squareArray=[5,10,15,20];
const squareArrowTest=squareAndFindEvensArrow(squareArray);
console.log(squareArrowTest);
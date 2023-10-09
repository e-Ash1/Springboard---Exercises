/*
Write a function which generates an animal object. The function should accepts 3 arguments:

- species: the species of animal (‘cat’, ‘dog’)
- verb: a string used to name a function (‘bark’, ‘bleet’)
- noise: a string to be printed when above function is called (‘woof’, ‘baaa’)

Use one or more of the object enhancements we’ve covered.
*/



function createAnimal(species,verb,noise){
    return{
        species,
        [verb](){
            return noise;
        },
    };
};

const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
console.log(d.bark())  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
console.log(s.bleet()) //"BAAAAaaaa"
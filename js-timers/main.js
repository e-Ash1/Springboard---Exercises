/* #1: countDown:
    Write a function called countdown that accepts a number as a parameter and every 1000 milliseconds decrements the value and console.logs it. 
    Once the value is 0 it should log “DONE!” and stop. 
*/


function countDown(num, callback) {
    if (num > 0) {
      const interval = setInterval(() => {
        console.log(num);
        num--;
  
        if (num === 0) {
          clearInterval(interval);
          callback('DONE');
        }
      }, 1000);
    };
  }
  
  // Example usage:
  countDown(5, (result) => {
    console.log('Countdown is', result);
  });


  /* #2: randomGame: 
    Write a function called randomGame that selects a random number between 0 and 1 every 1000 milliseconds
    Each time that a random number is picked, add 1 to a counter.
    If the number is greater than .75, stop the timer and console.log the number of tries it took before we found a number greater than .75. 
*/

function randomGame() {
    let counter = 0;
    let randomSelect = setInterval(() => {
        const randomNumber = Math.random();
        console.log(randomNumber);
        counter++;

        if (randomNumber > 0.75) {
            clearInterval(randomSelect);
            console.log(`It took ${counter} tries to find a number greater than 0.75.`);
        }
    }, 1000);

    return randomSelect;
}

randomGame();







  
  
  
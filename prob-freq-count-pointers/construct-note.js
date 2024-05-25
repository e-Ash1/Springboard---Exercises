const constructNote = (message, letters) => {
    // Instantiate two new Maps to store character counts for message and letters:
    const messageCount = new Map();
    const lettersCount = new Map();

    // Function to count characters and populate a Map:
    const countChars = (str, map) => {
        // Split str into an array of individual characters:
        const strArray = str.split('');
        
        // Iterate over the strArray:
        for (let i = 0; i < strArray.length; i++) {
            // Create a local variable storing the value of the current character:
            const char = strArray[i];
            
            // Conditional to update the character count in map:
            if (map.has(char)) {
                map.set(char, map.get(char) + 1);
            } else {
                map.set(char, 1);
            }
        }
    };

    // Count the characters in both message and letters
    countChars(message, messageCount);
    countChars(letters, lettersCount);

    // Iterate over the entries in messageCount
    for (let [char, count] of messageCount) {
        // Check if lettersCount has enough characters
        if ((lettersCount.get(char) || 0) < count) {
            return false;
        }
    }

    return true;
};

module.export = {
    constructNote
};

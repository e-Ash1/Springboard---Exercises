function isSubsequence(str1, str2) {
    let i = 0;
    let j = 0;

    // Iterate through str2 with j
    while (i < str1.length && j < str2.length) {
        // If characters match, move i to the next character
        if (str1[i] === str2[j]) {
            i++;
        }
        // Always move j to the next character
        j++;
    }

    // If i has reached the end of str1, str1 is a subsequence of str2
    return i === str1.length;
}

module.export = {
    isSubsequence 
};
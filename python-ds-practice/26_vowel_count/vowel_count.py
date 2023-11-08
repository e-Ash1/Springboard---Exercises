def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive."""
    lowercase_phrase = phrase.lower()
    vowel_letters = ['a', 'e', 'i', 'o', 'u']
    
    letter_count = {}  # Initialize an empty dictionary to store vowel frequencies.
    for char in lowercase_phrase:  # Loop over each character in the input phrase.
        if char in vowel_letters:  # Check if the character is a vowel.
            if char in letter_count:  # Check if the vowel is already in the dictionary.
                letter_count[char] += 1  # If it is, increment the count.
            else:
                letter_count[char] = 1  # If not, add the vowel to the dictionary with a count of 1.
    return letter_count  # Return the dictionary containing the vowel frequencies.

# Function Test:
print(vowel_count('rithm school'))
print(vowel_count('HOW ARE YOU? i am great!'))

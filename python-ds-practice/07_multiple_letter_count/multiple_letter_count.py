def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase."""
    letter_count = {}  # Initialize an empty dictionary to store letter frequencies.
    for char in phrase:  # Loop over each character in the input phrase.
        if char in letter_count:  # Check if the character is already in the dictionary.
            letter_count[char] += 1  # If it is, increment the count.
        else:
            letter_count[char] = 1  # If not, add the character to the dictionary with a count of 1.
    return letter_count  # Return the dictionary containing the character frequencies.

# Test the function
print(multiple_letter_count('yay'))  # Call the function with the string 'yay' and print the result.
print(multiple_letter_count('Yay'))  # Call the function with the string 'Yay' and print the result.

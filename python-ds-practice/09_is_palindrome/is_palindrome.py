def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and forwards).
    """
    # Remove spaces and convert to lowercase
    cleaned_phrase = ''.join(phrase.split()).lower()
    # Check if the phrase is equal to its reverse
    return cleaned_phrase == cleaned_phrase[::-1]

# Example usage:
print(is_palindrome('tacocat'))  # True
print(is_palindrome('noon'))     # True
print(is_palindrome('robert'))   # False
print(is_palindrome('taco cat')) # True
print(is_palindrome('Noon'))     # True

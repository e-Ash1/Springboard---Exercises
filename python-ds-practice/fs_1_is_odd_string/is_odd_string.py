def is_odd_string(word):
    # Calculate the sum of character positions in the alphabet (a=1, b=2, etc.)
    total = sum((ord(char.lower()) - 96) for char in word)
    
    # Return True if the sum is odd, False otherwise
    return total % 2 == 1

# Test cases
print(is_odd_string('a'))       # Expected: True
print(is_odd_string('A'))       # Expected: True
print(is_odd_string('aaaa'))    # Expected: False
print(is_odd_string('AAaa'))    # Expected: False
print(is_odd_string('amazing')) # Expected: True

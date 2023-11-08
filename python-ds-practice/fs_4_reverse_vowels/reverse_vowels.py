def reverse_vowels(s):
    # Define a set of vowels for quick lookup
    vowels = set('aeiouAEIOU')
    # Convert the string to a list since strings are immutable
    s_list = list(s)
    # Initialize two pointers
    left, right = 0, len(s_list) - 1
    
    # Use two pointers to swap vowels from front and back
    while left < right:
        # Move the left pointer to the right until it points to a vowel
        if s_list[left] not in vowels:
            left += 1
            continue
        # Move the right pointer to the left until it points to a vowel
        if s_list[right] not in vowels:
            right -= 1
            continue
        # Both pointers are at vowels, so swap them
        s_list[left], s_list[right] = s_list[right], s_list[left]
        # Move both pointers towards the center
        left += 1
        right -= 1

    # Convert the list back to a string and return it
    return ''.join(s_list)

# Test cases
print(reverse_vowels("Hello!"))                     # Expected: 'Holle!'
print(reverse_vowels("Tomatoes"))                   # Expected: 'Temotaos'
print(reverse_vowels("Reverse Vowels In A String")) # Expected: 'RivArsI Vewols en e Streng'
print(reverse_vowels("aeiou"))                      # Expected: 'uoiea'
print(reverse_vowels("why try, shy fly?"))          # Expected: 'why try, shy fly?'

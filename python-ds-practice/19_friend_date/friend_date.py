def friend_date(a, b):
    """Given two friends, do they have any hobbies in common?

    - a: friend #1, a tuple of (name, age, list-of-hobbies)
    - b: same, for friend #2

    Returns True if they have any hobbies in common, False if not.
    """
    # Extract the hobbies lists from each friend tuple
    hobbies_a = a[2]
    hobbies_b = b[2]
    
    # Return True if any hobby in hobbies_a is also in hobbies_b
    return any(hobby in hobbies_b for hobby in hobbies_a)

# Test cases
elmo = ('Elmo', 5, ['hugging', 'being nice'])
sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])

print(friend_date(elmo, sauron))    # Expected: False
print(friend_date(sauron, gandalf)) # Expected: True
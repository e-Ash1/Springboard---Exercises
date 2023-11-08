def min_max_keys(d):
    # Get all keys of the dictionary
    keys = d.keys()
    
    # Find the minimum and maximum keys
    min_key = min(keys)
    max_key = max(keys)
    
    return (min_key, max_key)

# Test cases
print(min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'}))  # Expected: (1, 10)
print(min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"}))  # Expected: ('apple', 'cherry')

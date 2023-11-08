def two_oldest_ages(ages):
    # Sort the ages list in ascending order while removing duplicates by converting it to a set and back to a list
    unique_ages_sorted = sorted(set(ages))
    
    # Get the last two elements from the sorted list (which are the two oldest distinct ages)
    return tuple(unique_ages_sorted[-2:])

# Test cases
print(two_oldest_ages([1, 2, 10, 8]))     # Expected: (8, 10)
print(two_oldest_ages([6, 1, 9, 10, 4]))  # Expected: (9, 10)
print(two_oldest_ages([1, 5, 5, 2]))      # Expected: (2, 5)

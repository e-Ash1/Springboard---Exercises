def sum_pairs(nums, goal):
    """Return tuple of first pair of nums that sum to goal."""
    # Loop over the list of numbers
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            # Check if the current pair sums up to the goal
            if nums[i] + nums[j] == goal:
                return (nums[i], nums[j])
    # If no pair is found, return an empty tuple
    return ()

# Test cases
print(sum_pairs([1, 2, 2, 10], 4))      # Expected: (2, 2)
print(sum_pairs([4, 2, 10, 5, 1], 6))   # Expected: (4, 2)
print(sum_pairs([5, 1, 4, 8, 3, 2], 7)) # Expected: (4, 3)
print(sum_pairs([11, 20, 4, 2, 1, 5], 100)) # Expected: ()

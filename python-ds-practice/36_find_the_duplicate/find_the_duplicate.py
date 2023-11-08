def find_the_duplicate(nums):
    seen = set()
    for num in nums:
        # Check if num is in the set of seen numbers
        if num in seen:
            return num
        seen.add(num)
    return None

# Test cases
print(find_the_duplicate([1, 2, 1, 4, 3, 12]))  # Expected: 1
print(find_the_duplicate([6, 1, 9, 5, 3, 4, 9]))  # Expected: 9
print(find_the_duplicate([2, 1, 3, 4]) is None)  # Expected: True

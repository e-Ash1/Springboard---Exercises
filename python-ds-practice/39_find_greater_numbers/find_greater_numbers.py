def find_greater_numbers(nums):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[j] > nums[i]:
                count += 1
    return count

# Test cases
print(find_greater_numbers([1, 2, 3]))       # Expected: 3
print(find_greater_numbers([6, 1, 2, 7]))    # Expected: 4
print(find_greater_numbers([5, 4, 3, 2, 1])) # Expected: 0
print(find_greater_numbers([]))              # Expected: 0

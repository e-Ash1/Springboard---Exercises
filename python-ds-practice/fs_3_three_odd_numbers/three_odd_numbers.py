def three_odd_numbers(nums):
    # Since we're looking for three consecutive numbers, stop at the third-to-last number
    for i in range(len(nums) - 2):
        # Sum the current number and the next two
        if (nums[i] + nums[i + 1] + nums[i + 2]) % 2 == 1:
            return True
    return False

# Test cases
print(three_odd_numbers([1, 2, 3, 4, 5]))  # Expected: True
print(three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0]))  # Expected: True
print(three_odd_numbers([5, 2, 1]))  # Expected: False
print(three_odd_numbers([1, 2, 3, 3, 2]))  # Expected: False

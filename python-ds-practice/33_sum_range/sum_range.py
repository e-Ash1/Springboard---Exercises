def sum_range(nums, start=0, end=None):
    if end is None or end >= len(nums):
        end = len(nums)
    else:
        end = end + 1  # Includes end index in the sum

    # Slice the list from 'start' to the new 'end' and return the sum.
    return sum(nums[start:end])

# Test the function with the given examples.
nums = [1, 2, 3, 4]

print(sum_range(nums))        # Should return 10
print(sum_range(nums, 1))     # Should return 9
print(sum_range(nums, end=2)) # Should return 6
print(sum_range(nums, 1, 3))  # Should return 9
print(sum_range(nums, 1, 99)) # Should return 9

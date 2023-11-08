def triple_and_filter(nums):
    """Return new list of tripled nums for those nums divisible by 4.

    Return every number in list that is divisible by 4 in a new list,
    except multiplied by 3.
    """
    
    def is_divisible_by_four(num):
        return num % 4 == 0
    
    # Apply the filter function to get numbers divisible by 4
    divisible_by_four = filter(is_divisible_by_four, nums)
    
    # Apply the map function to triple the filtered numbers
    tripled = map(lambda x: x * 3, divisible_by_four)
    
    # Convert the map result (iterator) to a list
    return list(tripled)

# Test cases
print(triple_and_filter([1, 2, 3, 4]))
print(triple_and_filter([6, 8, 10, 12]))
print(triple_and_filter([1, 2]))

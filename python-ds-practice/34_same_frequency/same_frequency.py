def same_frequency(num1, num2):
    # Convert numbers to strings
    str_num1 = str(num1)
    str_num2 = str(num2)
    
    # Create dictionaries to count the frequency of each digit
    count_num1 = {}
    count_num2 = {}

    # Count the digits for num1
    for digit in str_num1:
        count_num1[digit] = count_num1.get(digit, 0) + 1

    # Count the digits for num2
    for digit in str_num2:
        count_num2[digit] = count_num2.get(digit, 0) + 1

    # Compare the dictionaries
    return count_num1 == count_num2

# Test cases
print(same_frequency(551122, 221515))  # Expected: True
print(same_frequency(321142, 3212215)) # Expected: False
print(same_frequency(1212, 2211))      # Expected: True

def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    
    output = [] #Output contianer
    num_array = range(1,num + 1) #Instantiate an array from: 1-num
    for val in num_array: #Iterate through the num_array
        if num % val == 0: #Conditional to determine if num is divisible by val of num_array
            output.append(val) #Pushes the value into the output container
    return output #Return statement 


print(find_factors(10),
find_factors(11),
find_factors(111),
find_factors(321421))
    

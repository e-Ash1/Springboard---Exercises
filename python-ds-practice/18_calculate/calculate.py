def calculate(operation, a, b, make_int=False, message='The result is'):
    # Define the operations in a dictionary mapping strings to functions
    operations = {
        'add': lambda x, y: x + y,
        'subtract': lambda x, y: x - y,
        'multiply': lambda x, y: x * y,
        'divide': lambda x, y: x / y,
    }

    # Check if the provided operation is in the dictionary
    if operation in operations:
        # Perform the operation
        result = operations[operation](a, b)
        
        # If make_int is True, convert the result to an integer
        if make_int:
            result = int(result)
        
        # Construct and return the message with the result
        return f"{message} {result}"
    else:
        # If the operation is not valid, return None
        return None


print(calculate('add', 2.5, 4))
print(calculate('subtract', 4, 1.5, make_int=True))
print(calculate('multiply', 1.5, 2))
print(calculate('divide', 10, 4, message='I got'))
print(calculate('foo', 2, 3))
        

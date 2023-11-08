def partition(lst, fn):
    # Create two lists, one for items that pass the test and one for items that fail
    passed = []
    failed = []
    
    # Go through each item in the input list
    for item in lst:
        # If the item passes the fn test, add it to the 'passed' list
        if fn(item):
            passed.append(item)
        # Otherwise, add it to the 'failed' list
        else:
            failed.append(item)
    
    # Return a list containing the 'passed' and 'failed' lists
    return [passed, failed]


def is_even(num):
     return num % 2 == 0
 
def is_string(el):
     return isinstance(el, str)
 
print(partition([1, 2, 3, 4], is_even))
print(partition(["hi", None, 6, "bye"], is_string))


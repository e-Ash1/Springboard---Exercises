def list_manipulation(lst, command, location, value=None):
    # Check if the command and location are valid
    if command not in ['add', 'remove'] or location not in ['beginning', 'end']:
        return None

    if command == 'remove':
        # Remove item from the beginning or end and return the item
        if location == 'beginning':
            return lst.pop(0) if lst else None
        else:  # location == 'end'
            return lst.pop() if lst else None

    elif command == 'add':
        # Add item at the beginning or end and return the list
        if location == 'beginning':
            lst.insert(0, value)
        else:  # location == 'end'
            lst.append(value)
        return lst

# Example usage:
lst = [1, 2, 3]

# Remove from end
print(list_manipulation(lst, 'remove', 'end'))  # Output: 3

# Remove from beginning
print(list_manipulation(lst, 'remove', 'beginning'))  # Output: 1

# Current list state
print(lst)  # Output: [2]

# Add to beginning
print(list_manipulation(lst, 'add', 'beginning', 20))  # Output: [20, 2]

# Add to end
print(list_manipulation(lst, 'add', 'end', 30))  # Output: [20, 2, 30]

# Invalid command
print(list_manipulation(lst, 'foo', 'end'))  # Output: None

# Invalid location
print(list_manipulation(lst, 'add', 'dunno'))  # Output: None

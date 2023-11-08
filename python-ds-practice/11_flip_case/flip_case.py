def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase."""
    to_swap = to_swap.lower()
    return ''.join(char.swapcase() if char.lower() == to_swap else char for char in phrase)

# Example usage:
print(flip_case('Aaaahhh', 'a'))  # Output: aAAAhhh
print(flip_case('Aaaahhh', 'A'))  # Output: aAAAhhh
print(flip_case('Aaaahhh', 'h'))  # Output: AaaaHHH

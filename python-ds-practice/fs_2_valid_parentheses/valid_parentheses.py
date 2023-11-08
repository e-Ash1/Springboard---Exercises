def valid_parentheses(parens):
    stack = []

    for char in parens:
        if char == '(':
            stack.append(char)
        elif char == ')':
            if not stack:
                return False  # Stack is empty, no matching opening parenthesis
            stack.pop()

    return not stack  # Stack should be empty if parentheses are validly balanced

# Test cases
print(valid_parentheses("()"))      # Expected: True
print(valid_parentheses("()()"))    # Expected: True
print(valid_parentheses("(()())"))  # Expected: True
print(valid_parentheses(")()"))     # Expected: False
print(valid_parentheses("())"))     # Expected: False
print(valid_parentheses("((())"))   # Expected: False
print(valid_parentheses(")()("))    # Expected: False

def sum_up_diagonals(matrix):
    total = 0
    size = len(matrix)
    
    for i in range(size):
        total += matrix[i][i]  # Summing the TL-to-BR diagonal
        total += matrix[i][size - 1 - i]  # Summing the BL-to-TR diagonal
    
    # If the matrix has an odd size, the middle element has been added twice, once for each diagonal.
    # So we need to subtract it once to correct the total.
    if size % 2 == 1:
        middle_index = size // 2
        total -= matrix[middle_index][middle_index]
    
    return total

# Test cases
m1 = [
    [1,   2],
    [30, 40],
]
print(sum_up_diagonals(m1))  # Expected: 73

m2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
print(sum_up_diagonals(m2))  # Expected: 30

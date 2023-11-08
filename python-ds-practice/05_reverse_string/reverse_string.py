def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    
    str_list = list(phrase)
    str_list.reverse()
    return ''.join(str_list)

    
    
    
        
        
print(reverse_string('awesome'))
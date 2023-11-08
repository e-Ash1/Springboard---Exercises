"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    
    def __init__ (self,start=0):
        self.start = start
        self.current = start
    
    def generate(self):
        result = self.current
        self.current += 1
        return result
    
    def reset(self):
        self.curent = self.start
    
    def __repr__(self):
        return f"<SerialGenerator start={self.start} next={self.current + 1}>"
        
serial = SerialGenerator(start=100)

print(serial.generate())
print(serial.generate())
print(serial.generate())

print(serial.__repr__()) 


        


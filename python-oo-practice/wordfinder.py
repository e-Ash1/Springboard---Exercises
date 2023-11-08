"""Word Finder: finds random words from a dictionary."""

import random 

class WordFinder:
    
    
    def __init__(self,file_path):
        self.words = []
        with open(file_path,'r') as file:
            for line in file:
                word = line.strip()
                if word:
                    self.words.append(word)
        print (f'{len(self.words)} words read')
        
    
    def random(self):
        return random.choice(self.words)
        

wf = WordFinder("words.txt")
print(wf.random())
print(wf.random())
print(wf.random())


class SpecialWordFinder(WordFinder):
    
     def __init__(self, file_path):
        super().__init__(file_path)  # Call the constructor of the parent class
        self.words = [word for word in self.words if not word.startswith('#')]  
        print(f"{len(self.words)} words read (excluding comments)")
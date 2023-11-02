def print_upper_words(words, must_start_with):
    for word in words:
        for letter in must_start_with:
            if word.lower().startswith(letter.lower()):
                print(word.upper())
                break


print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h", "y"})
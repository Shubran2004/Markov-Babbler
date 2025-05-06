Markov Babbler :-
Reads the sample text then hashes it and starts to babble random sentences .  The likelihood of a word following the particular word is proportional to its occurence probablity .
All text file have been used from the Gutenberg Project.
Run txt_file.js to the file to modify the text files and then run main.js output will be saved in file named output.txt.

TO ADD:-
Will look into using Byte Pair Encoding to reduce the size of the map thus making code more memory efficient.
Will look into storing hashed string as json to reduce the memory used incase we are using more then a few files as I belive the amount of time and memory required to hash string and use it will become undesirable. 
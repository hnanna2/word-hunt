from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from collections import Counter
import time
import random

# all routes will belong to this app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://127.0.0.1:5500"],
    allow_origins=["https://word-hunt-site.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#get all words stored that can be recognized
words = []

with open("words.txt", "r") as file:
    for line in file:
        word = line.strip().lower()

        if len(word) >= 3:
            words.append((word, Counter(word)))

#main page endpoint
@app.get("/")
def home():
    #fastAPI auto-converts to JSON
    return {
        "mesaage": "Word Unscramble API is running! :]"
    }

#unscrambling endpoint
@app.get("/unscramble")
def unscramble(letters: str = Query(
               ...,
               min_length=3,
               max_length=9
               )
    ):
    # return {
    #         "letters received" : letters
    #     }

    #start_t = time.time()

    letters = letters.lower()
    letters = letters.strip()
    letters = "".join(c for c in letters if c.isalpha())

    results = []

    available_letters = Counter(letters)

    for word, word_counter in words:
        if len(word) > len(letters):
            continue

        if can_make_word(word_counter, available_letters):
            results.append(word)

    #sort results before returning, longest to shortest
    results.sort(key=len, reverse=True)

    #end_t = time.time()

    return {
            "letters received" : letters,
            "words found" : results,
            #"time taken" : end_t - start_t
        }

#unscrambling helper
def can_make_word(word_counter, available_letters):
    #available_letters = Counter(letters)
    #needed_letters = Counter(word)

    for letter in word_counter:
        if word_counter[letter] > available_letters[letter]:
            return False
    return True

@app.get("/dictionary")
def dictionary():
    return {
        "num of words" : len(words),
        "first words": [word[0] for word in words[:5]]
    }

#adding game mode
@app.get("/game")
def game():
    nine_letter_words = [
        word for word, word_counter in words
        if len(word) == 9
    ]

    answer_word = random.choice(nine_letter_words)

    #letters = answer_word -> shuffle the letters
    letters = "".join(random.sample(answer_word, len(answer_word)))

    possible_words = []

    available_letters = Counter(answer_word)

    for word, word_counter in words:
        if len(word) > len(answer_word):
            continue
        if can_make_word(word_counter, available_letters):
            possible_words.append(word)

    possible_words.sort(key=len, reverse=True)

    groups = {}

    for word in possible_words:
        length = str(len(word))

        if length not in groups:
            groups[length] = []

        groups[length].append(word)

    counts = {}

    for word in possible_words:
        length = str(len(word))

        if length not in counts:
            counts[length] = 0
        counts[length] += 1

    for length in groups:
        groups[length].sort()

    return {
        "letters": letters,
        "counts": counts,
        "answers": groups
    }
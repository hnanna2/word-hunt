# Word Hunt
  This is a website inspired from the scrambled letter game on "8 out of 10 cats does Countdown".

website: https://word-hunt-site.onrender.com/index.html

* If it isn't loading a game, give the website a minute. The API is reactivating.

## Components
- Self-made API to handle scrambling and unscrambling
- Self-made html, css, and js made frontend
- word library = enable1.txt from norvig

## External Sources
- both API and site hosted on Render

## Features

### Word Hunt Game
  Provided a scrambled 9 letter word, find words of length 3-9 from the letters. 
  The site will show all possible words stored in its library and pull and compare from there.
  The user can guess as much as they can think of, being awarded 1:1 ration of points to letters in their correct guesses.
  When the user gives up, all words that they missed will become visible.

### Word Unscrambler
  The user can provide between 3 and 9 letters into the site, the site will provide all combinations of letters that map to words in its dictionary grouped alphabetically and by length.

## Testing and Terminal Commands
When testing locally, follow below directions:

To install uvicorn: python3 -m pip fastapi uvicorn
To start the FastAPI backend: python3 -m uvicorn main:app --reload
- the API will run on http://127.0.0.1:800, where you can then test the end points
  - https://127.0.0.1:8000/
  - https://127.0.0.1:8000/game
  - https://127.0.0.1:8000/unscrammble?letters=triangle (replace triangle with an up to 9 letter word of your choice)
- Keep this terminal running to test the frontend

To run the site: python3 -m http.server 5500 --bind 127.0.0.1
- the website will be at https://127.0.0.1:5500/, where you can access
  - https://127.0.0.1:5500/index.html
  - https://127.0.0.1:5500/game.html
  - https://127.0.0.1:5500/solver.html

Local test should use https://127.0.0.1:8000/game and https://127.0.0.1:8000/unscrammble?letters=${letters}.
When deploying swith to https://word-hunt-api.onrender.com/game and https://word-hunt-api.onrender.com/unscramble?letters=${letter}.
To stop local servers press ctrl + c.

## Personal Notes
  If you happen upon this, have fun! :]

## Updates to be made
- increased user interactive and aesthetic UI
- increase size and practicality of the library of words

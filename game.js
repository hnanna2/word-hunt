let answers = [];
let foundWords = [];
let score = 0;

async function loadGame() {
    // const response = await fetch("http://127.0.0.1:8000/game");
    const response = await fetch("https://word-hunt-api.onrender.com/game");

    const data = await response.json();

    //answers = data.answers;
    answers = Object.values(data.answers).flat();

    // console.log(data);
    // console.log(data.answers);
    // console.log(Array.isArray(data.answers));


    document.getElementById("letters").innerText = data.letters.toUpperCase().split("").join(" ")

    let output = "";

    const lengths = Object.keys(data.counts).sort((a,b) => b - a);

    for (const length of lengths) {
        output +=
            ` <div class="word-group">
            <h3> ${length} Letters (${data.counts[length]}) </h3> <div class="word-list">`;

        for (const word of data.answers[length]) {
            output +=
            //` <div class="word-slot" id="slot-${length}-${i}"> ${"[ ]".repeat(Number(length))} </div>`;
            `<span class="word-slot" data-word="${word}">
                ${"_".repeat(Number(length))}
            </span>`;
        }

        output += `</div> </div>`;
    }

    document.getElementById("game").innerHTML = output;

    updateScore();
}

function guessWord() {
    const input = document.getElementById("guess").value.toLowerCase().trim();

    if (answers.includes(input)) {
        if (!foundWords.includes(input)) {
            // foundWords.push(input);
            foundWords.unshift(input);
            score += input.length;
            revealWord(input);
            updateFoundWords();
        }
    }

    document.getElementById("guess").value = "";

    updateScore();
}

function revealWord(word) {
    const slots = document.querySelectorAll(".word-slot");

    for (const slot of slots) {

        //const slotLength = Number(slot.id.split("-")[1]);
        
        // if (
        //     // slot.innerText.includes("[ ]") &&
        //     // slot.innerText.length === word.length
        //     slotLength === word.length && slot.innerText.includes("_")
        // ) {
        //     slot.innerText = word;

        //     break;
        // }

        if (slot.dataset.word === word) {
            slot.innerText = word;
            slot.classList.add("found");

            break;
        }
    }
}

function updateScore() {
    //document.getElementById("score").innerText = `Found: ${foundWords.length} / ${answers.length}`;
    document.getElementById("score").innerText =
        `Found: ${foundWords.length} / ${answers.length} | Score: ${score}`;
}

function updateFoundWords() {
    const foundList = document.getElementById("foundWords");

    foundList.innerHTML = "";

    for (const word of foundWords) {
        const item = document.createElement("div");
        item.className = "found-word";
        item.innerText = word;

        foundList.appendChild(item);
    }
}

function giveUp() {
    const slots = document.querySelectorAll(".word-slot");
    
    for (const slot of slots) {
        const word = slot.dataset.word;

        if (foundWords.includes(word)) {
            slot.classList.add("found");
        } else {
            slot.innerText = word;
            slot.classList.add("missed");
        }
    }

    document.getElementById("guess").disabled = true;
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    //updateScore();
}

loadGame();
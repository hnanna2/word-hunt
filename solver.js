async function unscramble() {
    const letters = document.getElementById("letters").value;

    const response = await fetch(
        // `http://127.0.0.1:8000/unscramble?letters=${letters}`
        `https://word-hunt-api.onrender.com/unscramble?letters=${letters}`
    );

    const data = await response.json();

    const words = data["words found"];

    // group by length
    const groups = {};

    for (const word of words) {
        const length = word.length;

        if (!groups[length]) {
            groups[length] = [];
        }

        groups[length].push(word);
    }

    //displaying groups
    let output = "";

    const lengths = Object.keys(groups).sort((a,b) => b - a);

    for (const length of lengths) {
        output += `<h3>Length ${length} (${groups[length].length} words)</h3>`;
        output += `<p>${groups[length].join(", ")}</p>`;
    }

    document.getElementById("results").innerHTML = output;
}
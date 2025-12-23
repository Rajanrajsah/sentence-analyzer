let chart;

const sentenceInput = document.getElementById("sentence");
const toggle = document.getElementById("themeToggle");

sentenceInput.addEventListener("input", analyzeSentence);

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

function analyzeSentence() {
    let text = sentenceInput.value;

    let lowercase = 0, uppercase = 0, digits = 0, special = 0, spaces = 0, letters = 0;

    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            lowercase++; letters++;
        } else if (char >= 'A' && char <= 'Z') {
            uppercase++; letters++;
        } else if (char >= '0' && char <= '9') {
            digits++;
        } else if (char === ' ') {
            spaces++;
        } else {
            special++;
        }
    }

    let words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    document.getElementById("lowercase").innerText = lowercase;
    document.getElementById("uppercase").innerText = uppercase;
    document.getElementById("digits").innerText = digits;
    document.getElementById("special").innerText = special;
    document.getElementById("spaces").innerText = spaces;
    document.getElementById("letters").innerText = letters;
    document.getElementById("words").innerText = words;

    updateChart(lowercase, uppercase, digits, special, spaces);
}

function exportResults() {
    let resultText = `
Sentence Analysis Report

Lowercase Letters: ${lowercase.innerText}
Uppercase Letters: ${uppercase.innerText}
Digits: ${digits.innerText}
Special Characters: ${special.innerText}
Spaces: ${spaces.innerText}
Total Letters: ${letters.innerText}
Total Words: ${words.innerText}
`;

    let blob = new Blob([resultText], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sentence-analysis.txt";
    link.click();
}

function updateChart(lowercase, uppercase, digits, special, spaces) {
    const ctx = document.getElementById("analysisChart").getContext("2d");

    if (chart) {
        chart.data.datasets[0].data = [
            lowercase,
            uppercase,
            digits,
            special,
            spaces
        ];
        chart.update();
        return;
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Lowercase",
                "Uppercase",
                "Digits",
                "Special",
                "Spaces"
            ],
            datasets: [{
                label: "Character Count",
                data: [
                    lowercase,
                    uppercase,
                    digits,
                    special,
                    spaces
                ],
                backgroundColor: [
                    "#4caf50",
                    "#2196f3",
                    "#ff9800",
                    "#f44336",
                    "#9e9e9e"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

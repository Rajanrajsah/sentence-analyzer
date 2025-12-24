const sentence = document.getElementById("sentence");
const highlightedText = document.getElementById("highlightedText");
const themeToggle = document.getElementById("themeToggle");

let chart;

/* Live analysis */
sentence.addEventListener("input", analyzeText);

function analyzeText() {
    const text = sentence.value;

    let lower = 0, upper = 0, digits = 0, special = 0, spaces = 0;
    let highlighted = "";

    for (let char of text) {
        if (/[a-z]/.test(char)) {
            lower++;
            highlighted += `<span class="lower">${char}</span>`;
        } else if (/[A-Z]/.test(char)) {
            upper++;
            highlighted += `<span class="upper">${char}</span>`;
        } else if (/[0-9]/.test(char)) {
            digits++;
            highlighted += `<span class="digit">${char}</span>`;
        } else if (char === " ") {
            spaces++;
            highlighted += `<span class="space"> </span>`;
        } else {
            special++;
            highlighted += `<span class="special">${char}</span>`;
        }
    }

    const letters = lower + upper;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    // Update UI
    document.getElementById("lowercase").textContent = lower;
    document.getElementById("uppercase").textContent = upper;
    document.getElementById("digits").textContent = digits;
    document.getElementById("special").textContent = special;
    document.getElementById("spaces").textContent = spaces;
    document.getElementById("letters").textContent = letters;
    document.getElementById("words").textContent = words;

    highlightedText.innerHTML = highlighted;

    updateChart(lower, upper, digits, special, spaces);
}

/* Chart */
function updateChart(lower, upper, digits, special, spaces) {
    const ctx = document.getElementById("analysisChart");

    if (!chart) {
        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Lowercase", "Uppercase", "Digits", "Special", "Spaces"],
                datasets: [{
                    label: "Character Count",
                    data: [lower, upper, digits, special, spaces],
                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#e67e22",
                        "#e74c3c",
                        "#95a5a6"
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
    } else {
        chart.data.datasets[0].data = [lower, upper, digits, special, spaces];
        chart.update();
    }
}

/* Export results */
function exportResults() {
    const data = `
Sentence Analyzer Report

Lowercase Letters: ${lowercase.textContent}
Uppercase Letters: ${uppercase.textContent}
Digits: ${digits.textContent}
Special Characters: ${special.textContent}
Spaces: ${spaces.textContent}
Total Letters: ${letters.textContent}
Total Words: ${words.textContent}
    `;

    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sentence-analysis.txt";
    link.click();
}

/* Dark mode */
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

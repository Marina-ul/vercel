const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

function calculator(a, op, b) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    switch (op) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'Fehler: Division durch 0';
        default: return 'Ungültiger Operator';
    }
}

async function main() {
    console.log("╔══════════════════════════════╗");
    console.log("║        Taschenrechner        ║");
    console.log("╚══════════════════════════════╝");

    while (true) {
        console.log("╔════════ Neue Rechnung ════════╗");
        const num1 = await askQuestion("║ Erste Zahl: ");
        const operator = await askQuestion("║ Operator (+, -, *, /): ");
        const num2 = await askQuestion("║ Zweite Zahl: ");
        const result = calculator(num1, operator, num2);
        console.log("╟──────────────────────────────╢");
        console.log("║ Ergebnis: " + result);
        console.log("╚══════════════════════════════╝");

        const again = await askQuestion("Noch eine Rechnung? (ja/nein): ");
        if (again.toLowerCase() !== 'ja') {
            console.log("Programm beendet. Auf Wiedersehen!");
            rl.close(); 
            break;
        }
    }
}

main(); 

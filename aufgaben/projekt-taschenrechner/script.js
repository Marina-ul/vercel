const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide (a, b) {if (b === 0) return "Division durch Null!";
    return a / b;
}

function calculator(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
        return "Ungültige Zahlen";
    }
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return "Ungültige Operator";
    }
}

function askQuestion(query) {
return new Promise(resolve =>
    readline.question(query, resolve));
}

async function main() {
    console.log("Taschenrechner");

    while (true) {
        const num1 = await askQuestion("Gib die erste zahl ein:");
        const operator = await askQuestion("Gib den Operator ein.(+,-,*,/)");
        const num2 = await askQuestion("Gib die zweite Zahl ein:");
        const result = calculator(num1, operator, num2);
        console.log("Ergebnis:", result);

        const again = await askQuestion("Noch eine Rechnung? (ja/nein):");
        if (again.toLowerCase() !== 'ja') {
            readline.close();
            break;
        }
    }
}

main();
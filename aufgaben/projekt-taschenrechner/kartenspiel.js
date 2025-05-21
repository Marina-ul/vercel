// 1.
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 2.   Farben 
const COLORS = {
    red: '\x1b[31m',      /*--------Code für rot*/
    reset: '\x1b[0m'      /*--------Zurück zur normalen Farbe*/
};

// 3. 
function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer.trim());
        });
    });
}

// 4.
function createDeck() {
    const suits = [
        { symbol: '♥', name: 'Herz', color: 'red' },
        { symbol: '♦', name: 'Karo', color: 'red' },
        { symbol: '♣', name: 'Kreuz', color: 'black' },
        { symbol: '♠', name: 'Pik', color: 'black' }
    ];
    const values = ['6', '7', '8', '9', '10', 'Bube', 'Dame', 'König', 'Ass'];
   
    // Der Deck
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit: suit.symbol, name: suit.name, value, color: suit.color });
        }
    }
    return deck;
}

// 5.
function drawCard(deck) {
    const index = Math.floor(Math.random() * deck.length);
    return deck.splice(index, 1)[0];
}

// 6.
function cardValue(value) {
    const order = ['6', '7', '8', '9', '10', 'Bube', 'Dame', 'König', 'Ass'];
    return order.indexOf(value);
}

// 7.
function getSymbol(value) {
    return {
        'Bube': 'J',
        'Dame': 'Q',
        'König': 'K',
        'Ass': 'A'
    }[value] || value;
}

// 8.
function printCard(card) {

    const val = getSymbol(card.value).padEnd(2, ' ');
    const valRight = getSymbol(card.value).padStart(2, ' ');

    const suit = card.suit;
    const color = card.color === 'red' ? COLORS.red : '';

    const lines = [
        '╔════════════════════╗',
        `║ ${val}               ${suit} ║`,
        '║                    ║',
        '║                    ║',
        `║         ${suit}          ║`,
        '║                    ║',
        '║                    ║',
        `║ ${suit}               ${valRight} ║`,
        '╚════════════════════╝'
    ];

    lines.forEach(line => {
        if (card.color === 'red') {
            console.log(COLORS.red + line + COLORS.reset);
        } else {
            console.log(line);
        }
    });
}

// 9.
async function playMultiplayer() {
    let deck = createDeck();
    let currentCard = drawCard(deck);

    const players = [
        { name: 'Spieler 1', score: 0, active: true },
        { name: 'Spieler 2', score: 0, active: true }
    ];

    let turn = 0;

    console.log("\n🎮 Willkommen zu 'Höher oder Tiefer' – 2 Spieler Edition!");
    console.log("\nStartkarte:");
    printCard(currentCard);

    // 10.
    while (deck.length > 0 && players.some(p => p.active)) {
        const player = players[turn % 2]; 

        if (!player.active) {
            turn++;
            continue;
        }

        console.log(`\n👉 ${player.name} ist am Zug!`);
        const guess = await askQuestion("Kommt eine (h)öhere oder (t)iefere Karte? (b = aufgeben): ");

        if (guess.toLowerCase() === 'b') {
            player.active = false;
            console.log(`${player.name} hat aufgegeben.`);
            turn++;
            continue;
        }

        const nextCard = drawCard(deck);
        console.log("\nGezogene Karte:");
        printCard(nextCard);

        const currentVal = cardValue(currentCard.value);
        const nextVal = cardValue(nextCard.value);

        const correct =
            (guess === 'h' && nextVal > currentVal) ||
            (guess === 't' && nextVal < currentVal);

        if (nextVal === currentVal) {
            console.log("➖ Gleichstand – keine Punkte.");
        } else if (correct) {
            player.score++;
            console.log(`✅ Richtig! ${player.name} hat jetzt ${player.score} Punkt(e).`);
            currentCard = nextCard;
        } else {
            console.log(`❌ Falsch! ${player.name} ist ausgeschieden.`);
            player.active = false;
        }

        turn++;
    }

    // 11.
    console.log("\n🎯 Spiel beendet!");
    players.forEach(p => console.log(`${p.name}: ${p.score} Punkt(e)`));

    const [p1, p2] = players;
    if (p1.score > p2.score) {
        console.log(`🏆 ${p1.name} gewinnt!`);
    } else if (p2.score > p1.score) {
        console.log(`🏆 ${p2.name} gewinnt!`);
    } else {
        console.log("🤝 Unentschieden!");
    }

    rl.close();
}

// Zum Spiel starten
playMultiplayer();

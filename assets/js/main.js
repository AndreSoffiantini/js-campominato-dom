/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco
quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. */

// Creare una funzione che al click del bottone Play generi una griglia quadrata
function generateGrid(number_of_cells, container, element_name, class_name) {
    const cellsContainer = document.querySelector(container);

    if (cellsContainer.childNodes.length > 0) {

        alert("Griglia già generata, rimuovere la precedente!");
        return;
    }

    for (let i = 1; i <= number_of_cells; i++) {
        const cell = document.createElement(element_name);
        cell.classList.add(class_name);
        cell.innerHTML = `${i}`;
        cellsContainer.append(cell);
    }
}

// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
function activateCell(selector, active_class) {
    const cells = document.querySelectorAll(selector);

    for (let index = 0; index < cells.length; index++) {
        const cell = cells[index];
        cell.addEventListener('click', function() {
            cell.classList.add(active_class);
        })
    }
}

// Leggere il valore di difficoltà inserito dall'utente e generare il corrispondente numero di caselle
const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", function() {

    let inputValue = document.getElementById("difficulty").value;

    switch (inputValue) {
        case "1":
            generateGrid(100, ".grid", "div", "cell_10");
            activateCell('.cell_10', 'selected');
            createBombs(16, 1, 100);
            break;

        case "2":
            generateGrid(81, ".grid", "div", "cell_9");
            activateCell('.cell_9', 'selected');
            createBombs(16, 1, 81);
            break;

        case "3":
            generateGrid(49, ".grid", "div", "cell_7");
            activateCell('.cell_7', 'selected');
            createBombs(16, 1, 49);
            break;

        default:
            alert("Error");
            break;
    }
});

// Aggiungere un bottone per resettare la griglia
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", function() {

    location.reload();

});


/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando:
 il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */

// Creare una funzione che generi numeri in un intervallo
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usare la funzione generatrice per creare un array di bombe
function createBombs(bombs_number, min, max) {

    let bombs = [];

    while (bombs.length < bombs_number) {

        let bomb = getRandomInteger(min, max);

        // Se una bomba è già presente nell'array non aggiungerla e generarne un'altra
        if (bombs.includes(bomb)) {
            continue;
        }

        bombs.push(bomb);
    }

    console.log(`Bombe: ${bombs}`);
    return bombs;

}
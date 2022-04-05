/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco
quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. */

// Creare una funzione che al click del bottone Play generi una griglia quadrata
/**
 * All'interno dell'elemento HTML "container" crea una griglia 
 * formata da un numero pari a "number_of_cells" 
 * di elementi del tipo "element_name"
 * e assegna a ciascuno di essi la classe "class_name".
 * Restituisce il nodo nella DOM del "container".
 * @param {number} number_of_cells 
 * @param {string} container 
 * @param {string} element_name 
 * @param {string} class_name 
 * @returns container
 */
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

    return cellsContainer;
}

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
/**
 * Genera un intero random all'interno dell'intervallo compreso tra "min" e "max" (inclusi)
 * @param {number} min Il minimo dell'intervallo
 * @param {number} max Il massimo dell'intervallo
 * @returns 
 */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usare la funzione generatrice per creare un array di bombe
/**
 * Restituisce un array di lunghezza "bombs_number" contenente indici generati a random
 * all'interno dell'intervallo compreso tra "min" e "max"
 * @param {number} bombs_number Il numero totale di indici contenenti bombe 
 * @param {number} min Il minimo dell'intervallo di generazione degli indici
 * @param {number} max Il massimo dell'intervallo di generazione degli indici
 * @returns 
 */
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

// Modificare la funzione activateCell per includere anche le bombe

/* Quando l'utente clicca su ogni cella, la cella cliccata si colora di rosso se contiene una bomba,
altrimenti si colora di azzurro */
/**
 * Seleziona tutti gli elementi di classe "selector" e associa ad ognuno di essi un evento
 * al click, per cui se l'elemento ha un indice appartenente all'array "bombs" generato dalla
 * funzione createBombs allora avrà il layout dato da "bomb_class", altrimenti avraà quello dato da
 * "selected_class"
 * @param {string} selector 
 * @param {*} bombs 
 * @param {string} selected_class 
 * @param {string} bomb_class 
 */
function activateCell(selector, bombs, selected_class, bomb_class) {
    const cells = document.querySelectorAll(selector);
    const noBombsCells_number = cells.length - bombs.length;

    for (let index = 0; index < cells.length; index++) {
        const cell = cells[index];
        const cellNumber = parseInt(cell.innerHTML);

        cell.addEventListener('click', function() {

            if (!endGame) {

                if (bombs.includes(cellNumber)) {

                    /* SE la cella contiene una bomba si colora di rosso e la partita termina:
                    viene mostrato il numero di caselle senza bomba selezionate */
                    cell.classList.add(bomb_class);
                    alert(`Hai perso, riprova! Punteggio ottenuto: ${counter}`);

                    showBombs(bombs, cells, bomb_class);

                    endGame = true;

                }

                /* SE la cella non contiene una bomba e non è stata ancora selezionata
                si colora di azzurro e il contatore viene incrementato */
                else if (!cell.classList.contains(selected_class)) {

                    cell.classList.add(selected_class);
                    counter++;
                    console.log(`counter: ${counter}`);

                }

                /* SE il contatore è uguale al numero di celle senza bomba sono state selezionate
                tutte le celle senza bomba, quindi vittoria! */
                if (counter == noBombsCells_number) {

                    alert("Congratulazioni, hai vinto!!");

                    endGame = true;

                }
            }

        })

    }
}

// Leggere il valore di difficoltà inserito dall'utente e generare il corrispondente numero di caselle
const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", function() {

    let inputValue = document.getElementById("difficulty").value;
    let bombs = [];

    switch (inputValue) {
        case "1":
            generateGrid(100, ".grid", "div", "cell_10");
            bombs = createBombs(16, 1, 100);
            activateCell('.cell_10', bombs, 'selected', 'bomb');
            break;

        case "2":
            generateGrid(81, ".grid", "div", "cell_9");
            bombs = createBombs(16, 1, 81);
            activateCell('.cell_9', bombs, 'selected', 'bomb');
            break;

        case "3":
            generateGrid(49, ".grid", "div", "cell_7");
            bombs = createBombs(1, 1, 49);
            activateCell('.cell_7', bombs, 'selected', 'bomb');
            break;

        default:
            alert("Error");
            break;
    }

    // Creare una variabile per contare quante caselle senza bomba vengono selezionate
    counter = 0;

    /* BONUS: quando si clicca su una bomba e finisce la partita, 
    evitare che si possa cliccare su altre celle */

    /* Creare una variabile booleana per stabilire se si è arrivati alla fine del gioco,
    in modo da poter bloccare la griglia arrivati alla fine */
    endGame = false;

});

// Aggiungere un bottone per resettare la griglia
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", function() {

    location.reload();

});

/* BONUS 2: quando si clicca su una bomba e finisce la partita, 
il software scopre tutte le bombe nascoste */

// Creare una funzione che colori di rosso tutte le celle in cui c'è una bomba
/**
 * Assegna la classe "bomb_class" a tutti gli elementi dell'array "cells" che hanno indice
 * contenuto all'interno dell'array "bombs"
 * @param {*} bombs 
 * @param {*} cells 
 * @param {string} bomb_class 
 */
function showBombs(bombs, cells, bomb_class) {

    for (let index = 0; index < cells.length; index++) {
        const cell = cells[index];

        /* Se l'indice è contenuto nell'array di bombe selezionare il figlio di cells_container 
        con quell'indice */
        if (bombs.includes(index)) {

            // Assegnare al figlio selezionato la classe bomb se non l'ha già assegnata
            if (!cell.classList.contains(bomb_class)) {

                cell.classList.add(bomb_class);

            }
        }
    }
}
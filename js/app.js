const Game = require("./game.js");

const createGame = (x) => {

    const game = new Game(x);
    game.showFurry();
    game.showCoin();
    game.startGame();
    document.addEventListener('keydown', function (event) {
        game.turnFurry(event);
    });
}

const buttonEasy = document.querySelector('.easy')
const buttonNormal = document.querySelector('.normal')
const buttonHard = document.querySelector('.hard')
const buttonSuperHard = document.querySelector('.superhard')
const buttons = document.querySelectorAll('button')

const disableButton = () => {
    buttons.forEach(element => {
        element.disabled = "true"
    })
}

const clearScoreBoard = () => {
    document.querySelectorAll('p').forEach(element => {
        element.textContent = "0";
    })
}

buttonEasy.addEventListener('click', (e) => {
    createGame(400);
    disableButton();
    clearScoreBoard();
});
buttonNormal.addEventListener('click', () => {
    createGame(200);
    disableButton();
    clearScoreBoard();
});
buttonHard.addEventListener('click', () => {
    createGame(80);
    disableButton();
    clearScoreBoard();
});
buttonSuperHard.addEventListener('click', () => {
    createGame(150);
    disableButton();
    clearScoreBoard();
});
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

buttonEasy.addEventListener('click', () => {
    createGame(400);
});
buttonNormal.addEventListener('click', () => {
    createGame(200);
});
buttonHard.addEventListener('click', () => {
    createGame(80);
});
buttonSuperHard.addEventListener('click', () => {
    createGame(150);
});
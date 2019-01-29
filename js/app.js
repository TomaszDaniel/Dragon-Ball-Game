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

buttonEasy.addEventListener('click', () => {
    createGame(400);
});
buttonNormal.addEventListener('click', () => {
    createGame(200);
});
buttonHard.addEventListener('click', () => {
    createGame(500);
});
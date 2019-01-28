var Furry = require("./furry.js");
var Coin = require("./coin.js");

var Game = function () {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {

        return x + (y * 10);
    }

    this.showFurry = function () {

        this.hideVisibleFurry();
        if (this.index(this.furry.x, this.furry.y) < 0 || this.index(this.furry.x, this.furry.y) > this.board.length) {
            this.gameOver();
        } else {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        }
    }

    this.hideVisibleFurry = function () {

        this.previousFurry = document.querySelector('.furry');

        // pierwsza wartość jest nullem, bo nie ma jeszcze furrego na planszy i nie ma do czego się odwołać
        if (this.previousFurry !== null) {
            this.previousFurry.classList.remove('furry');
        }
    }

    this.showCoin = function () {

        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.moveFurry = function () {

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }


        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    }

    this.turnFurry = function (event) {

        switch (event.which) {
            case 37: // 37,38,39,40 - kody dla klawiszy strzałek
                this.furry.direction = "left";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };

    this.checkCoinCollision = function () {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;
            var points = document.querySelector('strong');
            points.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        var self = this;
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {

            clearInterval(self.idSetInterval);
            setTimeout(function () {
                document.querySelectorAll('div').forEach(element => {
                    element.classList.remove('furry')
                    element.classList.remove('coin')
                })
            }, 1)
        }
    }

    this.startGame = function () {

        var self = this;

        this.idSetInterval = setInterval(function () {

            self.moveFurry();

        }, 100);
    };

}

module.exports = Game;
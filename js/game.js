var Furry = require("./furry.js");
var Coin = require("./coin.js");

var Game = function (basicSpeed) {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.speed = basicSpeed;

    this.index = function (x, y) {
        return x + (y * 10);
    }

    this.showFurry = () => {
        this.hideVisibleFurry();
        if (this.index(this.furry.x, this.furry.y) < 0 || this.index(this.furry.x, this.furry.y) >= this.board.length) {
            this.gameOver();
        } else {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        }
    }

    this.hideVisibleFurry = () => {

        this.previousFurry = document.querySelector('.furry');

        // pierwsza wartość jest nullem, bo nie ma jeszcze furrego na planszy i nie ma do czego się odwołać
        if (this.previousFurry !== null) {
            this.previousFurry.classList.remove('furry');
        }
    }

    this.showCoin = () => {

        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.moveFurry = () => {

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

    this.turnFurry = (event) => {

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

    this.checkCoinCollision = () => {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;
            // var points = document.querySelector('strong');
            // points.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
            if (this.speed === 500) this.gameSpeed();
        }
    };

    this.gameOver = () => {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {

            clearInterval(this.idSetInterval);
            setTimeout(function () {
                document.querySelectorAll('div').forEach(element => {
                    element.classList.remove('furry')
                    element.classList.remove('coin')
                })
            }, 1)
        }
    }

    this.startGame = () => {
        this.idSetInterval = setInterval(() => {
            this.moveFurry();
        }, this.speed);
    };

    this.gameSpeed = () => {
        clearInterval(this.idSetInterval);
        const speed = 1000 / this.score
        this.idSetInterval = setInterval(() => {
            this.moveFurry();
        }, speed);
    }

}

module.exports = Game;
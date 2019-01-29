var Furry = require("./furry.js");
var Coin = require("./coin.js");

var Game = function (basicSpeed) {
    this.board = document.querySelectorAll('.board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.speed = basicSpeed;
    this.scoreBoard = [0, 0, 0, 0, 0, 0, 0];
    this.counter = 0;

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
        const i = Math.floor(Math.random() * 7) + 1
        this.board[this.index(this.coin.x, this.coin.y)].classList.add(`coin${i}`);
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
            this.collectBall();
            for (let i = 1; i <= 7; i++) {
                this.board[this.index(this.coin.x, this.coin.y)].classList.remove(`coin${i}`);
            }
            this.score++;
            this.coin = new Coin();
            this.showCoin();
            if (this.speed === 150) this.gameSpeed();
        }
    };

    this.gameOver = () => {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            setTimeout(() => {
                this.board.forEach(element => {
                    element.className = "";
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
        let speed;
        if (this.score <= 2) {
            speed = this.speed
        } else {
            speed = (2 * this.speed) / this.score;
        }
        this.idSetInterval = setInterval(() => {
            this.moveFurry();
        }, speed);
    }

    this.collectBall = () => {
        const furryPosition = this.board[this.index(this.coin.x, this.coin.y)];
        if (furryPosition.classList[0] === 'coin1') {
            this.scoreBoard[0]++
            document.querySelector('.coin1 + p').textContent++
        } else if (furryPosition.classList[0] === 'coin2') {
            this.scoreBoard[1]++
            document.querySelector('.coin2 + p').textContent++
        } else if (furryPosition.classList[0] === 'coin3') {
            this.scoreBoard[2]++
            document.querySelector('.coin3 + p').textContent++
        } else if (furryPosition.classList[0] === 'coin4') {
            this.scoreBoard[3]++
            document.querySelector('.coin4 + p').textContent++
        } else if (furryPosition.classList[0] === 'coin5') {
            this.scoreBoard[4]++
            document.querySelector('.coin5 + p').textContent++
        } else if (furryPosition.classList[0] === 'coin6') {
            this.scoreBoard[5]++
            document.querySelector('.coin6 + p').textContent++
        } else if (furryPosition.classList[0] === 'coin7') {
            this.scoreBoard[6]++
            document.querySelector('.coin7 + p').textContent++
        }
        let dragon = 0;
        for (let i = 0; i < this.scoreBoard.length - 1; i++) {
            if (this.scoreBoard[i] > this.counter && this.scoreBoard[i + 1] > this.counter) {
                dragon++
            }
        }
        if (dragon === 6) {
            document.querySelector('.dragon + p').textContent++
            this.counter++
        }
        dragon = 0;
    }

}

module.exports = Game;
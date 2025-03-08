
function createGameBoard() {
    let board = ['', '', '', '', '', '','', '', ''];
    return {
        getCurrentState: function(){
            return [...board];
        },
        isEmpty: function(index){
            if(index >= 0 && index < board.length && board[index] === '') {
                return true;
            } else {
                return false;
            } 
        },
        putMark: function(index, mark) {
            if(index >= 0 && index < board.length && this.isEmpty(index)) {
                board[index] = mark;
                return true // i.e mark is placed successfully
            } else {
                console.log('invalid move! cell already occupied!');
                return false // i.e mark is not placed succesfully
            }
        },
        resetBoard: function(){
            board = ['', '', '', '', '', '','', '', ''];
        }
    };
}

function createPlayer(name, mark) {
    return {
        name: name,
        mark: mark,
        getPlayerName: function(){
            return this.name;
        },
        getPlayerMark: function(){
            return this.mark;
        }
    }
}

function createGameController(gameBoard,player1,player2) {
    let currentPlayer = player1;
    let gameOver = false;
    function win() {
        const board = gameBoard.getCurrentState();
        return !gameBoard.isEmpty(0) && board[0] === board[1] && board[1]=== board[2] || 
            !gameBoard.isEmpty(3) && board[3] === board[4] && board[4]=== board[5] ||
            !gameBoard.isEmpty(6) && board[6] === board[7] && board[7]=== board[8] || 
            !gameBoard.isEmpty(0) && board[0] === board[3] && board[3]=== board[6] ||
            !gameBoard.isEmpty(1) && board[1] === board[4] && board[4]=== board[7] || 
            !gameBoard.isEmpty(2) && board[2] === board[5] && board[5]=== board[8] || 
            !gameBoard.isEmpty(0) && board[0] === board[4] && board[4]=== board[8] || 
            !gameBoard.isEmpty(2) && board[2] === board[4] && board[4]=== board[6] ;
    }
    function draw(){
        const board = gameBoard.getCurrentState();
        return board.every((cell) => {
            return cell !== '';
        })
    }
    return {
        gameBoard: gameBoard,
        players: [player1, player2],
        getCurrentPlayer: function() {
            return currentPlayer;
        },
        switchPlayer: function(){
            if(this.getCurrentPlayer() === player1 ){
                currentPlayer = player2;
            } else if(this.getCurrentPlayer() === player2) {
                currentPlayer  = player1;
            }
        },
        play: function(index) {
            if(gameOver) {
                console.log('Game Over!');
                return;
            }
            if(gameBoard.isEmpty(index)) {
                gameBoard.putMark(index, this.getCurrentPlayer().mark);
                if(win()) {
                    gameOver = true;
                    console.log(`${this.getCurrentPlayer().name} has won!`);
                    return;
                } else if(draw()){
                    gameOver = true;
                    console.log("it's a tie!");
                    return;
                }
                this.switchPlayer();
            } else {
                console.log('Invalid move! cell is already taken!');
                
            }
        },
        reset: function(){
            gameBoard.resetBoard();
            gameOver = false;
            currentPlayer = player1;
            console.log('The game has been reset!');
        }
    }
}

function createDisplayer(gameboard, gamecontroller){
    const boardBtn = document.querySelectorAll('.board-btn');
    const player1Score = document.querySelector('.player1-score');
    const player2Score = document.querySelector('.player2-score');
    
    const boardBtnArray = [...boardBtn];
    boardBtn.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const index = boardBtnArray.indexOf(event.target);
            gamecontroller.play(index);
            const updatedBoard = gameboard.getCurrentState();
            btn.textContent = updatedBoard[index];
            console.log(`${event.target.textContent} clicked`);
            btn.disabled = true;
        })
    })

    return {
        displayMark: function(){
            
        }
    }
}  

const gameBoard = createGameBoard();
const player1 = createPlayer('player1', 'X');
const player2 = createPlayer('player2', 'O');
const gameController = createGameController(gameBoard, player1, player2);
const displayer = createDisplayer(gameBoard, gameController);















// gameController.play(0); // Player 1 places "X" at index 0
// gameController.play(2); // Player 2 places "O" at index 1
// gameController.play(4); // Player 1 places "X" at index 4
// console.log(gameBoard.getCurrentState());

// gameController.play(5); // Player 2 places "O" at index 2
// console.log(gameBoard.getCurrentState());

// gameController.play(6); // Player 1 places "X" at index 8 (wins!)
// console.log(gameBoard.getCurrentState());
// gameController.play(8); // Game is already over
// console.log(gameBoard.getCurrentState());
// gameController.reset(); // Reset the game
// console.log(gameBoard.getCurrentState());












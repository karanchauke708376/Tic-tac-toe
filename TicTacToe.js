const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const  newGameBtn = document.querySelector(".btn");

let currentPlayer;              // player x and player 0
let gameGrid                    // 3x3 game current status cell filled or not

// win position set
let winningPosition = [
    [0, 1, 2],  // column
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // row
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal
    [2, 4, 6]
];

// let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];    // New Game Start When Is Empty Boxes

    // UI Par Empty Bhi Karna Padega Boxes Ko
    boxes.forEach((box , index) => {
            box.innerText = "";
            boxes[index].style.pointerEvents = "all";
            // one more thing is missing , initialise box with css properties again
            box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;    //UI Show

}

initGame();

    function swapTurn() {
        if(currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
        // UI Update
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }

    function checkGameOver() {

        let answer = "";
        
        winningPosition.forEach((position) => {
            // all 3 boxes should be non-empty and exactly same in value
            if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {

                // Check if winner is X
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "O";

                    // Disable Pointer Events
                    boxes.forEach((box) => {
                        box.style.pointerEvents = "none";
                    })

                // Now we know X|O is a winner
                boxes[position[0]].classList.add("win"); 
                boxes[position[1]].classList.add("win"); 
                boxes[position[2]].classList.add("win"); 

                
            }
        })
                // it means we have a winner
            if(answer !== "") {
                gameInfo.innerText = `Winner Player - ${answer}`;
                newGameBtn.classList.add("active");
                return;
            }

            // We Know No Winner Found Let's When there is  tie
            let fillCount = 0;
            gameGrid.forEach((box) => {
                if(box !== "")
                    fillCount++;
            })

            // Board is Filled , Game Is TIE
            if(fillCount == 9) {
                gameInfo.innerText = "Game Is Tied !";
                newGameBtn.classList.add("active");

            }
    }

    function handleClick(index) {
        if(gameGrid[index] === "") {           // Check Empty Boxes
            boxes[index].innerText = currentPlayer;    // UI Show
            gameGrid[index] = currentPlayer;          // Inner Logic Change Script
            boxes[index].style.pointerEvents = "none";  // no click when win
            // Swap Karo Turn ko 
            swapTurn();

            // Check Kai Jeet Toh Nhi Gayaa . . . 
            checkGameOver();


        }
    }

            // when box click effect show UI 
    boxes.forEach((box , index ) => {
        box.addEventListener("click" , () => {
            handleClick(index);
        })
    }) 

    newGameBtn.addEventListener("click" , initGame); // initial game start
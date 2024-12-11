let turn = "X";
let gameover = false;

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
}

function checkWin() {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let allCells = document.getElementsByClassName("col");

    winningCombinations.forEach((combo) => {
        if (
            allCells[combo[0]].innerText === allCells[combo[1]].innerText &&
            allCells[combo[1]].innerText === allCells[combo[2]].innerText &&
            allCells[combo[0]].innerText !== ""
        ) {
            document.getElementById("bari").innerText =
                allCells[combo[0]].innerText + " WON!";
            gameover = true;

            combo.forEach((index) => {
                allCells[index].style.backgroundColor = "#d4edda";
                allCells[index].style.color = "#155724";
                allCells[index].style.fontWeight = "bold";
            });
        }
    });
}

function checkDraw(){
    let allBoxes = document.getElementsByClassName("col");
    let count=0;
    Array.from(allBoxes).forEach((box) => {
        if(box.innerText!="") count++;
    });
    if(count===9){
        document.getElementById("bari").innerText ="IT'S A DRAW";
            gameover = true;
    }
}

let allBoxes = document.getElementsByClassName("col");
Array.from(allBoxes).forEach((box) => {
    box.addEventListener("click", function () {
        if (gameover) {
            return;
        }
        
        if (box.innerText === "") {
            box.innerText = turn;
            checkWin();
            checkDraw();
            if (!gameover) {
                changeTurn();
                document.getElementById("bari").innerText = "TURN FOR : " + turn;
            }
        }
    });
});

let resetGame = document.getElementById("reset");
resetGame.addEventListener("click", function () {
    gameover = false;
    let allCells = document.getElementsByClassName("col");
    Array.from(allCells).forEach((cell) => {
        cell.innerText = "";
        cell.style.backgroundColor = "";
        cell.style.color = "";
        cell.style.fontWeight = "";
    });
    turn = "X";
    document.getElementById("bari").innerText = "TURN FOR : " + turn;
});

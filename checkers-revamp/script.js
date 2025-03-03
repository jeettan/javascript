let k = document.getElementsByClassName('row');
let gs = document.getElementById("game-state");
let audio = document.getElementById("myAudio")
let audio2 = document.getElementById("myAudio2")

// 1 for red -1 for black
// 2 for double jump red -2 for double jump black
// 3 for king red -3 for king red

let pieces = [
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
]

let blackCount = 0;
let redCount = 0;

let isRedTurn = true;

createBoard()

function createBoard() {

    for (i = 0; i < pieces.length; i++) {


        for (j = 0; j < pieces[i].length; j++) {

            if (pieces[i][j] >= 1) {

                let red = document.createElement("div");
                red.classList.add("redPiece");


                if (pieces[0][j] == 1) {

                    pieces[0][j] = 3;
                }

                if (pieces[i][j] == 2 || pieces[i][j] == 4) {

                    red.classList.add("doubleJump");
                    red.classList.add("selected");
                }

                if (pieces[i][j] >= 3) {

                    red.classList.add("king");
                }

                k[i].children[j].appendChild(red);

                red.addEventListener("click", handleClick)

            } else if (pieces[i][j] <= -1) {

                let black = document.createElement("div");
                black.classList.add("blackPiece");

                if (pieces[7][j] == -1) {

                    pieces[7][j] = -3;
                }


                if (pieces[i][j] == -2 || pieces[i][j] == -4) {

                    black.classList.add("doubleJump");
                    black.classList.add("selected");
                }


                if (pieces[i][j] <= -3) {

                    black.classList.add("king");
                }

                k[i].children[j].appendChild(black);

                black.addEventListener("click", handleClick)

            }

        }
    }
    checkWin()
    addSquareListener()

}

function handleClick(ev) {

    let selected = ev.target;

    let y = document.querySelectorAll('.doubleJump');

    if (y[0]) {
        return;
    }

    if (isRedTurn && selected.classList.contains('redPiece')) {

        if (selected.classList.contains('selected')) {
            document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.remove('selected')
        } else {
            document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.add('selected');
        }
    }

    if (!isRedTurn && selected.classList.contains('blackPiece')) {

        if (selected.classList.contains('selected')) {
            document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.remove('selected')
        } else {
            document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.add('selected');
        }
    }

}

function addSquareListener() {

    let k = document.getElementsByClassName('square');

    for (i = 0; i < k.length; i++) {

        k[i].addEventListener("click", handleMove)
    }

}

function handleMove(ev) {

    let selectedPiece = document.querySelectorAll('.selected');

    let dj = document.querySelectorAll('.doubleJump');

    let king;

    if (selectedPiece[0]) {

        king = selectedPiece[0].classList.contains("king");

    }

    if (!selectedPiece[0]) return;

    //have to check for this
    if (selectedPiece[0] === ev.target) return;

    let y = ev.target;
    let parent = y.parentElement

    let row = Array.from(parent.children).indexOf(y);

    y = parent;
    parent = y.parentElement;
    let column = Array.from(parent.children).indexOf(y);

    let moveLocation = { column: column, row: row }

    parent2 = selectedPiece[0].parentElement.parentElement;

    let row2 = Array.from(parent2.children).indexOf(selectedPiece[0].parentElement);

    y = parent2;

    parent2 = y.parentElement;

    let column2 = Array.from(parent2.children).indexOf(y);

    let currentPosition = { column: column2, row: row2 };

    if (king && isRedTurn) {

        if ((isRedTurn) && (((moveLocation['column'] == (currentPosition['column'] + 1)) && (moveLocation['row'] == currentPosition['row'] + 1)) ||
            ((moveLocation['column'] == (currentPosition['column'] - 1)) && (moveLocation['row'] == currentPosition['row'] - 1)) ||
            ((moveLocation['column'] == (currentPosition['column'] - 1)) && (moveLocation['row'] == currentPosition['row'] + 1)) ||
            ((moveLocation['column'] == (currentPosition['column'] + 1)) && (moveLocation['row'] == currentPosition['row'] - 1))) && pieces[column][row] == 0 && !dj[0]) {

            pieces[column][row] = 3;
            pieces[column2][row2] = 0;

            isRedTurn = !isRedTurn;
            clearBoard()
            createBoard()

            return;
        }

        let checkKingJumpMoves = kingJumps(currentPosition, moveLocation);

        if (checkKingJumpMoves) {

            if ((moveLocation['column'] == currentPosition['column'] + 2) && (moveLocation['row'] == currentPosition['row'] - 2) && checkKingJumpMoves.includes(4)) {

                pieces[column2][row2] = 0;
                pieces[column][row] = 3;
                pieces[column2 + 1][row2 - 1] = 0;

                y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = 4;
                    clearBoard()
                    createBoard()
                    return

                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;

            }

            if ((moveLocation['column'] == currentPosition['column'] + 2) && (moveLocation['row'] == currentPosition['row'] + 2) && checkKingJumpMoves.includes(3)) {

                pieces[column2][row2] = 0;
                pieces[column][row] = 3;
                pieces[column2 + 1][row2 + 1] = 0;

                y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = 4;
                    clearBoard()
                    createBoard()
                    return
                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;

            }

            if ((moveLocation['column'] == currentPosition['column'] - 2) && (moveLocation['row'] == currentPosition['row'] + 2) && checkKingJumpMoves.includes(2)) {

                pieces[column2][row2] = 0;
                pieces[column][row] = 3;
                pieces[column2 - 1][row2 + 1] = 0;

                y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = 4;
                    clearBoard()
                    createBoard()
                    return
                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;

            }

            if ((moveLocation['column'] == currentPosition['column'] - 2) && (moveLocation['row'] == currentPosition['row'] - 2) && checkKingJumpMoves.includes(1)) {

                pieces[column2][row2] = 0;
                pieces[column][row] = 3;
                pieces[column2 - 1][row2 - 1] = 0;

                y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = 4;
                    clearBoard()
                    createBoard()
                    return
                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;

            }

        }

    }

    if (isRedTurn) {

        let check = checkJump(currentPosition, moveLocation);

        if (isRedTurn && check[0] == true && (check[1] == 1 || check[1] == 3) && (moveLocation['column'] == currentPosition['column'] - 2) && (moveLocation['row'] == currentPosition['row'] + 2)) {

            pieces[column2 - 1][row2 + 1] = 0;
            pieces[column2][row2] = 0;
            pieces[column][row] = 1;

            if (column == 0) {

                audio2.play()

            }

            if (checkDoubleJump(moveLocation) == true) {

                pieces[column][row] = 2;
                clearBoard()
                createBoard()
                return;
            }

            isRedTurn = !isRedTurn;
            clearBoard()
            createBoard()

            return;

        } else if (isRedTurn && check[0] == true && (check[1] == -1 || check[1] == 3) && (moveLocation['column'] == currentPosition['column'] - 2) && (moveLocation['row'] == currentPosition['row'] - 2)) {

            pieces[column2 - 1][row2 - 1] = 0;
            pieces[column2][row2] = 0;
            pieces[column][row] = 1;

            if (column == 0) {

                audio2.play()

            }

            if (checkDoubleJump(moveLocation) == true) {

                pieces[column][row] = 2;
                clearBoard()
                createBoard()
                return;
            }

            isRedTurn = !isRedTurn;
            clearBoard()
            createBoard()

            return;
        }

        if ((isRedTurn && moveLocation['column'] == (currentPosition['column'] - 1)) && ((moveLocation['row'] == currentPosition['row'] + 1) || (moveLocation['row'] == currentPosition['row'] - 1))
            && pieces[column][row] != 1 && pieces[column][row] != -1 && !dj[0]) {

            pieces[column][row] = 1;
            pieces[column2][row2] = 0;

            if (column == 0) {

                audio2.play()

            }

            isRedTurn = !isRedTurn;
            clearBoard()
            createBoard()

            return;
        }

    }

    if (king && !isRedTurn) {

        if ((!isRedTurn) && (((moveLocation['column'] == (currentPosition['column'] + 1)) && (moveLocation['row'] == currentPosition['row'] + 1)) ||
            ((moveLocation['column'] == (currentPosition['column'] - 1)) && (moveLocation['row'] == currentPosition['row'] - 1)) ||
            ((moveLocation['column'] == (currentPosition['column'] - 1)) && (moveLocation['row'] == currentPosition['row'] + 1)) ||
            ((moveLocation['column'] == (currentPosition['column'] + 1)) && (moveLocation['row'] == currentPosition['row'] - 1))) && pieces[column][row] == 0 && !dj[0]) {

            pieces[column][row] = -3;
            pieces[column2][row2] = 0;

            isRedTurn = !isRedTurn;
            clearBoard()
            createBoard()

            return;
        }

        let checkKingJumpMoves = kingJumps(currentPosition, moveLocation);

        if (checkKingJumpMoves) {

            if ((moveLocation['column'] == currentPosition['column'] + 2) && (moveLocation['row'] == currentPosition['row'] - 2) && checkKingJumpMoves.includes(4)) {

                pieces[column2][row2] = 0;
                pieces[column][row] = -3;
                pieces[column2 + 1][row2 - 1] = 0;

                let y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = -4;
                    clearBoard()
                    createBoard()
                    return
                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;

            }

            if ((moveLocation['column'] == currentPosition['column'] + 2) && (moveLocation['row'] == currentPosition['row'] + 2) && checkKingJumpMoves.includes(3)) {

                pieces[column2][row2] = 0;
                pieces[column][row] = -3;
                pieces[column2 + 1][row2 + 1] = 0;

                let y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = -4;
                    clearBoard()
                    createBoard()
                    return
                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;

            }

            if ((moveLocation['column'] == currentPosition['column'] - 2) && (moveLocation['row'] == currentPosition['row'] + 2) && checkKingJumpMoves.includes(2)) {

                pieces[column2][row2] = 0;
                pieces[column][row] = -3;
                pieces[column2 - 1][row2 + 1] = 0;

                let y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = -4;
                    clearBoard()
                    createBoard()
                    return
                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;

            }

            if ((moveLocation['column'] == currentPosition['column'] - 2) && (moveLocation['row'] == currentPosition['row'] - 2) && checkKingJumpMoves.includes(1)) {


                pieces[column2][row2] = 0;
                pieces[column][row] = -3;
                pieces[column2 - 1][row2 - 1] = 0;

                let y = checkKingDoubleJump(moveLocation)

                if (y.length > 0) {

                    pieces[column][row] = -4;
                    clearBoard()
                    createBoard()
                    return
                }

                isRedTurn = !isRedTurn;
                clearBoard()
                createBoard()
                return;
            }

        }

    }

    if (!isRedTurn) {

        let check = checkJump(currentPosition, moveLocation);

        if (!isRedTurn && check[0] == true && (check[1] == 1 || check[1] == 3) && (moveLocation['column'] == currentPosition['column'] + 2) &&
            (moveLocation['row'] == currentPosition['row'] + 2)) {

            pieces[column2 + 1][row2 + 1] = 0;
            pieces[column2][row2] = 0;
            pieces[column][row] = -1;


            if (column == 7) {
                audio2.play()
            }

            if (checkDoubleJump(moveLocation) == true) {

                pieces[column][row] = -2;
                clearBoard()
                createBoard()
                return;
            }

            isRedTurn = !isRedTurn;

            clearBoard()
            createBoard()

            return;

        } else if (!isRedTurn && check[0] == true && (check[1] == -1 || check[1] == 3) && (moveLocation['column'] == currentPosition['column'] + 2) && (moveLocation['row'] == currentPosition['row'] - 2)) {

            pieces[column2 + 1][row2 - 1] = 0;
            pieces[column2][row2] = 0;
            pieces[column][row] = -1;


            if (column == 7) {
                audio2.play()
            }

            if (checkDoubleJump(moveLocation) == true) {

                pieces[column][row] = -2;
                clearBoard()
                createBoard()
                return;
            }

            isRedTurn = !isRedTurn;

            clearBoard()
            createBoard()

            return;
        }

        if ((!isRedTurn && moveLocation['column'] == (currentPosition['column'] + 1)) && ((moveLocation['row'] == currentPosition['row'] + 1) || (moveLocation['row'] == currentPosition['row'] - 1))
            && pieces[column][row] != 1 && pieces[column][row] != -1 && !dj[0]) {

            pieces[column][row] = -1;
            pieces[column2][row2] = 0;

            if (column == 7) {
                audio2.play()
            }

            isRedTurn = !isRedTurn;

            clearBoard()
            createBoard()

            return;
        }
    }

}

function clearBoard() {

    let j = document.getElementsByClassName('square');

    for (i = 0; i < j.length; i++) {

        if (j[i].children[0]) {

            j[i].removeChild(j[i].children[0]);
        }
    }

    audio.play()
    displayMessage()
}

function checkJump(currentPosition, moveLocation) {

    let dj = document.querySelectorAll('.doubleJump');

    let row = currentPosition['row']
    let column = currentPosition['column']

    let row2 = moveLocation['row']
    let column2 = moveLocation['column']

    if (((row + 1 > 7) && (row2 > 7)) || ((column - 1 < 0) && (column2 < 0)) || ((row - 1 < 0) && (row2 < 0)) || ((column + 1 > 7) && column2 > 7)) {

        return false;
    }

    if (isRedTurn) {

        if (((pieces[column - 1][row + 1] <= -1) && (pieces[column - 2][row + 2] == 0)) && (pieces[column - 1][row - 1] <= -1 && (pieces[column - 2][row - 2] == 0)))

            return [true, 3];

        if ((pieces[column - 1][row + 1] <= -1) && (pieces[column - 2][row + 2] == 0)) {

            return [true, 1]
        }


        if (pieces[column - 1][row - 1] <= -1 && (pieces[column - 2][row - 2] == 0)) {

            return [true, -1]
        }

    }

    if (!isRedTurn) {

        if (((pieces[column + 1][row + 1] >= 1) && (pieces[column + 2][row + 2] == 0)) && ((pieces[column + 1][row - 1] == 1) && (pieces[column + 2][row - 2] == 0)))

            return [true, 3];


        if ((pieces[column + 1][row + 1] >= 1) && (pieces[column + 2][row + 2] == 0)) {

            return [true, 1]
        }

        if ((pieces[column + 1][row - 1] >= 1) && (pieces[column + 2][row - 2] == 0)) {

            return [true, -1]
        }

    }

    return false;
}

function checkDoubleJump(moveLocation) {

    let current = moveLocation;

    if (isRedTurn) {

        let y = moveLocation['row'] + 2
        let x = moveLocation['column'] - 2;

        let z = moveLocation['row'] - 2
        let p = moveLocation['column'] - 2;

        if (y > 7 || x < 0 || y < 0 || x > 7 || z > 7 || z < 0 || p > 7 || p < 0) {

            return false;
        }

        moveLocation = { column: x, row: y }

        y = checkJump(current, moveLocation);

        if (y[0] == true) {
            return true;
        }

        moveLocation = { column: p, row: z }

        y = checkJump(current, moveLocation);

        if (y[0] == true) {

            return true;
        }

        return false;

    } else if (!isRedTurn) {

        let y = moveLocation['row'] + 2
        let x = moveLocation['column'] + 2;

        let z = moveLocation['row'] - 2
        let p = moveLocation['column'] + 2;

        if (y > 7 || x < 0 || y < 0 || x > 7 || z > 7 || z < 0 || p > 7 || p < 0) {

            return false;
        }

        moveLocation = { column: x, row: y }
        let moveLocation2 = { column: p, row: z }

        let check = checkJump(current, moveLocation);

        check2 = checkJump(current, moveLocation2);

        if (check[0] == true || check2[0] == true) {
            return true;
        }

        return false;
    }

}

function kingJumps(currentPosition, moveLocation) {

    let row = currentPosition['row']
    let column = currentPosition['column']

    let row2 = moveLocation['row']
    let column2 = moveLocation['column']

    var array = []

    if (row2 > 7 || row2 < 0 || column2 > 7 || column2 < 0) {

        return false;
    }


    if (isRedTurn) {

        if (column - 2 >= 0 && row - 2 >= 0) {

            if ((pieces[column - 1][row - 1] <= -1) && (pieces[column - 2][row - 2] == 0)) {

                array.push(1)
            }

        }

        if (column - 2 >= 0 && row + 2 <= 7) {

            if ((pieces[column - 1][row + 1] <= -1) && (pieces[column - 2][row + 2] == 0)) {

                array.push(2)
            }

        }

        if (column + 2 <= 7 && row + 2 <= 7) {

            if ((pieces[column + 1][row + 1] <= -1) && (pieces[column + 2][row + 2] == 0)) {

                array.push(3)
            }

        }

        if (column + 2 <= 7 && row - 2 >= 0) {

            if ((pieces[column + 1][row - 1] <= -1) && (pieces[column + 2][row - 2] == 0)) {

                array.push(4)
            }
        }

        if (array.length > 0) {

            return array;
        }

    }

    if (!isRedTurn) {

        if (column - 2 >= 0 && row - 2 >= 0) {

            if ((pieces[column - 1][row - 1] >= 1) && (pieces[column - 2][row - 2] == 0)) {

                array.push(1)
            }

        }
        if (column - 2 >= 0 && row + 2 <= 7) {

            if ((pieces[column - 1][row + 1] >= 1) && (pieces[column - 2][row + 2] == 0)) {

                array.push(2)
            }

        }
        if (column + 2 <= 7 && row + 2 <= 7) {


            if ((pieces[column + 1][row + 1] >= 1) && (pieces[column + 2][row + 2] == 0)) {

                array.push(3)
            }

        }
        if (column + 2 <= 7 && row - 2 >= 0) {

            if ((pieces[column + 1][row - 1] >= 1) && (pieces[column + 2][row - 2] == 0)) {

                array.push(4)
            }

        }

        if (array.length > 0) {

            return array;
        }
    }

    return false;

}

function checkKingDoubleJump(moveLocation) {

    let row = moveLocation['row']
    let column = moveLocation['column']
    let array = []

    if (column - 1 < 0 || column + 1 > 7 || row + 1 > 7 || row - 1 < 0) {

        return false;
    }

    if (isRedTurn) {

        if ((pieces[column - 1][row - 1] <= -1 && pieces[column - 2][row - 2] == 0)) {

            array.push(1)
        } else if ((pieces[column - 1][row + 1] <= -1 && pieces[column - 2][row + 2] == 0)) {

            array.push(2)

        } else if ((pieces[column + 1][row + 1] <= -1 && pieces[column + 2][row + 2] == 0)) {

            array.push(3)

        } else if ((pieces[column + 1][row - 1] <= -1 && pieces[column + 2][row - 2] == 0)) {

            array.push(4)
        }

        if (array.length > 0) {

            return array
        } else {

            return false;
        }

    } if (!isRedTurn) {

        if ((pieces[column - 1][row - 1] >= 1 && pieces[column - 2][row - 2] == 0)) {

            array.push(1)
        } else if ((pieces[column - 1][row + 1] >= 1 && pieces[column - 2][row + 2] == 0)) {

            array.push(2)

        } else if ((pieces[column + 1][row + 1] >= 1 && pieces[column + 2][row + 2] == 0)) {

            array.push(3)

        } else if ((pieces[column + 1][row - 1] >= 1 && pieces[column + 2][row - 2] == 0)) {

            array.push(4)
        }

        if (array.length > 0) {

            return array
        } else {

            return false;
        }

    }
}

function createTestingGround() {

    let trueFalse = true;

    if (!trueFalse) return

    isRedTurn = true;

    pieces = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]

}

function restartGame() {

    gs.innerHTML = "Reset game"

    isRedTurn = true;

    pieces = [
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ]


    clearBoard()
    createBoard()

    gs.innerHTML = "Reset game"

}

function displayMessage() {


    if (isRedTurn) {

        gs.innerHTML = "Red's turn"

    } else if (!isRedTurn) {

        gs.innerHTML = "Black's turn"
    }
}

function checkWin() {

    redCount = 0;
    blackCount = 0;

    for (i = 0; i < pieces.length; i++) {

        for (j = 0; j < pieces[i].length; j++) {

            if (pieces[i][j] > 0) {

                redCount++;
            }

            if (pieces[i][j] < 0) {

                blackCount++;
            }
        }
    }

    if (blackCount == 0 || redCount == 0) {

        let j = document.getElementsByClassName('redPiece');
        let k = document.getElementsByClassName('blackPiece');

        for (i = 0; i < j.length; i++) {

            j[i].removeEventListener("click", handleClick)
        }

        for (i = 0; i < k.length; i++) {

            k[i].removeEventListener("click", handleClick)
        }



        if (blackCount == 0) {

            gs.innerHTML = "GAME OVER. Red Wins"
        } else if (redCount == 0) {

            gs.innerHTML = "GAME OVER. Black wins";
        }
    }

}
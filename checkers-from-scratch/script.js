let go = document.getElementById('game-board');
let gamestate = document.getElementById('game-state');

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

let position = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63],
];

let turn = 1;

function createGameBoard() {

    for (i = 0; i < 8; i++) {

        var row = document.createElement('div');
        row.classList.add('row');

        for (j = 0; j < 8; j++) {

            var col = document.createElement('div');
            col.classList.add('col');

            if (i % 2 == 0) {
                if (j % 2 == 0) {

                    col.style.backgroundColor = "#b7e3dc";
                    row.appendChild(col);
                } else {
                    col.style.backgroundColor = "white";
                    col.addEventListener('click', movePiece);
                    row.appendChild(col);
                }

            } else {

                if (j % 2 == 0) {
                    col.style.backgroundColor = "white";
                    col.addEventListener('click', movePiece);
                    row.appendChild(col);
                } else {
                    col.style.backgroundColor = "#b7e3dc";
                    row.appendChild(col);

                }

            }

        }
        go.appendChild(row);
    }
}

function addPieces() {

    var k = document.querySelectorAll('#game-board .row .col');

    clearBoard();

    for (i = 0; i < pieces.length; i++) {

        for (j = 0; j < pieces[i].length; j++) {

            if (pieces[i][j] == -1) {

                var blackPiece = document.createElement('div');
                blackPiece.classList.add('blackPiece');

                k[position[i][j]].appendChild(blackPiece);

                if (checkWin != true) {

                    var piece = k[position[i][j]].childNodes[0];
                    piece.addEventListener('click', handleClick);

                }

            }

            if (pieces[i][j] == -2) {

                var blackPiece = document.createElement('div');
                blackPiece.classList.add('blackPiece');
                blackPiece.classList.add('king');
                k[position[i][j]].appendChild(blackPiece);

                if (checkWin != true) {

                    var piece = k[position[i][j]].childNodes[0];
                    piece.addEventListener('click', handleClick);
                }
            }

            if (pieces[i][j] == 1) {

                var redPiece = document.createElement('div');
                redPiece.classList.add('redPiece');
                k[position[i][j]].appendChild(redPiece);

                if (checkWin != true) {

                    var piece = k[position[i][j]].childNodes[0];
                    piece.addEventListener('click', handleClick);

                }
            }

            if (pieces[i][j] == 2) {

                var redPiece = document.createElement('div');
                redPiece.classList.add('redPiece');
                redPiece.classList.add('king');
                k[position[i][j]].appendChild(redPiece);

                if (checkWin != true) {
                    var piece = k[position[i][j]].childNodes[0];
                    piece.addEventListener('click', handleClick);
                }
            }
        }
    }

    if (turn == 1) {

        gamestate.innerHTML = "Red Turn";
    }

    else if (turn == 2) {

        gamestate.innerHTML = "Black Turn";
    }

    checkWin()

}

function handleClick(e) {

    var selected = e.target;

    if (turn == 1 && selected.classList.contains('redPiece')) {

        if (selected.classList.contains('selected')) {
            var k = document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.remove('selected')
        } else {
            var k = document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.add('selected');

        }
    } else if (turn == 2 && selected.classList.contains('blackPiece')) {

        if (selected.classList.contains('selected')) {
            var k = document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.remove('selected')
        } else {
            var k = document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
            selected.classList.add('selected');

        }

    }

}

function movePiece(e) {

    let j = document.querySelectorAll('#game-board .row .col');
    let k = document.querySelector('.selected');
    var king = false;

    let jumpable = false;

    if (turn == 1) {

        if (k) {

            if (e.target.classList.contains('selected') != true) {

                var positionCurrent = "";
                var movePosition = "";
                e.target.classList.add('move');

                for (i = 0; i < j.length; i++) {

                    if (j[i].childNodes.length > 0 && j[i].childNodes[0].classList.contains('selected')) {

                        if (j[i].childNodes[0].classList.contains('king')) {

                            king = true;
                        }

                        positionCurrent = i;
                    }

                    if (j[i].classList.contains('move')) {

                        movePosition = i;
                    }

                }

                e.target.classList.remove('move');

                var positioni;
                var positionj;

                var movepositioni;
                var movepositionj;

                for (let i = 0; i < position.length; i++) {

                    for (let j = 0; j < position[i].length; j++) {

                        if (position[i][j] == positionCurrent) {

                            positioni = i;
                            positionj = j;
                        }

                        if (position[i][j] == movePosition) {

                            movepositioni = i;
                            movepositionj = j;
                        }

                    }
                }

                if (checkJump(e) == true) {

                    jumpable = true;
                }


                if (king == true) {

                    if (positionCurrent > 15) {

                        if ((pieces[positioni - 1][positionj - 1] == -1 || pieces[positioni - 1][positionj - 1] == -2) && pieces[positioni - 2][positionj - 2] == 0 && positioni - 2 == movepositioni && positionj - 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni - 1][positionj - 1] = 0;
                            pieces[movepositioni][movepositionj] = 2;
                            turn = 2;
                            addPieces();
                            return;
                        }

                        if ((pieces[positioni - 1][positionj + 1] == -1 || pieces[positioni - 1][positionj + 1] == -2) && pieces[positioni - 2][positionj + 2] == 0 && positioni - 2 == movepositioni && positionj + 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni - 1][positionj + 1] = 0;
                            pieces[movepositioni][movepositionj] = 2;
                            turn = 2;
                            addPieces();
                            return;
                        }

                    }

                    if (positionCurrent < 48) {

                        if ((pieces[positioni + 1][positionj + 1] == -1 || pieces[positioni + 1][positionj + 1] == -2) && pieces[positioni + 2][positionj + 2] == 0 && positioni + 2 == movepositioni && positionj + 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni + 1][positionj + 1] = 0;
                            pieces[movepositioni][movepositionj] = 2;
                            turn = 2;
                            addPieces();
                            return;
                        }

                        if ((pieces[positioni + 1][positionj - 1] == -1 || pieces[positioni + 1][positionj - 1] == -2) && pieces[positioni + 2][positionj - 2] == 0 && positioni + 2 == movepositioni && positionj - 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni + 1][positionj - 1] = 0;
                            pieces[movepositioni][movepositionj] = 2;
                            turn = 2;
                            addPieces();
                            return;
                        }

                    }

                    if (((positioni + 1 == movepositioni && positionj + 1 == movepositionj) || (positioni + 1 == movepositioni && positionj - 1 == movepositionj) || (positioni - 1 == movepositioni && positionj - 1 == movepositionj) || (positioni - 1 == movepositioni && positionj + 1 == movepositionj))
                        && (pieces[movepositioni][movepositionj] != -1) && (pieces[movepositioni][movepositionj] != 1)
                    ) {

                        pieces[positioni][positionj] = 0;
                        pieces[movepositioni][movepositionj] = 2;
                        turn = 2;
                        addPieces();
                        return;
                    }

                }

                if (jumpable == true && positioni - 2 == movepositioni && positionj + 2 == movepositionj) {

                    pieces[positioni][positionj] = 0;
                    pieces[positioni - 1][positionj + 1] = 0;
                    pieces[movepositioni][movepositionj] = 1;

                    if (movePosition < 8) {
                        pieces[movepositioni][movepositionj] = 2;
                    }

                    turn = 2;
                    addPieces();
                    return;
                } else if (jumpable == true && positioni - 2 == movepositioni && positionj - 2 == movepositionj) {

                    pieces[positioni][positionj] = 0;
                    pieces[positioni - 1][positionj - 1] = 0;
                    pieces[movepositioni][movepositionj] = 1;

                    if (movePosition < 8) {
                        pieces[movepositioni][movepositionj] = 2;
                    }

                    turn = 2;
                    addPieces();
                    return;

                }

                if (((positioni - 1 == movepositioni && positionj + 1 == movepositionj) || (positioni - 1 == movepositioni && positionj - 1 == movepositionj)) && pieces[movepositioni][movepositionj] != -1) {

                    pieces[positioni][positionj] = 0;
                    pieces[movepositioni][movepositionj] = 1;

                    if (movePosition < 8) {
                        pieces[movepositioni][movepositionj] = 2;
                    }

                    turn = 2;
                    addPieces();
                } else {
                    console.log("Unmovable")
                }
            }
        }
    } else if (turn == 2) {

        if (k) {

            if (e.target.classList.contains('selected') != true) {

                var positionCurrent = "";
                var movePosition = "";
                e.target.classList.add('move');

                for (i = 0; i < j.length; i++) {

                    if (j[i].childNodes.length > 0 && j[i].childNodes[0].classList.contains('selected')) {

                        if (j[i].childNodes[0].classList.contains('king')) {

                            king = true;
                        }

                        positionCurrent = i;
                    }

                    if (j[i].classList.contains('move')) {

                        movePosition = i;
                    }

                }

                e.target.classList.remove('move');

                var positioni;
                var positionj;

                var movepositioni;
                var movepositionj;

                for (let i = 0; i < position.length; i++) {

                    for (let j = 0; j < position[i].length; j++) {

                        if (position[i][j] == positionCurrent) {

                            positioni = i;
                            positionj = j;
                        }

                        if (position[i][j] == movePosition) {

                            movepositioni = i;
                            movepositionj = j;
                        }
                    }
                }

                if (checkJump(e) == true) {

                    jumpable = true;
                }

                if (king == true) {

                    if (positionCurrent > 15) {

                        if ((pieces[positioni - 1][positionj - 1] == 1 || pieces[positioni - 1][positionj - 1] == 2) && pieces[positioni - 2][positionj - 2] == 0 && positioni - 2 == movepositioni && positionj - 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni - 1][positionj - 1] = 0;
                            pieces[movepositioni][movepositionj] = -2;
                            turn = 1;
                            addPieces();
                            return;
                        }

                        if ((pieces[positioni - 1][positionj + 1] == 1 || pieces[positioni - 1][positionj + 1] == 2) && pieces[positioni - 2][positionj + 2] == 0 && positioni - 2 == movepositioni && positionj + 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni - 1][positionj + 1] = 0;
                            pieces[movepositioni][movepositionj] = -2;
                            turn = 1;
                            addPieces();
                            return;
                        }


                    }

                    if (positionCurrent < 48) {

                        if ((pieces[positioni + 1][positionj + 1] == 1 || pieces[positioni + 1][positionj + 1] == 2) && pieces[positioni + 2][positionj + 2] == 0 && positioni + 2 == movepositioni && positionj + 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni + 1][positionj + 1] = 0;
                            pieces[movepositioni][movepositionj] = -2;
                            turn = 1;
                            addPieces();
                            return;
                        }

                        if ((pieces[positioni + 1][positionj - 1] == 1 || pieces[positioni + 1][positionj - 1] == 2) && pieces[positioni + 2][positionj - 2] == 0 && positioni + 2 == movepositioni && positionj - 2 == movepositionj) {

                            pieces[positioni][positionj] = 0;
                            pieces[positioni + 1][positionj - 1] = 0;
                            pieces[movepositioni][movepositionj] = -2;
                            turn = 1;
                            addPieces();
                            return;
                        }

                    }

                    if (((positioni + 1 == movepositioni && positionj + 1 == movepositionj) || (positioni + 1 == movepositioni && positionj - 1 == movepositionj) || (positioni - 1 == movepositioni && positionj - 1 == movepositionj) || (positioni - 1 == movepositioni && positionj + 1 == movepositionj))
                        && (pieces[movepositioni][movepositionj] != -1) && (pieces[movepositioni][movepositionj] != 1)
                    ) {

                        pieces[positioni][positionj] = 0;
                        pieces[movepositioni][movepositionj] = -2;
                        turn = 1;
                        addPieces();
                        return;
                    }

                }

                if (jumpable == true && positioni + 2 == movepositioni && positionj + 2 == movepositionj) {

                    pieces[positioni][positionj] = 0;
                    pieces[positioni + 1][positionj + 1] = 0;
                    pieces[movepositioni][movepositionj] = -1;

                    if (movePosition > 55) {
                        pieces[movepositioni][movepositionj] = -2;
                    }
                    turn = 1;
                    addPieces();
                    return;
                } else if (jumpable == true && positioni + 2 == movepositioni && positionj - 2 == movepositionj) {

                    pieces[positioni][positionj] = 0;
                    pieces[positioni + 1][positionj - 1] = 0;
                    pieces[movepositioni][movepositionj] = -1;

                    if (movePosition > 55) {
                        pieces[movepositioni][movepositionj] = -2;
                    }
                    turn = 1;
                    addPieces();
                    return;

                }

                if (((positioni + 1 == movepositioni && positionj + 1 == movepositionj) || (positioni + 1 == movepositioni && positionj - 1 == movepositionj)) && pieces[movepositioni][movepositionj] != 1) {

                    pieces[positioni][positionj] = 0;
                    pieces[movepositioni][movepositionj] = -1;

                    if (movePosition > 55) {
                        pieces[movepositioni][movepositionj] = -2;
                    }
                    turn = 1;
                    addPieces();
                    return;
                } else {
                    console.log("Unmovable")
                    return;
                }
            }
        }
    }

}

function clearBoard() {

    var j = document.querySelectorAll('#game-board .blackPiece')
    var k = document.querySelectorAll('#game-board .redPiece')

    for (i = 0; i < k.length; i++) {

        k[i].parentNode.removeChild(k[i]);
    }

    for (p = 0; p < j.length; p++) {
        j[p].parentNode.removeChild(j[p]);

    }
}

function checkJump(e) {

    let j = document.querySelectorAll('#game-board .row .col');
    var positionCurrent = "";
    var positioni;
    var positionj;

    for (i = 0; i < j.length; i++) {

        if (j[i].childNodes.length > 0 && j[i].childNodes[0].classList.contains('selected')) {

            positionCurrent = i;
        }
    }

    for (let i = 0; i < position.length; i++) {

        for (let j = 0; j < position[i].length; j++) {

            if (position[i][j] == positionCurrent) {

                positioni = i;
                positionj = j;
            }

        }
    }

    if (pieces[positioni][positionj] == 2 || pieces[positioni][positionj] == -2) {

        return false;
    }

    if (turn == 1) {

        if (positioni - 1 == 0) {

            return false;
        }

        if ((pieces[positioni - 1][positionj + 1] == -1 || pieces[positioni - 1][positionj + 1] == -2) && pieces[positioni - 2][positionj + 2] == 0) {

            return true;
        } else if ((pieces[positioni - 1][positionj - 1] == -1 || pieces[positioni - 1][positionj - 1] == -2) && pieces[positioni - 2][positionj - 2] == 0) {


            return true;
        }

    } else if (turn == 2) {

        if (positioni + 1 == 7) {

            return false;
        }

        if ((pieces[positioni + 1][positionj + 1] == 1 || pieces[positioni + 1][positionj + 1] == 2) && pieces[positioni + 2][positionj + 2] == 0) {

            return true;
        } else if ((pieces[positioni + 1][positionj - 1] == 1 || pieces[positioni + 1][positionj - 1] == 2) && pieces[positioni + 2][positionj - 2] == 0) {

            return true;
        }
    }

    return false;

}

function checkWin() {

    var blackCount = 0;
    var redCount = 0;

    for (i = 0; i < pieces.length; i++) {

        for (j = 0; j < pieces[i].length; j++) {

            if (pieces[i][j] == -1 || pieces[i][j] == -2) {
                blackCount++;
            }

            if (pieces[i][j] == 1 || pieces[i][j] == 2) {

                redCount++;

            }

        }
    }

    if (blackCount == 0) {

        gamestate.innerHTML = "Red wins";

        return true;


    } else if (redCount == 0) {

        gamestate.innerHTML = "Black wins";

        return true;

    }

    return false;

}

function restartGame() {

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

    go.innerHTML = "";
    createGameBoard()
    addPieces()
    gamestate.innerHTML = "restart";
    turn = 1;
}


createGameBoard()
addPieces()

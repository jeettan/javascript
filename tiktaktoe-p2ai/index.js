let one = document.getElementById('1');
let two = document.getElementById('2');
let three = document.getElementById('3');
let four = document.getElementById('4');
let five = document.getElementById('5');
let six = document.getElementById('6');
let seven = document.getElementById('7');
let eight = document.getElementById('8');
let nine = document.getElementById('9');
let result = document.getElementById('result');
let button = document.getElementById('reset');

let overallTurn = 0;

var checked = {

  1: "unchecked",
  2: "unchecked",
  3: "unchecked",
  4: "unchecked",
  5: "unchecked",
  6: "unchecked",
  7: "unchecked",
  8: "unchecked",
  9: "unchecked",
}

button.addEventListener('click', function () {

  initializeGame()

  checked = {

    1: "unchecked",
    2: "unchecked",
    3: "unchecked",
    4: "unchecked",
    5: "unchecked",
    6: "unchecked",
    7: "unchecked",
    8: "unchecked",
    9: "unchecked",
  }

  result.textContent = ""
  overallTurn = 0;

})

function initializeGame() {

  one.innerHTML = "";
  two.innerHTML = "";
  three.innerHTML = "";
  four.innerHTML = "";
  five.innerHTML = "";
  six.innerHTML = "";
  seven.innerHTML = "";
  eight.innerHTML = "";
  nine.innerHTML = "";

  one.addEventListener('click', handleClick);
  two.addEventListener('click', handleClick);
  three.addEventListener('click', handleClick);
  four.addEventListener('click', handleClick);
  five.addEventListener('click', handleClick);
  six.addEventListener('click', handleClick);
  seven.addEventListener('click', handleClick);
  eight.addEventListener('click', handleClick);
  nine.addEventListener('click', handleClick);
}

initializeGame();

function removeListenerAll() {


  one.removeEventListener('click', handleClick);
  two.removeEventListener('click', handleClick);
  three.removeEventListener('click', handleClick);
  four.removeEventListener('click', handleClick);
  five.removeEventListener('click', handleClick);
  six.removeEventListener('click', handleClick);
  seven.removeEventListener('click', handleClick);
  eight.removeEventListener('click', handleClick);
  nine.removeEventListener('click', handleClick);

}

function addCircle(elementId) {

  let img = document.createElement('img');
  img.src = './images/circle.png';
  img.style.width = "60px";
  elementId.appendChild(img);
}

function addX(numb) {

  let img = document.createElement('img');
  img.src = './images/x.png';
  img.style.width = "60px";
  let elementId = document.getElementById(numb)
  elementId.appendChild(img);
  elementId.removeEventListener('click', handleClick);
  checked[numb] = "x";
}

function handleClick(e) {


  if (checked[e.target.id] == "unchecked") {

    addCircle(e.target);
    checked[e.target.id] = "o";

    overallTurn++;

    if (checkWinCondition() == true) {

      return;
    }

    e.target.removeEventListener('click', handleClick);
    AIXMove();

  }

}

function AIXMove() {

  let isSquareAvailable = false;

  let random;

  while (isSquareAvailable == false) {

    random = Math.floor((Math.random() * 9) + 1);

    if (checked[random] == "unchecked") {

      isSquareAvailable = true;

    }

  }
  overallTurn++;
  addX(random);
  checkWinCondition()
}

function checkWinCondition() {

  if (checked[1] == "o" && checked[2] == "o" && checked[3] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  } else if (checked[4] == "o" && checked[5] == "o" && checked[6] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  } else if (checked[7] == "o" && checked[8] == "o" && checked[9] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  } else if (checked[1] == "o" && checked[4] == "o" && checked[7] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  } else if (checked[5] == "o" && checked[2] == "o" && checked[8] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  } else if (checked[3] == "o" && checked[6] == "o" && checked[9] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  } else if (checked[1] == "o" && checked[5] == "o" && checked[9] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  } else if (checked[3] == "o" && checked[5] == "o" && checked[7] == "o") {

    removeListenerAll()
    result.innerHTML = "O wins";
    return true;
  }

  if (checked[1] == "x" && checked[2] == "x" && checked[3] == "x") {

    removeListenerAll()
    result.innerHTML = "X wins";
    return true;
  } else if (checked[4] == "x" && checked[5] == "x" && checked[6] == "x") {

    removeListenerAll()
    result.innerHTML = "X wins";
    return true;
  } else if (checked[7] == "x" && checked[8] == "x" && checked[9] == "x") {

    removeListenerAll()
    result.innerHTML = "X wins";
    return true;
  } else if (checked[1] == "x" && checked[4] == "x" && checked[7] == "x") {

    removeListenerAll()
    result.innerHTML = "X wins";
    return true;
  } else if (checked[5] == "x" && checked[2] == "x" && checked[8] == "x") {

    removeListenerAll()
    result.innerHTML = "x wins";
    return true;
  } else if (checked[3] == "x" && checked[6] == "x" && checked[9] == "x") {

    removeListenerAll()
    result.innerHTML = "X wins";
    return true;
  } else if (checked[1] == "x" && checked[5] == "x" && checked[9] == "x") {

    removeListenerAll()
    result.innerHTML = "X wins";
    return true;
  } else if (checked[3] == "x" && checked[5] == "x" && checked[7] == "x") {

    removeListenerAll()
    result.innerHTML = "X wins";
    return true;
  } else if (overallTurn >= 9) {

    removeListenerAll()
    result.innerHTML = "Draw";
    return true;
  }

  return false;

}



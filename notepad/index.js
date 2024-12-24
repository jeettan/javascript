var textarea = document.getElementById('t-area');
var note = document.getElementsByClassName('note-dump')[0];

function deleteThing() {

    textarea.value = "";
}

function addNote() {

    let img = document.createElement('img');

    img.src = "images/x-mark.png";
    img.style.width = "20px";
    img.style.height = "20px";
    img.classList.add('img-class');

    img.addEventListener('click', function () {

        var k = document.getElementsByClassName('note-dump')[0];

        var index = 0;
        var result = this.parentElement.parentElement

        while (result != null) {

            result = result.previousSibling;
            index++;

        }

        k.removeChild(k.children[index - 1]);
    })

    let newElement = document.createElement('div');
    let newnewdiv = document.createElement('div');
    let elementinelement = document.createElement('div');
    elementinelement.classList.add('text-area-two');
    elementinelement.innerText = textarea.value;

    newnewdiv.appendChild(img);
    newElement.appendChild(newnewdiv);
    newElement.appendChild(elementinelement);

    newElement.classList.add('note-item');
    newElement.style.boxShadow = "1px 1px 1px rgba(0, 0, 0, 0.4)";
    newElement.style.height = "250px";
    newElement.style.width = "250px";
    newElement.style.backgroundColor = "yellow";
    note.appendChild(newElement);

}

function save() {

    clearStorage();

    try {

        var k = document.getElementsByClassName('note-dump')[0];
        var count = k.childElementCount;

        if (count == 0) {

            window.localStorage.clear();

        }

        for (i = 0; i < count; i++) {

            var j = k.children[i].children[1].innerHTML;
            var note = "note";
            note = note + i;
            localStorage.setItem(note, j);
        }

        console.log(localStorage)
    } catch (err) {

        console.log(err);
    }

}

function clearStorage() {

    window.localStorage.clear();
    console.log("Cleared");
}

window.onload = function () {

    var note1 = document.getElementsByClassName('note-dump')[0];


    var note = "note";
    var item = "";
    var index = 0;

    while (item != null) {

        note = "note";
        note = note + index;
        item = localStorage.getItem(note);

        if (item == null) {

            break;
        }

        let img = document.createElement('img');

        img.src = "images/x-mark.png";
        img.style.width = "20px";
        img.style.height = "20px";
        img.classList.add('img-class');

        img.addEventListener('click', function () {

            var k = document.getElementsByClassName('note-dump')[0];

            var index = 0;
            var result = this.parentElement.parentElement

            while (result != null) {

                result = result.previousSibling;
                index++;

            }

            k.removeChild(k.children[index - 1]);
        })

        let newElement = document.createElement('div');
        let newnewdiv = document.createElement('div');
        let elementinelement = document.createElement('div');
        elementinelement.classList.add('text-area-two');
        elementinelement.innerText = item;

        newnewdiv.appendChild(img);
        newElement.appendChild(newnewdiv);
        newElement.appendChild(elementinelement);

        newElement.classList.add('note-item');
        newElement.style.boxShadow = "1px 1px 1px rgba(0, 0, 0, 0.4)";
        newElement.style.height = "250px";
        newElement.style.width = "250px";
        newElement.style.backgroundColor = "yellow";
        note1.appendChild(newElement);
        index++;
    }

    console.log("onload")

};
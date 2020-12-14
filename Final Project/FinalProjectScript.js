var keyboard = {
    //Q
    81: 'C',
    //2
    50: 'Db',
    //W
    87: 'D',
    //3
    51: 'Eb',
    //E
    69: 'E',
    //F
    82: 'F',
    //5
    53: 'Gb',
    //T
    84: 'G',
    //6
    54: 'Ab',
    //Y
    89: 'A',
    //7
    55: 'Bb',
    //Y
    85: 'B',
}

var functionsOnKey = {
        'C': [],
        'Db': [],
        'D': [],
        'Eb': [],
        'E': [],
        'F': [],
        'Gb': [],
        'G': [],
        'Ab': [],
        'A': [],
        'Bb': [],
        'B': []
}

//following: https://www.youtube.com/watch?v=vjco5yKZpU8
const keys = document.querySelectorAll('.key');
const TEMPO = 1000;

keys.forEach(key => {
    key.addEventListener('mousedown', () => playFromInput(key));
    key.addEventListener('mouseup', () => {
        key.classList.remove('active');
    });
});


document.addEventListener('keydown', e => {
    let index = e.code.slice(-1).charCodeAt(0);
    let note = keyboard[index];
    let key=document.querySelectorAll(`[data-note='${note}']`)[0];
    key.classList.add('active');
    try {playFromInput(key);}
    catch (error) {}
});

const functionLists = document.querySelectorAll('.functionList');
functionLists.forEach(functionList => {
    var functions = functionList.children[1];
    var panel = functionList.children[0];
    var note = functionList.dataset.note;
    var addF = panel.children[0];
    var addG = panel.children[1];
    var listOnNote = functionsOnKey[note];
    addF.addEventListener('click', () => {
        if(listOnNote.slice(-1)[0]=="F") {
            listOnNote.pop();
            //reconstruct the list
            functions.innerHTML = '';
            for(var i=0; i<listOnNote.length; i++) {
                let letter;
                if(listOnNote[i]=='F') letter = '&Phi;';
                else if(listOnNote[i]=='G') letter = '&Gamma;';
                functions.innerHTML += `<div>${letter}</div>`;
            }
        } else {
            functions.innerHTML += '<div>&Phi;</div>';
            listOnNote.push('F');
        }
    });
    addG.addEventListener('click', () => {
        if(listOnNote.slice(-1)[0]=='G') {
            listOnNote.pop();
            //reconstruct the list
            functions.innerHTML = '';
            for(var i=0; i<listOnNote.length; i++) {
                let letter;
                if(listOnNote[i]=='F') letter = '&Phi;';
                else if(listOnNote[i]=='G') letter = '&Gamma;';
                functions.innerHTML += `<div>${letter}</div>`;
            }
        } else {
            functions.innerHTML += '<div>&Gamma;</div>';
            listOnNote.push('G');
        }
    });
});


function playFromInput(key) {
    let note = key.dataset.note;
    noteAudio = playNote(note);
    key.classList.add('active');
    setTimeout(function() {playInvolutions(note)}, 3000);
}

function playInvolutions(note) {
    if(functionsOnKey[note].length > 0) {
        note = calculateNextNote(note);
        playNote(note);
        setTimeout(function() {playInvolutions(note)}, 3000);
    }
}

function playNote(note) {
    const noteAudio = document.getElementById(note);
    noteAudio.currentTime = 0;
    noteAudio.play();
    return noteAudio;
}

function calculateNextNote(key) {
    let notes = Object.keys(functionsOnKey);
    let n = notes.indexOf(key);
    let functionList = functionsOnKey[key];
    let func;
    for(var i=0; i<functionList.length; i++) {
        func = functionList[i];
        if(func=='F') {
            n = F(n);
        } else if (func=='G') {
            n = G(n);
        }
    }
    return notes[n];
}

function F(n) {
    let result = (-n)%12;
    if(result<0) result += 12;
    return result;
}

function G(n) {
    let result = (1-n)%12;
    if(result<0) result += 12;
    return result;
}
let start;
var end;
let correctWordCount = 0;
let originalWords;
let isCounting = false;
let quoteIndex = 0; 
let text;
let jsonData;
let numberOfQuotes;


const errorBlock = document.getElementById('error');
const progressBar = document.getElementById('progress');



function nextQuote(quoteIndex) {
    const quote = jsonData.text[quoteIndex];
    return quote;
}

function calculateWPM(start, end, count) {
    const elapsedSeconds = (end - start) / 1000;
    const minutes = elapsedSeconds / 60;
    const wpm = count / minutes;
    return wpm.toFixed(2);

}

function calculateAccuracy(correct, total) {
    const accuracy = (correct / total) * 100;
    return accuracy.toFixed(2); // rounds up and down to specified digits
}

function startCounting() {
    start = new Date();
    isCounting = true;
}

let wpm;
let accuracy;
function stopCounting() {
    if (!isCounting) return;
    end = new Date();
    isCounting = false;
    wpm = calculateWPM(start, end, inputWordCount);
    accuracy = calculateAccuracy(correctWordCount, originalWordCount);
    console.log("word count was", originalWordCount);
    console.log(`WPM: ${wpm}`);
    console.log(`Accuracy: ${accuracy}%`);
}
function compareWords(inputWords, originalWords) {
    let count = 0;
    for (let i = 0; i < inputWords.length; i++) {
        if (inputWords[i] == originalWords[i]) {
            count++;
        }
        
    }
    return count;
}

function compareLetters(inputText, original) {
    let count = 0;
    let error = false
    for (i = 0; i < inputText.length; i++) {
        if (inputText[i] == original[i]) {
            count++;
        }
        else {
            error = true;
        }
    if (error) {
        errorBlock.style.backgroundColor = 'red'
    }
    else {
        errorBlock.style.backgroundColor = 'green';}
    }
    return count;
}


function toWordList(text) {
    const words = text.split(/\s+/);
    return words;
}

const wpmElement = document.getElementById('wpm');
const wordCountElement = document.getElementById('original');
const accuracyElement = document.getElementById('accuracy');
function displayResults() {
    wpmElement.textContent = wpm;
    // wordCountElement.textContent = originalWordCount;
    accuracyElement.textContent = `${accuracy}%`;
}

// send your results to the DB in a post request
async function postStats(accuracy) {
    console.log("inside posStats func");
    if (!accuracy) {
        console.log("accuracy has not been set");
        return;
    }
    console.log("the accuracy value is: ", accuracy)
    await fetch('/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // headers: {'Content-Type': 'text/plain'},
        // this works:
        body: JSON.stringify({'wpm': wpm, 'accuracy': accuracy}),
        // it doesnt accept a reg object, it has to be converted into json
        // body: {'wpm': wpm, 'accuracy': accuracy}
        // body: accuracy

    })
    .then(response => response.json())
    .then(data => {
        console.log("the data is", data);
    })
    .catch(error => {
        console.error("an error occurred: ", error);
    })
};


let inputWordCount;
let originalWordCount;
function block() {
// previously i had "DOMContentLoaded" and it wasn't working, it is probably the fact that i am using a live server extension
// or maybe it was the fact that i was executing this block function inside a fetch function. 
// solution: it is the fact that  block() runs inside fetch
    text = nextQuote(0);
    document.getElementById("text").textContent = text;
    originalWords = toWordList(text);
    originalWordCount = originalWords.length;
   

    const button = document.getElementById("next-quote");
    button.addEventListener("click", function() {
        if (quoteIndex < (numberOfQuotes - 1) ) {
            quoteIndex++
        }
        else {
            quoteIndex = 0;
            
        };
        text = nextQuote(quoteIndex);   
        document.getElementById("text").textContent = text;
        originalWords = toWordList(text);
        originalWordCount = originalWords.length;
    });
    const input = document.getElementById("my-text-area");
    input.addEventListener('input', function(event) {
        const inputWords = toWordList(event.target.value);
        inputWordCount = inputWords.length;
        correctWordCount = compareWords(inputWords, originalWords);


        const correctLetterCount = compareLetters(event.target.value, text);
        // width set to a max of 90% to fit with the other widths
        const width = (correctLetterCount / text.length) * 100;
        progressBar.style.width = `${width}%`;
        progressBar.style.height = '6px';
    });

    input.addEventListener("focus", startCounting);
    input.addEventListener("keydown", function(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
         
            event.target.value = '';
            stopCounting();
            displayResults();
            postStats(accuracy)
        };
    });


};



async function fetchData() {
    try {
        const response = await fetch("texts.json");
        jsonData = await response.json();
        numberOfQuotes = jsonData.text.length;
        console.log("inside fetchData func");
        block();
    

    } 
    catch(error) {
        console.log("error loading json: ", error);
    }
};


fetchData();





const quoteContainer = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// to get a single Quote using random function
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // console.log(quote);
    quoteText.textContent = quote.text;
    // authorText.textContent = quote.author;  --> avoid to handle NULL values for author
    // check if author field is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent = 'unknown';
    }
    else {
        authorText.textContent = quote.author;
    }

    //check quote length to determine the styling and font size

    if(quote.text.length > 70){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

//to get quotes from an API:

async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
    }
    catch(error){
        // alert -- catch error here
    }
}

//tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//ONLOAD -- to run the function as soon as the page loads. 

getQuotes();

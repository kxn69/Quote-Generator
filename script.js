/* eslint-disable semi */
/* eslint-disable space-before-function-paren */

const quoteContainer = document.querySelector('#quote-generator');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('.author');
const xBtn = document.querySelector('#x');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('.loader');

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show New Quote
function newQuote() {
  loading();
  //   Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  const author = quote.author.split(',')[0];

  //   To check if author field is blank and replace with unknown
  if (!author || author === 'type.fit') {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote');
  }
  //   Set Quote and hide Loader
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  // Get Quotes API
  try {
    const response = await fetch('https://type.fit/api/quotes');
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error)
  }
}

// Tweet quote
function tweetQUote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', tweetQUote);

// Onload
getQuotes();

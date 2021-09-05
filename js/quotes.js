const quotes = [
  {
    quote: "The value of a man resides in what he gives and not in what he is capable of receiving.",
    author: "Albert Einstein",
  },
  {
    quote: "The less their ability, the more their conceit.",
    author: "Ahad HaAm",
  },
  {
    quote: "There is no great genius without some touch of madness.",
    author: "Seneca",
  },
  {
    quote: "Genius is nothing but a great capacity for patience.",
    author: "Buffon",
  },
  {
    quote: "The more things a man is ashamed of, the more respectable he is.",
    author: "George Bernard Shaw",
  },
  {
    quote: "With regard to excellence, it is not enough to know, but we must try to have and use it.",
    author: "Aristotle",
  },
  {
    quote: "Never bend your head. Hold it high. Look the world straight in the eye.",
    author: "Helen Keller",
  },
  {
    quote: "The farther behind I leave the past, the closer I am to forging my own character.",
    author: "Isabelle Eberhardt",
  },
  {
    quote: "There is never ebough time, unless you're serving it.",
    author: "Malcolm Forbes",
  },
  {
    quote: "I don't think of the past. The only thing that matters is the everlasting present.",
    author: "William Somerset Maugham",
  }
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
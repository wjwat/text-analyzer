// Utility Logic

function noWord(word) {
  return (word.trim().length === 0)
}

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic

function wordCounter(text) {
  if (noWord(text)) {
    return 0;
  }

  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noWord(word) || noWord(text)) {
    return 0;
  }

  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

// UI Logic

function boldPassage(word, text) {
  if (noWord(word) || noWord(text)) {
    return "";
  }

  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

// $(document).ready(function(){
//   $("form#word-counter").submit(function(event){
//     event.preventDefault();
//     const passage = $("#text-passage").val();
//     const word = $("#word").val();
//     const wordCount = wordCounter(passage);
//     const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
//     $("#total-count").html(wordCount);
//     $("#selected-count").html(occurrencesOfWord);
//     $("#bolded-passage").html(boldPassage(word, passage));
//   });
// });

const passage = "fart This is a test passage. This is another fart fart fart test test test test test passage. This is a fart."
//const passage = '2 1 2 491 1 1 abc abc fart abc 101 83 1 10 38 72911 10  2 2 2 2 2 2 2 2 2 2 2 2'
const word = "fart"
const wordCount = wordCounter(passage);
const occurrencesOfWord = numberOfOccurrencesInText(word, passage);

// let newCount = passage.split(' ').filter(e => {
//   return !Number(e);
// })

// What happens if a word is separated by some other whitespace that isn't
// a space?
//
// Do objects preserve insertion order? Yes, but only for strings. For int
// keys they are stored in ascending order.
function uniqWordsCount(passage) {
  const words = passage.split(' ');
  let counts = {};
  let sortedUniq = new Map();

  for (let ele of words) {
    // If a 'word' is an empty string, or if it is a number
    // then skip it.
    if (noWord(ele) || Number(ele)) {
      continue;
    }
    // if counts[ele] exists then set value of counts[ele]
    // to pre-existing value + 1, else set it to 1.
    counts[ele] = counts[ele] ? counts[ele] + 1 : 1;
  }

  // Turn our object into an array whose elements are an array of
  // length === 2.
  Object.entries(counts)
        // sort that array in descending order by the value of
        // the second element (the count of the word)
        .sort(([,a], [,b]) => b - a)
        // Take that sorted array and turn it into a Map object
        // to preserve insertion order so we can use it for all
        // kinds of keys
        .forEach(([k, v]) => {
          sortedUniq.set(k, v);
        });

  return sortedUniq;
}

// Returns a Map object
let x = uniqWordsCount(passage);

// How do we display the top three unique words?

// This feels stupid
let i = 0;
for (const k of x.keys()) {
  if (i === 3) {
    break;
  }
  console.log(k);
  i++;
}

const k = [...x.keys()];
const v = [...x.values()];

console.log(k.slice(0, 3), v.slice(0, 3));

const ent = [...x.entries()]

console.log(ent.slice(0, 3));

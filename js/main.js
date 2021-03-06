const OFFENSIVE_WORDS = ['zoinks', 'muppeteer', 'biffaroni', 'loopdaloop']

// Utility Logic

function noWord(word) {
  return (word.trim().length === 0)
}

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}


// These two functions are a huge pain in the ass compared to using regex.
//
// Returns an array containing the beginning index of all occurrences of
// sub within passage, which we can use with replaceAllByIndices to keep
// string case.
function _getSubStrIndices(passage, sub) {
  let p = passage.toLowerCase();
  let s = sub.toLowerCase();

  let position = p.indexOf(s);
  let indices = [];

  while (position !== -1) {
    indices.push(position);
    position = p.indexOf(s, position + 1);
  }

  return indices;
}

// Working backwards this inserts substring in place
// of original case insensitively.
function _replaceAllInsensitive(passage, orig, sub) {
  let p = passage;
  let s = sub;
  let indices = _getSubStrIndices(passage, orig).reverse();

  indices.forEach(i => {
    p = p.slice(0, i) + s + p.slice(i+orig.length)
    console.log(p);
  })

  return p;
}

// Same thing as the two above, but much better.
// Is it faster though?
// How do we measure speed with JavaScript?
function replaceAllInsensitive(passage, orig, sub) {
  let reg = new RegExp(`${orig}`, 'ig');

  return passage.replace(reg, sub);
}

// TODO: Implement some functionality to include various types of white-
// space other than just your standard ASCII space. Tabs, newlines, unicode
// whitespace. I'm sure there are others I'm forgetting.
function splitPassage(passage) {
  return passage.split(' ');
}

// A word, as we are defining it, is a string that has been trimmed of
// whitespace, and does not contain whitespace. To extend this function
// we only need edit `c` to include more punctuation characters we'd like
// to trim.
function puncTrimWord(word) {
  const c = '.,\/!?:;&'
  const regex = new RegExp(`^[${c}]|[${c}]$`, 'g')

  return word.replace(regex, '');
}

// I'm considering this a utility function because it is generic enough to
// be cut & paste in any other application in which we might want to use it.
// On a second look though it's not completely portable, but I'm not sure I
// want to push that rock up the hill to make it so.
// passage should be a string, and words should be an array
function replaceWord(passage, words) {
  let r = passage;

  words.forEach(word => {
    // Construct a replacement string of the same length as the word to be
    // replaced. May move this out to make it fun.
    replacement = ''.padStart(word.length, '*');

    r = r.replaceAll(word, replacement);
  })
  return r;
}

// Return the top three entries from our Map obj which we cannot iterate
// over in any kind of (imo) reasonable way so we spread it and return a
// slice of the first three items.
// [[firstStr, firstStrCount], [secondStr, secondStrCount], ...]
function topThree(mapObj) {
  return [...mapObj.entries()].slice(0, 3);
}

// Business Logic

function wordCounter(text) {
  if (noWord(text)) {
    return 0;
  }

  let wordCount = 0;
  const wordArray = splitPassage(text);
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

  const wordArray = splitPassage(text);
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

// `passage` should be a string, and returns a Map object.
//
// What happens if a word is separated by some other whitespace that isn't
// a space?
//
// Do objects preserve insertion order? Yes, but only for strings. For int
// keys they are stored in ascending order.
function uniqWordsCount(passage) {
  // This by itself is weak because if a character has punctuation either
  // before or after it then we determine it's a separate word.
  // ex: "This has a period."
  //          split => ['This', 'has', 'a', 'period.']
  //      preferred => ['This', 'has', 'a', 'period']
  const words = splitPassage(passage.toLowerCase()).map(puncTrimWord);
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

// UI Logic

function boldPassage(word, text) {
  if (noWord(word) || noWord(text)) {
    return "";
  }

  let htmlString = "<p>";
  let textArray = splitPassage(textArray);
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

function boldSubString(passage, sub) {
  if (noWord(sub) || noWord(passage)) {
    return "";
  }

  let newSub = '<b>' + sub + '</b>';

  return replaceAllInsensitive(passage, sub, newSub);
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

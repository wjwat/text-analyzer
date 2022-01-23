function noWord(word) {
  return (word.trim().length === 0)
}

function splitPassage(passage) {
  return passage.split(' ');
}

function puncTrimWord(word) {
  const c = '.,\/!?:;&'
  const regex = new RegExp(`^[${c}]|[${c}]$`, 'g')

  return word.replace(regex, '');
}

// For words beginning with a vowel, add "way" to the end. For Pig Latin, vowels
// are "a," "e," "i," "o," and "u." Don't treat "y" as a vowel. Examples: "away"
// becomes "awayway" and "okay" becomes "okayway."
//
// For words beginning with one or more consonants, move all of the first
// consecutive consonants to the end and add "ay". Examples: "code" becomes
// "odecay" and "move" becomes "ovemay."
//
// If the first consonants include "qu", move the "q" and the "u." Don't forget
// about words like "squeal" where "qu" doesn't come first! Examples: "quick"
// becomes "ickquay" while "squeal" becomes "quealsay."
const VOWELS = ['a', 'e', 'i', 'o', 'u']

// Pig latin has more rules than we are given in this exercise, but I'm not
// currently willing to go down that rabbit hole. According to the wikipedia
// article there are different ways to convert what you're saying into pig
// latin (depending).
//
// Rules regarding 'y' are from:
// https://reference.yourdictionary.com/resources/how-to-speak-pig-latin-basic-rules.html
function pigLatin(passage) {
  let pigified = [];
  let p = splitPassage(passage.toLowerCase());

  p.forEach(word => {
    word = puncTrimWord(word);

    // If a word starts with a VOWEL just push that word + 'way' onto our arr.
    if (VOWELS.indexOf(word[0]) > -1 && word[0] != 'y') {
      pigified.push(word + 'way');
    } else {
      // We keep track of the index outside of the loop so we can slice the
      // remainder of the word that we didn't iterate over and concat it with
      // our accumulated letters & 'ay'.
      let t = '', i = 0;
      for (i = 0; i < word.length; i++) {
        // Do we ever move other letters to the end of the word, or does 'qu'
        // mean we stop scanning?
        if (word[i] === 'q' && word[i+1] === 'u') {
          t += 'qu';
          i += 2;
          break;
        // treat 'y' as a vowel if it's not the first character in a word
        } else if (i > 0 && word[i] === 'y') {
          break;
        // consonant clusters
        } else if (VOWELS.indexOf(word[i]) < 0) {
          t += word[i];
        // We've hit a vowel so we're done
        } else {
          break;
        }
      }
      t = word.slice(i) + t + 'ay';
      pigified.push(t);
    }
  });

  return pigified.join(' ');
}

$(document).ready(e => {
  $('#pigify').on('click', c => {
    pigified = pigLatin($('#sentence').val());

    $('#display').html('<h2>'+pigified+'</h2>');
  })
})
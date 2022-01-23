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

function pigLatin(passage) {
  let pigified = [];
  let p = splitPassage(passage.toLowerCase());

  p.forEach(word => {
    word = puncTrimWord(word);

    if (VOWELS.indexOf(word[0]) > -1) {
      pigified.push(word + 'way');
    } else {
      pigified.push(word);
    }
  });

  return pigified.join(' ');
}

let t = 'This is my sentence!'

console.log(t);
console.log(pigLatin(t));

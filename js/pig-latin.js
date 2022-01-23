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

function pigLatin(passage) {
  let pigified = '';
  return pigified;
}

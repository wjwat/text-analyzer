const NUMERALS = {'M': 1000,
								 'CM': 900,
							    'D': 500,
								 'CD': 400,
								  'C': 100,
								 'XC': 90,
							   	'L': 50,
								 'XL': 40,
									'X': 10,
								 'IX': 9,
									'V': 5,
								 'IV': 4,
									'I': 1}

function convertToRoman(num) {
	// Without this we just push 'M' onto the return string until we finally drop
	// below 1000. Not sure which is preferable.
	// if (num > 3999) {
	// 	return "Number too big."
	// }
	let roman = '';

	for (let n in NUMERALS) {
		while (num >= NUMERALS[n]) {
			roman += n;
			num -= NUMERALS[n];
		}
	}

	return roman;
}

let test = [10, 99, 3999, 4000, 2021, 400, 600];

test.forEach(t => {
	console.log(t, intToRomanNumeral(t));
})
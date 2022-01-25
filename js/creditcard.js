function isCardValid(number) {
	if (number.length === 15) {
		if (number.slice(2) === '34' || number.slice(2) === '37') {
			return true;
		}
	} else if (number.length === 16) {
		return ['4', '5', '6'].some(e => e === number[0]);
	}

  return false;
}

function validateCardNumber(number) {
	// we should either guarantee that any number passed in has been
	// stripped of whitespace and does not contain alpha characters,
	// or do it ourselves here.
	let newCC = [...number].reverse();
	let valid = [];
	let t = 0;
	let x = 0;

	for (i = 0; i < newCC.length; i += 1) {
		x = 0;
		t = parseInt(newCC[i]);

		// Double every other digit
		if (i % 2 === 0) {
			t *= 2
		}

		// For double digits we sum the digits
		while (t) {
			x += t % 10;
			t = Math.floor(t / 10);
		}

		valid.push(x)
	}
	
	let z = valid.reduce((a, b) => a + b);

	if (z % 10) {
		return false;
	} else {
		return true;
	}
}



let cc = "4102080880435620"

console.log(isCardValid(cc));
console.log(cc.length)
console.log(validateCardNumber(cc));
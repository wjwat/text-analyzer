const BASE_VALUE = '0123456789abcdefghijklmnopqrstuvwxyz';

function charToDec(char) {
	return BASE_VALUE.indexOf(char);
}

function isCharInStr(char, str) {
	return str.indexOf(char) > -1
}

function strToDecimal(str, base) {
	let num = 0;
	let s = str.toLowerCase();

	// The thing I'm trying to do here is to check that every character in our
	// input `str` has a corresponding character in our BASE_VALUE so we can barf
	// on wrongfully inputted strings like %!({[]}) (etc), but I'm not sure what
	// the best way to do that is. Best way as in that middle ground of easily
	// expressed/understood, and least amount of overhead (func calls).
	for (const c of s) {
		let cVal = charToDec(c);
		if (cVal === -1 || cVal >= base) {
			console.error('Invalid character inputted for base '+ base +': ' + c)
			return num;
		}
	}

	// This is the same as above, but I'm not sure which is better so I've
	// commented it out in favor of what I see as being a more readable version.
	// Also this is missing the check to see if the value of a character is in our
	// BASE_VALUE string, but outside the bounds of our base parameter.

	//if (! [...s].every(c => {return isCharInStr(BASE_VALUE.slice(0, base), c)})) {
	// console.error('Unknown digit'); return num;
	// }

	for (let i = 0; i < s.length; i++) {
		let pos = s.length - 1 - i;

		num = num + charToDec(s[i]) * Math.pow(base, pos);
	}

	return num;
}

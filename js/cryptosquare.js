function isAlphaChar(char) {
	const reg = new RegExp(/[a-z]/, 'gi');
	return reg.test(char);
}

function normalizeMessage(message) {
	return [...message].filter(isAlphaChar).join('');
}

function groupByFive(message) {
	newMessage = '';
	for (let i = 0; i < message.length; i++) {
		if (i != 0 && i % 5 === 0) {
			newMessage += (' ');
		}
		newMessage += (message[i])
	}
	return newMessage;
}

function rotateMessage(message) {
	let newMessage = '';
	let columns = Math.ceil(Math.sqrt(message.length));
	// console.log(message.length, Math.sqrt(message.length), columns);

	for (let i = 0; i < columns; i++) {
		for (let c = i; c < message.length; c += columns) {
			newMessage += message[c];
		}
	}
	return newMessage;
}

function encrypt(message) {
	return rotateMessage(normalizeMessage(message));
}

let x = ["don't compare yourself to others, compare yourself to the person you were yesterday",
				 "Have a nice day. Feed the dog & chill out!",
				 "hello",
				 "hello y'all!",
				 'hel']

x.forEach(e => {
	console.log('=================================================================================');
	console.log(' original: ', normalizeMessage(e.toLowerCase()));
	console.log('encrypted: ', encrypt(e.toLowerCase()));
	console.log('  grouped: ', groupByFive(encrypt(e.toLowerCase())));
})

//normalizeMessage(t);
//populateBoardWithMessage(t);

//m = 'abcdefghijklmnvtsze9jnlkv'

// for (i = 0;i < 101; i++) {
// 	x = new Array(i+1).join('a')
// 	console.log(Cryptosquare(x));
// }

//console.log(m.length, Math.sqrt(m.length));
//console.log(Cryptosquare(m).length);
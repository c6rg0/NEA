const quiz_meta = new Map();

quiz_meta.set("Name", "Python quiz");
quiz_meta.set("Author", "Gabriel Drozbik");
quiz_meta.set("Date", 1592025);
quiz_meta.set("Length", 5);

const quiz_q = [];
quiz_q.push("", "", "", "", "");


const quiz_a = [];
quiz_a.push("", "", "", "", "");

let range = quiz_meta("Length");
range = range - 1;
let stop = 0

for (let i = 0; i < range; i++) {
	/* Display quiz_q[i]
	 * Test the answer
	 * Display condition
	 * Effect
	 * End */
}


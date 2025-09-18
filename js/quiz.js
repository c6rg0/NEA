const quiz_meta = new Map();

quiz_meta.set("Name", "Python quiz");
quiz_meta.set("Author", "Gabriel Drozbik");
quiz_meta.set("Date", 1592025);
quiz_meta.set("Length", 5);

const quiz_q = [];
quiz_q.push("", "", "", "", "");

const quiz_a = [];
quiz_a.push("", "", "", "", "");

/* Pre-quiz screen */

function start_quiz() {
	document.getElementById("game_title").innerHTML = "";
	document.getElementById("start_button").remove()};
	

/* Quiz */

/* Initlialize quiz visual objects */

let range = quiz_meta.get("Length");
range = range - 1;
let stop = 0

for (let i = 0; i < range; i++) {
	/* Display quiz_q[i]
	 * Test the answer
	 * Display condition
	 * Effect - score
	 * End */
}

/* Structure:
 *	Displaying a "Play" screen (before the quiz),
 *	Removing the existing objects,
 *	Adding the buttons,
 * 	Adding text for the quiz,
 * 	Waiting for the answer,
 * 	Checking for incorrect/correct answer,
 * 	Keeping track of the score
 * 	Displaying so,
 * 	Next question (looping),
 * 	When the quiz is done:
 * 		Removing all the existing objects
 * 		Adding a quiz screen (with scores)
 */











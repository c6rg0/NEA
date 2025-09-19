const quiz_meta = new Map();

quiz_meta.set("Name", "Python quiz");
quiz_meta.set("Author", "Gabriel Drozbik");
quiz_meta.set("Date", 1592025);
quiz_meta.set("Length", 5);

const quiz_q = [];
quiz_q.push("", "", "", "", "");

/* This has a fundamental flaw, in a quiz with 4 choices to 
 * pick from, you will need to set up a database table row for
 * each question, and link it to another table with higher data*/

const quiz_a = [];
quiz_a.push("One", "One", "Two", "Three", "Four");


/* Pre-quiz screen */
function start_quiz() {
	document.getElementById("game_title").remove();
	document.getElementById("start_button").remove();

	const buttonContainer = document.getElementById("button_container");

/* Quiz */

/* Initlialize quiz visual objects

let range = quiz_meta.get("Length");
range = range - 1;
let stop = 0

/*for (let i = 0; i < range; i++) {*/

	/* Display quiz_q[i]*/
	
	const newH2 = document.createElement("h2")
	const q = document.createTextNode("Howdy")
	newH2.appendChild(q);
	document.body.insertBefore(newH2, button_container);

	const a = document.createElement("BUTTON");
	const a_node = document.createTextNode(quiz_a[1]);
	a.appendChild(a_node);
	a.id = 'choice_a';
	buttonContainer.appendChild(a);

	const b = document.createElement("BUTTON");
	const b_node = document.createTextNode(quiz_a[2]);
	b.appendChild(b_node);
	b.id = 'choice_b';
	buttonContainer.appendChild(b);

	const c = document.createElement("BUTTON");
	const c_node = document.createTextNode(quiz_a[2]);
	c.appendChild(c_node);
	c.id = 'choice_c';
	buttonContainer.appendChild(c);

	const d = document.createElement("BUTTON");
	const d_node = document.createTextNode(quiz_a[3]);
	d.appendChild(d_node);
	d.id = 'choice_d';
	buttonContainer.appendChild(d);

	/*
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











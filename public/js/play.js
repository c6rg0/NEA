const quiz_meta = new Map();

quiz_meta.set("Name", "Python quiz");
quiz_meta.set("Author", "Gabriel Drozbik");
quiz_meta.set("Date", 1592025);
quiz_meta.set("Length", 5);

const quiz_q = [];
quiz_q.push("Click one", "Click 1", "Click ONE!");

let round = 0;

// ... pick from, you will need to set up a database table row for
// each question, and link it to another table with higher data*/

const quiz_a = [];
quiz_a.push("One", "One", "Two", "Three", "Four");

/* Pre-quiz screen */

function start_quiz() {
	document.getElementById("game_title").remove();
	document.getElementById("start_button").remove();
	object_creation();
}

/* Quiz */
function object_creation () {
	if (typeof round == 'undefined'){
		let round = 0;
	} else {
		round += 1;
	}

	console.log(round);
	
	const buttonContainer = document.getElementById("button_container");
	
	/* Display quiz_q[x]*/
	const newH2 = document.createElement("h2");
	const q = document.createTextNode(quiz_q[round - 1]);
	newH2.appendChild(q);
	newH2.id = "question";
	document.body.insertBefore(newH2, button_container);

	/* Display quiz_a[x]*/
	/* Need to add the onclick element/property to the buttons */

	const a = document.createElement("BUTTON");
	const a_test = (quiz_a[1]);
	const a_node = document.createTextNode(a_test);
	a.appendChild(a_node);
	a.id = 'choice_a';
	buttonContainer.appendChild(a);

	const b = document.createElement("BUTTON");
	const b_test = (quiz_a[2]);
	const b_node = document.createTextNode(b_test);
	b.appendChild(b_node);
	b.id = 'choice_b';
	buttonContainer.appendChild(b);

	const c = document.createElement("BUTTON");
	const c_test = (quiz_a[3]);
	const c_node = document.createTextNode(c_test);
	c.appendChild(c_node);
	c.id = 'choice_c';
	buttonContainer.appendChild(c);

	const d = document.createElement("BUTTON");
	const d_test = (quiz_a[4]);
	const d_node = document.createTextNode(d_test);
	d.appendChild(d_node);
	d.id = 'choice_d';
	buttonContainer.appendChild(d);

	waiting_for_ans(a, b, c, d, a_test, b_test, c_test, d_test);
		
}

		/* Testing for the answer*/
function waiting_for_ans(a, b, c, d, a_test, b_test, c_test, d_test) {

	const choice = "";

	function listen() {
		async function handleClick(choice, answer) {
			await evaluate(choice);
		}

        	a.addEventListener('click', () => handleClick(a_test));
        	b.addEventListener('click', () => handleClick(b_test));
        	c.addEventListener('click', () => handleClick(c_test));
        	d.addEventListener('click', () => handleClick(d_test));

	}

	listen();
}

/* Test the answer*/
function evaluate(choice, answer) {
	answer = (quiz_a[0]);
	if (choice == answer) {
		alert('You are correct');
		purge_screen();
	}
	else {
		alert("Wrong buddy, click a/1");
		purge_screen()
	}
}
	
function purge_screen() {
	document.getElementById("question").remove();
	document.getElementById("choice_a").remove();
	document.getElementById("choice_b").remove();
	document.getElementById("choice_c").remove();
	document.getElementById("choice_d").remove();

	/* Going back to the beginning*/
	object_creation(round)
}

		/* Display condition
		 * Effect - score
		 * End */

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











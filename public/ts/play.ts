const quiz_meta = new Map(); // I do not remember doing this, what does it even do?

quiz_meta.set("Name", "Python quiz");
quiz_meta.set("Author", "Gabriel Drozbik");
quiz_meta.set("Date", 1592025);
// quiz_meta.set("Length", 5);

const quiz_q = ["Click one", "Click 1", "Click ONE!"];

// ... pick from, you will need to set up a database table row for
// each question, and link it to another table with higher data*/

const quiz_a = ["One", "One", "Two", "Three", "Four"];

// Pre-quiz screen 

function start_quiz() {
	document.getElementById("game_title")!.remove(); 
	// The exclamation mark removes the error stating that
	// 'game_title' is 'possibly null'.
	document.getElementById("start_button")!.remove();
	let round = 0;
	verification(round);
}

// Field verification:
// To check if there is any more questions left, 
// if not, the end screen will be triggered.

function verification (round: number) {
	round ++;
	console.log(round);
	if ((quiz_q[round - 1]) == null){
		console.log("The game has finished");
		end_screen();
	}
	else{
		object_creation(round);
	}
}

// Quiz 
function object_creation (round: number) {
	const buttonContainer = document.getElementById("button_container");
	
	/* Display quiz_q[x]*/
	const newH2 = document.createElement("h2");
	const q = document.createTextNode(quiz_q[round - 1]);
	newH2.appendChild(q);
	newH2.id = "question";
	document.body.insertBefore(newH2, buttonContainer);

	/* Display quiz_a[x]*/
	/* Need to add the onclick element/property to the buttons */

	const a = document.createElement("BUTTON");
	const a_test = (quiz_a[1]);
	const a_node = document.createTextNode(a_test);
	a.appendChild(a_node);
	a.id = 'choice_a';
	buttonContainer!.appendChild(a);
	
	const b = document.createElement("BUTTON");
	const b_test = (quiz_a[2]);
	const b_node = document.createTextNode(b_test);
	b.appendChild(b_node);
	b.id = 'choice_b';
	buttonContainer!.appendChild(b);

	const c = document.createElement("BUTTON");
	const c_test = (quiz_a[3]);
	const c_node = document.createTextNode(c_test);
	c.appendChild(c_node);
	c.id = 'choice_c';
	buttonContainer!.appendChild(c);

	const d = document.createElement("BUTTON");
	const d_test = (quiz_a[4]);
	const d_node = document.createTextNode(d_test);
	d.appendChild(d_node);
	d.id = 'choice_d';
	buttonContainer!.appendChild(d);

	waiting_for_ans(a, b , c, d, a_test, b_test, c_test, d_test, round);
		
}

		/* Testing for the answer*/
function waiting_for_ans(a: HTMLElement, b: HTMLElement, c: HTMLElement, d: HTMLElement, a_test: string, b_test: string, c_test: string, d_test: string, round: number) {

	function listen() {
		async function handleClick(choice: string, round: number) {
			evaluate(choice, round);
		}

        	a.addEventListener('click', () => handleClick(a_test, round));
        	b.addEventListener('click', () => handleClick(b_test, round));
        	c.addEventListener('click', () => handleClick(c_test, round));
        	d.addEventListener('click', () => handleClick(d_test, round));

	}

	listen();
}

// Test the answer
function evaluate(choice: string, round: number) {
	let answer: string  = (quiz_a[0]);
	if (choice == answer) {
		alert('You are correct');
		purge_screen(round);
	}
	else {
		alert("Wrong buddy, click a/1");
		purge_screen(round)
	}
}
	
function purge_screen(round: number) {
	document.getElementById("question")!.remove();
	document.getElementById("choice_a")!.remove();
	document.getElementById("choice_b")!.remove();
	document.getElementById("choice_c")!.remove();
	document.getElementById("choice_d")!.remove();

	// Restarting the loop of functions
	verification(round);
}

function end_screen(){
	const endScreenContainer = document.getElementById('end_screen_container');

	const end_banner = document.createElement('h1');
	const end_banner_node = document.createTextNode("Congratulations!");
	end_banner.appendChild(end_banner_node);
	end_banner.id = "endBanner";
	endScreenContainer!.appendChild(end_banner);
	
	// I haven't made a score tracker yet
	const end_score = document.createElement('h2');
	const end_score_node = document.createTextNode("Your score is...");
	end_score.appendChild(end_score_node);
	end_score.id = "endScore";
	endScreenContainer!.appendChild(end_score);
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











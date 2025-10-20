class quizMeta {
	name: string = "Python quiz";
	author: string = "Gabriel";
	button_text: string = "Play";
}

const qm = new quizMeta();

const gameTitle = document.getElementById("game_title");
const gameTitleChild = document.createTextNode(qm.name);
gameTitle!.appendChild(gameTitleChild);

const gameCreator = document.getElementById("game_creator");
const gameCreatorChild = document.createTextNode(qm.author);
gameCreator!.appendChild(gameCreatorChild);

const startButton = document.getElementById("start_button");
const startButtonChild = document.createTextNode(qm.button_text);
startButton!.appendChild(startButtonChild);

class quizContent {
	// q = questions, o = options, a = answers
	q: Array<string> = ["Click 1", "Click 2", "Click 3!"];
	o: Array<string> = ["One", "Two", "Three", "Four"];
	a: Array<string> = ["One", "Two", "Three", "Four"];
}

const qz = new quizContent();


// Pre-quiz screen 

function start_quiz() {
	document.getElementById("game_title")!.remove(); 
	// The exclamation mark removes the error stating that -
	// ('game_title' is 'possibly null').
	document.getElementById("game_creator")!.remove();
	document.getElementById("start_button")!.remove();
	let round = 0;
	let score = 0;
	verification(round, score);
}

// Field verification:
// To check if there is any more questions left, 
// if not, the end screen will be triggered.

function verification (round: number, score: number) {
	round ++;
	// Used for testing:
	// console.log(round);
	if ((qz.q[round - 1]) == null){
		console.log("The game has finished");
		end_screen(round, score);
	}
	else{
		object_creation(round, score);
	}
}

// Quiz 
function object_creation (round: number, score: number) {
	const buttonContainer = document.getElementById("button_container");
	
	/* Display quiz_q[x]*/
	const newH2 = document.createElement("h3");
	const q = document.createTextNode(qz.q[round - 1]);
	newH2.appendChild(q);
	newH2.id = "question";
	document.body.insertBefore(newH2, buttonContainer);

	/* Display quiz_a[x]*/
	/* Need to add the onclick element/property to the buttons */

	const a = document.createElement("BUTTON");
	const a_test = (qz.o[0]);
	const a_node = document.createTextNode(a_test);
	a.appendChild(a_node);
	a.id = 'choice_a';
	buttonContainer!.appendChild(a);
	
	const b = document.createElement("BUTTON");
	const b_test = (qz.o[1]);
	const b_node = document.createTextNode(b_test);
	b.appendChild(b_node);
	b.id = 'choice_b';
	buttonContainer!.appendChild(b);

	const c = document.createElement("BUTTON");
	const c_test = (qz.o[2]);
	const c_node = document.createTextNode(c_test);
	c.appendChild(c_node);
	c.id = 'choice_c';
	buttonContainer!.appendChild(c);

	const d = document.createElement("BUTTON");
	const d_test = (qz.o[3]);
	const d_node = document.createTextNode(d_test);
	d.appendChild(d_node);
	d.id = 'choice_d';
	buttonContainer!.appendChild(d);

	waiting_for_ans(a, b , c, d, a_test, b_test, c_test, d_test, round, score);
		
}

		/* Testing for the answer*/
function waiting_for_ans(a: HTMLElement, b: HTMLElement, c: HTMLElement, d: HTMLElement, a_test: string, b_test: string, c_test: string, d_test: string, round: number, score: number) {

	function listen() {
		async function handleClick(choice: string, round: number, score: number) {
			evaluate(choice, round, score);
		}

        	a.addEventListener('click', () => handleClick(a_test, round, score));
        	b.addEventListener('click', () => handleClick(b_test, round, score));
        	c.addEventListener('click', () => handleClick(c_test, round, score));
        	d.addEventListener('click', () => handleClick(d_test, round, score));

	}

	listen();
}

// Test the answer
function evaluate(choice: string, round: number, score: number) {
	let answer: string  = (qz.a[round - 1]);
	if (choice == answer) {
		score++;
		console.log('Correct');
		console.log(score + '/' + round);
		purge_screen(round, score);
	}
	else {
		console.log("Wrong");
		console.log(score + '/' + round);
		purge_screen(round, score)
	}
}
	
function purge_screen(round: number, score: number) {
	document.getElementById("question")!.remove();
	document.getElementById("choice_a")!.remove();
	document.getElementById("choice_b")!.remove();
	document.getElementById("choice_c")!.remove();
	document.getElementById("choice_d")!.remove();

	// Restarting the loop of functions
	verification(round, score);
}

function end_screen(round: number, score: number){
	const endScreenContainer = document.getElementById('end_screen_container');

	const end_banner = document.createElement('h3');
	const end_banner_node = document.createTextNode("Congratulations!");
	end_banner.appendChild(end_banner_node);
	end_banner.id = "endBanner";
	endScreenContainer!.appendChild(end_banner);
	
	// I haven't made a score tracker yet
	const end_score = document.createElement('h4');
	const end_score_node = document.createTextNode("Your score is " + score + "/" + (round - 1) + "!");
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











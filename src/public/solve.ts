/* Plan:
 * Input: Regex problem content (TABLE(Problems)), User session data (?)
 * 	Type of data: Problem (intstructions), Example, Answer
 *
 * Output: 
*/

async function getProblem() {
	try {
		const response = await fetch("http://localhost:8000/get-problem", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		});

		let status: number = response.status;
		console.log(status);

		if (status === 204){
			getErr.innerHTML = "Please login first and retry after you're logged in!";
			return;
		}

		if (status === 401){
			// User error
			getErr.innerHTML =  "";
			return;
		}

		if (status === 409){
			// Clash with existing data
			getErr.innerHTML = "";
			return;
		}

		if (status === 200){
			// window.location.assign();
			return;
		}

	} catch(error) {
		console.log("Error"+error);
		getErr.innerHTML = ("!!Network error!!");
		return;
	}
}

let url: string = window.location.href;
console.log(url);

let getErr: HTMLElement;

const fetchedQ = "";
const fetchedA = "";

// Fetched info goes into the hashmap
let problem: Map<String, String> = new Map();
problem.set("title", "");
problem.set("creator", "me");
problem.set("question", fetchedQ);
problem.set("answer", fetchedA);

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

// To check if there is any more questions left, 
// if not, the end screen will be triggered.
// This will be used for looping around if the
// user answers incorrectly.

function verification (round: number, score: number) {
	round ++;
	// Used for testing:
	// console.log(round);
	// if {
		console.log("The game has finished");
		end_screen(round, score);
	// }
	// else{
	//	object_creation(round, score);
	// }
}

// (Former Quiz (?)) 
function object_creation (round: number, score: number) {
	const buttonContainer = document.getElementById("button_container");
	
	/* Display qz.q[i]*/
	// Should be using oop for this,
	
	// To display:
	// - Question/problem to solve
	// - One example
	// - Test cases that have to be passed
	
	waiting_for_ans();
}

// This should be good to keep, just needs simplified i/o
function waiting_for_ans() {

	function listen() {
		async function handleClick(choice: string) {
			evaluate(choice);
		}

		for (let i = 0; i < qz.l; i++) { 
        	button.addEventListener('click', () => handleClick(buttons_test[i], round, score));
		}

	}

	listen();
}

// Test the answer: 3 times using the testcass.
function evaluate(choice: string) {
	let answer: string  = "";
	if (choice == answer) {
		console.log('Correct');
		purge_screen();
	}
	else {
		console.log("Wrong");
		purge_screen()
	}
}
	
function purge_screen() {
	document.getElementById("question")!.remove();
	verification();
}

function end_screen(round: number, score: number){
	const endScreenContainer = document.getElementById('end_screen_container');

	const end_banner = document.createElement('h3');
	const end_banner_node = document.createTextNode("Congratulations!");
	end_banner.appendChild(end_banner_node);
	end_banner.id = "endBanner";
	endScreenContainer!.appendChild(end_banner);
	const end_score = document.createElement('h4');

	// This here will be a lot more complex: 
	// The score will be submitted, server evaluates using algorithm,
	// the score gets sent back to client.
	const end_score_node = document.createTextNode("Your score is " + score + "/" + (round - 1) + "!");

	end_score.appendChild(end_score_node);
	end_score.id = "endScore";
	endScreenContainer!.appendChild(end_score);
}


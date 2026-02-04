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

let getErr: HTMLElement;

const fetchedQ = "";
const fetchedA = "";


// Fetched info goes into the hashmap
let problem: Map<String, String> = new Map();
problem.set("title", "");
problem.set("creator", "me");
problem.set("question", fetchedQ);
problem.set("answer", fetchedA);

// These elements should be class objects
const gameTitle = document.getElementById("title");
const gameTitleChild = document.createTextNode();
gameTitle!.appendChild(gameTitleChild);

const gameCreator = document.getElementById("creator");
const gameCreatorChild = document.createTextNode();
gameCreator!.appendChild(gameCreatorChild);

const startButton = document.getElementById("start_button");
const startButtonChild = document.createTextNode("Start!");
startButton!.appendChild(startButtonChild);

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
	if (){
		console.log("The game has finished");
		end_screen(round, score);
	}
	else{
		object_creation(round, score);
	}
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
	
	const newH3 = document.createElement("h3");
	const question = document.createTextNode(qz.q[round - 1]);
	newH3.appendChild(question);
	newH3.id = "question";
	document.body.insertBefore(newH3, buttonContainer);

	/* Display qz.a[i]*/
	// No buttons will be involved, besides submitting answer

	let buttons = new Array();
	let buttons_test = new Array();
	let buttons_node = new Array();

	// This here is unecessary
	for (let i = 0; i < qz.l; i++) { 
		buttons[i] = document.createElement("BUTTON");
		buttons_test[i] = (qz.o[i]);
		buttons_node[i] = document.
			createTextNode(buttons_test[i]);
		
		buttons[i].appendChild(buttons_node[i]);
		buttons[i].id = ("choice_"+[i]);
		buttonContainer!.appendChild(buttons[i]);
	}

	console.log(qz.a[round - 1]);

	waiting_for_ans(buttons, buttons_test, round, score);
}

// This should be good to keep, just needs simplified i/o
function waiting_for_ans(buttons: Array<HTMLElement>, buttons_test: Array<string>, round: number, score: number) {

	function listen() {
		async function handleClick(choice: string, round: number, score: number) {
			evaluate(choice, round, score);
		}

		for (let i = 0; i < qz.l; i++) { 
        	buttons[i].addEventListener('click', () => handleClick(buttons_test[i], round, score));
		}

	}

	listen();
}

// Test the answer: 3 times using the testcass.
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
	for (let i = 0; i < qz.l; i++) { 
		document.getElementById("choice_"+[i])!.remove();
	}

	verification(round, score);
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


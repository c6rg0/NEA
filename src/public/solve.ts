/* Plan:
 * Input: Regex problem content (TABLE(Problems)), User session data (?)
 * 	Type of data: Problem (intstructions), Example, Answer
 *
 * Output: 
*/

async function getProblem(url_id: unknown) {
	try {
		const getUrl = "http://localhost:8000/get-problem/" + url_id;
		const response: any = await fetch(getUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		let status: number = response.status;
		console.log(status);

		if (status === 204){
			// problem_id not found (either got removed or out of bounds)
			window.location.assign("http://localhost:8000/browse")
			// Idealy a dedicated page should be in place ^^^^^^ 
		}

		if (status === 406){
			// no problem_id supplied
			window.location.assign("http://localhost:8000/browse")
		}

		if (status === 200){
			// acceptable response
			console.log("Server responded... (response beneath)");
			const data = await response.json(); // you have to parse the response
			console.log(data);
			return data;
		}

	} catch(error) {
		console.log("Error"+error);
		getErr.innerHTML = ("!!Network error!!");
		return;
	}
}

const full_url = window.location.href;
const re_for_id = /\d+$/;
const url_id = re_for_id.exec(full_url);
console.log(url_id);
const getErr = document.
	getElementById('title') as HTMLParagraphElement;

const data: any = getProblem(url_id); // this has poor type safety;
				      // to be fixed with an interface

// Fetched info goes into the hashmap
let problem: Map<String, String> = new Map();
problem.set("title", "");
problem.set("creator", "me");
problem.set("question", "");
problem.set("answer", "");

/*

// Fetch info using fetch api (w function getProblem)


// Pre-solving screen - setup elements (title, creator, instructions, examples, testcases etc) 
function start_solving() {
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
	
	// Display qz.q[i]
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

EOF */

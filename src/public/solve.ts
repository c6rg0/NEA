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

		if (status === 404){
			// problem_id not found (either got removed or out of bounds)
			window.location.assign("http://localhost:8000/browse")
			return;
		}

		if (status === 200){
			// acceptable response
			console.log("Server responded correctly (?) ...");
			const problem_data = await response.json(); // you have to parse the response
			setup_screen(problem_data);
		}

		if (status === 400){
			// unacceptable user problem
			console.log("Server responded incorrectly; status =" + status);
		}

		if (status === 500){
			// unacceptable server problem
			console.log("Server responded incorrectly; status =" + status);
		}

	} catch(error) {
		console.log("Error"+error);

		const getErr = document.
			getElementById('title') as HTMLParagraphElement;

		getErr.innerHTML = ("!!Network error!!");
		return;
	}
}

// Getting the problem_id from the url, and fetching 

const full_url = window.location.href;
const re_for_id = /\d+$/;
const url_id = re_for_id.exec(full_url);
getProblem(url_id);

interface problem_types{
	// problem_id: number,
	// title: string,
	// creator: string,
	// instruction: string,

	example1: string,
	example2: string,
	example3: string,

	// diff: number,
	// times_attempted: number,
	// times_solved: number,
	// time_created: number,
}

function setup_screen(problem_data: unknown){
	// console.log((problem_data as problem_types).title);

	// The below elements should be displayed using ejs.
	// FETCH API is only for data that should be 
	// evaluated or submitted, not displayed.
	//
	// For example:
	// the test cases and answer that are produced 
	// from the cases will be used in this file, but 
	// anything less than that is the templates job.
	
	document.getElementById("game_title")!.remove(); 
	document.getElementById("game_creator")!.remove();
	document.getElementById("start_button")!.remove();

	const buttonContainer = document.getElementById("button_container");

	let button = document.createElement("BUTTON");
	let button_node = document.
		createTextNode("Sumbit");

	button.appendChild(button_node);
	button.id = ("submit_button");
	buttonContainer!.appendChild(button);

	waiting_for_ans(button);
}

function waiting_for_ans(button: HTMLElement) {

	function listen() {
		async function handleClick(solution: string) {
			evaluate(solution);
		}

		let solution: string = "read html text element -> put it in solution here";
		button.addEventListener('click', () => handleClick(solution));

	}

	listen();
}


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

/*
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

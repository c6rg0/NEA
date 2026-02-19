interface types {
	example: string,
	answer: string,
}

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
			return problem_data;
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

const full_url = window.location.href;
// Select last digit patern in a string
const re_for_id = /\d+$/;
const url_id = re_for_id.exec(full_url);
const problem_data: unknown = getProblem(url_id);

const solutionForm = document.
	getElementById("solution_form") as HTMLFormElement;

solutionForm.addEventListener("submit", (event) => {
	event.preventDefault();

        const user_solution = (document.getElementById("solution") as HTMLInputElement).value;

	document.getElementById("creator")!.remove();
	document.getElementById("instruction")!.remove();
	document.getElementById("solution_form")!.remove();

	evaluate(user_solution, problem_data);
});


function evaluate(user_solution: string, problem_data: unknown) {
	console.log(user_solution);
	console.log((problem_data as types).answer);
	return;
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


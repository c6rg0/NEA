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
			const problem_data = await response.json() as types; 
			console.log(problem_data);
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

(async () => {
	const full_url = window.location.href;
	// Select last digit patern in a string
	const re_for_id = /\d+$/;
	const url_id = re_for_id.exec(full_url);
	const problem_data = await getProblem(url_id);

	const solutionForm = document.
		getElementById("solution_form") as HTMLFormElement;

	if (problem_data){
		solutionForm.addEventListener("submit", (event) => {
			event.preventDefault();

			const user_solution = (document.getElementById("solution") as HTMLInputElement).value;

			// Remove once tested
			console.log(user_solution);
			console.log(problem_data.answer);

			if (user_solution === problem_data.answer) {
				const correct: boolean = true;
				end_screen(correct, problem_data, user_solution);
			} else {
				const correct: boolean = false;
				end_screen(correct, problem_data, user_solution);
			}
		});
	}
})();

function end_screen(correct: boolean, problem_data: any, user_solution: any){
	document.getElementById("creator")!.remove();
	document.getElementById("instruction")!.remove();
	document.getElementById("solution_form")!.remove();

	const rightOrWrong = document.
		getElementById("right_or_wrong");
	let rwChild: any;

	if (correct === true){
		rwChild = document.createTextNode("Your answer is correct, yay!");

	} if (correct === false){
		rwChild = document.createTextNode("Your answer is wrong.");
	}

	rightOrWrong!.appendChild(rwChild);

	const dbExample = document.
		getElementById("example_data");
	const deChild = document.
		createTextNode("Test case: " + problem_data.example);
	dbExample!.appendChild(deChild);

	const dbSolution = document.
		getElementById("db_solution");
	const dbRegex = new RegExp(problem_data.answer);
	const dbRegexedData: any = dbRegex.
		exec(problem_data.example);
	const dsChild = document.
		createTextNode("DB answer: " + dbRegexedData);
	dbSolution!.appendChild(dsChild);
	
	const userAttempt = document.
		getElementById("user_attempt");
	const uaRegex = new RegExp(user_solution);
	const uaRegexedData: any = uaRegex.
		exec(problem_data.example);
	const uaChild = document.
		createTextNode("Your answer: " + uaRegexedData);
	userAttempt!.appendChild(uaChild);

	// Collect data regarding attempts, or whether
	// a completion took place.
	// Needs a new (potentially multiple) route(s).
	
	return;
}


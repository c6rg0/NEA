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
			return problem_data;
		}

		if (status === 400){
			// unacceptable user problem
			console.log("Server responded incorrectly; status =" + status);
			window.location.assign("http://localhost:8000/browse")
			return;
		}

		if (status === 500){
			// unacceptable server problem
			console.log("Server responded incorrectly; status =" + status);
			return;
		}

	} catch(error) {
		console.log("Error --> " + error);

		const getErr = document.
			getElementById('title') as HTMLParagraphElement;

		getErr.innerHTML = ("!!Network error!!");
		return;
	}
}

async function submitAttempt(url_id: any, correct: boolean) {
	try {
		const getUrl = "http://localhost:8000/submit-attempt/" + url_id;
		const response: any = await fetch(getUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			body: JSON.stringify({correct: correct}),
			},
		});

		let status: number = response.status;

		if (status === 200){
			// acceptable response
			return;
		}

		if (status === 400){
			console.log("Server responded incorrectly; status =" + status);
			return;
		}

		if (status === 500){
			// unacceptable server problem
			console.log("Server responded incorrectly; status =" + status);
			return;
		}

	} catch(error) {
		console.log(error);
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

			if (user_solution){
				if (user_solution === problem_data.answer) {
					const correct: boolean = true;
					result_screen(url_id, correct, problem_data, user_solution);
				} else {
					const correct: boolean = false;
					result_screen(url_id, correct, problem_data, user_solution);
				}
			}
			else {
				return;
			}
		});
	}
})();

function result_screen(url_id: any, correct: boolean, problem_data: any, user_solution: any){
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
		createTextNode("Test case: { " + problem_data.example + " }");
	dbExample!.appendChild(deChild);

	const dbSolution = document.
		getElementById("db_solution");
	const dbRegex = new RegExp(problem_data.answer);
	const dbRegexedData: any = dbRegex.
		exec(problem_data.example);
	const dsChild = document.
		createTextNode("Intended result: { " + dbRegexedData + " }");
	dbSolution!.appendChild(dsChild);
	
	const userAttempt = document.
		getElementById("user_attempt");
	const uaRegex = new RegExp(user_solution);
	const uaRegexedData: any = uaRegex.
		exec(problem_data.example);
	const uaChild = document.
		createTextNode("Your result: { " + uaRegexedData + " }");
	userAttempt!.appendChild(uaChild);

	submitAttempt(url_id, correct);

	const tryAgain = document.getElementById("try_again");
	tryAgain!.style.visibility = "visible";

	return;
}


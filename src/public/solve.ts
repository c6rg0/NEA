interface types {
	example: string,
	answer: string,
}

async function getSolution(urlId: unknown) {
	try {
		const getUrl = "http://localhost:8000/solution/" + urlId;
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

async function submitAttempt(urlId: any, correct: boolean) {
	try {
		const getUrl = "http://localhost:8000/attempt";
		const response = await fetch(getUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({correct: correct, urlId: urlId}),
		});
		let status: number = response.status;
		console.log(status);

	} catch(error) {
		console.log(error);
		return;
	}
}

class Data {
	private reForId: RegExp = /\d+$/
	public urlId: any;
	public problemData: any;

	async fetchData(fullUrl: string){
		this.urlId = this.reForId.exec(fullUrl);
		this.problemData = await getSolution(this.urlId);
	}

	async submitAttempt(fullUrl: string, correct: boolean){
		this.urlId = this.reForId.exec(fullUrl);
		this.urlId = this.urlId[0];
		submitAttempt(this.urlId, correct);
	}
}

(async () => {
	const fullUrl = window.location.href;
	const D = new Data();
	await D.fetchData(fullUrl);

	const solutionForm = document.
		getElementById("solution_form") as HTMLFormElement;

	if (D.fetchData != null){
		solutionForm.addEventListener("submit", (event) => {
			event.preventDefault();

			const userSolution = (document.getElementById("solution") as HTMLInputElement).value;

			if (userSolution){
				if (userSolution === D.problemData.answer) {
					const correct: boolean = true;
					resultsScreen(fullUrl, correct, D, userSolution);
				} else {
					const correct: boolean = false;
					resultsScreen(fullUrl, correct, D, userSolution);
				}
			}
			else {
				return;
			}
		});
	}

})();

function resultsScreen(fullUrl: string, correct: boolean, D: any, userSolution: any){
	document.getElementById("pre-solution")!.remove();
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
		createTextNode("Test case: { " + D.problemData.example + " }");
	dbExample!.appendChild(deChild);

	const dbSolution = document.
		getElementById("db_solution");
	const dbRegex = new RegExp(D.problemData.answer);
	const dbRegexedData: any = dbRegex.
		exec(D.problemData.example);
	const dsChild = document.
		createTextNode("Intended result: { " + dbRegexedData + " }");
	dbSolution!.appendChild(dsChild);

	const userAttempt = document.
		getElementById("user_attempt");
	const uaRegex = new RegExp(userSolution);
	const uaRegexedData: any = uaRegex.
		exec(D.problemData.example);
	const uaChild = document.
		createTextNode("Your result: { " + uaRegexedData + " }");
	userAttempt!.appendChild(uaChild);

	D.submitAttempt(fullUrl, correct);

	const tryAgain = document.getElementById("try_again");
	tryAgain!.style.visibility = "visible";

	return;
}


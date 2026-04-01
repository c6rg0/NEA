interface solutionTypes {
	example: string,
	answer: string,
}

async function getSolution(urlId: RegExpExecArray | null) {
	try {
		const getUrl = "http://localhost:8000/solution/" + urlId;
		const response: Response = await fetch(getUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200){
			// acceptable response
			const problemData = await response.json() as solutionTypes; 
			return problemData;
		}

		else {
			window.location.assign("http://localhost:8000/browse")
			return;
		}

	} catch(error) {
		console.log("Error --> " + error);

		const getErr = document.
			getElementById("title") as HTMLParagraphElement;

		getErr.innerHTML = ("Network error!");
		return;
	}
}

async function submitAttempt(id: string, correct: boolean) {
	try {
		const getUrl = "http://localhost:8000/attempt";
		const response: Response = await fetch(getUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				correct: correct, 
				urlId: id
			}),
		});

	} catch(error) {
		console.log(error);
		return;
	}
}

class Data {
	private reForId: RegExp = /\d+$/
	public urlId: RegExpExecArray | null;
	private id: string;
	public problemData: solutionTypes;

	async fetchData(fullUrl: string){
		this.urlId = this.reForId.exec(fullUrl);
		this.problemData = await getSolution(this.urlId) as solutionTypes;
	}

	async submitAttempt(fullUrl: string, correct: boolean){
		this.urlId = this.reForId.exec(fullUrl);
		if (!this.urlId) throw new Error("urlId is empty?");
		this.id = this.urlId[0];
		submitAttempt(this.id, correct);
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

			const userSolution: string = (document.getElementById("solution") as HTMLInputElement).value;

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

function resultsScreen(fullUrl: string, correct: boolean, D: Data, userSolution: string){
	document.getElementById("pre_solution")!.remove();
	document.getElementById("recent_attempts")!.remove();
	document.getElementById("solution_form")!.remove();

	const rightOrWrong = document.
		getElementById("right_or_wrong");
	let rwChild: Text;

	if (correct === true){
		rwChild = document.createTextNode("Your answer is correct!");

	} else {
		rwChild = document.createTextNode("Your answer is wrong.");
	}

	rightOrWrong!.appendChild(rwChild);

	const dbTest = document.
		getElementById("example_data");
	const testChild = document.
		createTextNode("Test case: { " + D.problemData.example + " }");
	dbTest!.appendChild(testChild);

	const dbSolution = document.
		getElementById("db_solution");
	const dbRegex = new RegExp(D.problemData.answer);
	const dbRegexedData: RegExpExecArray | null = dbRegex.
		exec(D.problemData.example);
	const dsChild = document.
		createTextNode("Intended result: { " + dbRegexedData + " }");
	dbSolution!.appendChild(dsChild);

	const userAttempt = document.
		getElementById("user_attempt");
	const uaRegex = new RegExp(userSolution);
	const uaRegexedData: RegExpExecArray | null = uaRegex.
		exec(D.problemData.example);
	const uaChild = document.
		createTextNode("Your result: { " + uaRegexedData + " }");
	userAttempt!.appendChild(uaChild);

	D.submitAttempt(fullUrl, correct);

	const hButtonContainer = document.getElementById("h_button_container");
	let homeButton = document.createElement("BUTTON");
	let hButtonNode = document.createTextNode("Go home");

	homeButton.appendChild(hButtonNode);
	homeButton.id = ("submit_button");
	homeButton.className = ("btn btn-light btn-lg");
	hButtonContainer!.appendChild(homeButton);

	const rButtonContainer = document.getElementById("r_button_container");
	let retryButton = document.createElement("BUTTON");
	let rButtonNode = document.createTextNode("Retry!");

	retryButton.appendChild(rButtonNode);
	retryButton.id = ("submit_button");
	retryButton.className = ("btn btn-light btn-lg");
	rButtonContainer!.appendChild(retryButton);

	homeButton.onclick = function() {
		return window.location.assign("/");
	}

	retryButton.onclick = function() {
		return window.location.assign(fullUrl);
	}

	return;
}


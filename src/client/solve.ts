interface solutionTypes {
	test_data: string,
	answer: string,
}
async function getSolution(problemId: string | null) {
	const FETCH_URL = "http://localhost:8000/solution/" + problemId;
	const RESPONSE: Response = await fetch(FETCH_URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (RESPONSE.status === 200){
		return await RESPONSE.json() as solutionTypes; 
	} else {
		return window.location.assign("http://localhost:8000/search")
	}
}

async function submitAttempt(problemId: string | null, CORRECT: boolean) {
	const FETCH_URL = "http://localhost:8000/attempt";
	const RESPONSE: Response = await fetch(FETCH_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			correct: CORRECT, 
			problemId: problemId,
		}),
	});

	if (RESPONSE.status === 200){
		return; 
	} else {
		return console.log(RESPONSE.status); 
	}
}

class Data {
	private problemId: string | null;
	public problemData: solutionTypes;

	async fetchData(PAGE_URL: string){
		this.problemId = PAGE_URL.match(/\d+$/)?.[0] ?? null;
		if (!this.problemId) throw new Error("problemId is empty?");
		this.problemData = await getSolution(this.problemId) as solutionTypes;
	}

	async submitAttempt(PAGE_URL: string, CORRECT: boolean){
		this.problemId = PAGE_URL.match(/\d+$/)?.[0] ?? null;
		if (!this.problemId) throw new Error("problemId is empty?");
		await submitAttempt(this.problemId, CORRECT);
	}
}

// Allows the code to be executed before the frontend is completely loaded:
(async () => {
	const PAGE_URL = window.location.href;
	const D = new Data();
	await D.fetchData(PAGE_URL);

	if (D.fetchData !== null && D.fetchData !== undefined){
		form(PAGE_URL, D);
	}

})();

async function form(PAGE_URL: string, D: Data){
	const SOLUTION_FORM = document.
		getElementById("solution_form") as HTMLFormElement;

	SOLUTION_FORM.addEventListener("submit", (event) => {
		event.preventDefault();

		const INPUT_SOLUTION: string = (document.getElementById("solution") as HTMLInputElement).value;

		if (INPUT_SOLUTION !== null){
			if (INPUT_SOLUTION === D.problemData.answer) {
				postSolve(PAGE_URL, true, D, INPUT_SOLUTION);
			} else {
				postSolve(PAGE_URL, false, D, INPUT_SOLUTION);
			}
		}
	});
} 

async function postSolve(PAGE_URL: string, CORRECT: boolean, D: Data, INPUT_SOLUTION: string){
	clearScreen();
	await D.submitAttempt(PAGE_URL, CORRECT);
	resultsDisplay(CORRECT, D, INPUT_SOLUTION);
	redirectButtonsSetup(PAGE_URL);
}

function clearScreen(){
	document.getElementById("pre_solution")!.remove();
	document.getElementById("recent_attempts")!.remove();
	document.getElementById("solution_form")!.remove();
}

function resultsDisplay(CORRECT: boolean, D: Data, INPUT_SOLUTION: string){
	const JUDGEMENT = document.
		getElementById("right_or_wrong");
	let judgeChild: Text;

	if (CORRECT === true){
		judgeChild = document.createTextNode("Correct!");
	} else {
		judgeChild = document.createTextNode("Incorrect");
	}

	JUDGEMENT!.appendChild(judgeChild);

	// Database data 
	const TEST_CASE_DISPLAY = document.
		getElementById("test_data_data");
	const TEST_DISPLAY_CHILD = document.
		createTextNode("Test case: [" + D.problemData.test_data + "]");
	TEST_CASE_DISPLAY!.appendChild(TEST_DISPLAY_CHILD);

	const SOLUTION_DISPLAY = document.
		getElementById("db_solution");
	const SOLUTION_REGEX = new RegExp(D.problemData.answer);
	const SOLUTION_RESULT: RegExpExecArray | null = SOLUTION_REGEX.
		exec(D.problemData.test_data);
	const SOLUTION_DISPLAY_CHILD = document.
		createTextNode("Intended result: [" + SOLUTION_RESULT + "]");
	SOLUTION_DISPLAY!.appendChild(SOLUTION_DISPLAY_CHILD);

	// User data
	const ATTEMPT_DISPLAY = document.
		getElementById("user_attempt");
	const ATTEMPT_REGEX = new RegExp(INPUT_SOLUTION);
	const ATTEMPT_RESULT: RegExpExecArray | null = ATTEMPT_REGEX.
		exec(D.problemData.test_data);
	const ATTEMPT_DISPLAY_CHILD = document.
		createTextNode("Your result: [" + ATTEMPT_RESULT + "]");
	ATTEMPT_DISPLAY!.appendChild(ATTEMPT_DISPLAY_CHILD);
}

function redirectButtonsSetup(PAGE_URL: string){
	const HOME_BUTTON_CONTAINER = document.getElementById("h_button_container");
	const HOME_BUTTON = document.createElement("BUTTON");
	const HOME_BUTTON_CHILD = document.createTextNode("Go home");

	HOME_BUTTON.appendChild(HOME_BUTTON_CHILD);
	HOME_BUTTON.id = ("submit_button");
	HOME_BUTTON.className = ("btn btn-light btn-lg"); // Appending bootstrap classes
	HOME_BUTTON_CONTAINER!.appendChild(HOME_BUTTON);

	const RETRY_BUTTON_CONTAINER = document.getElementById("r_button_container");
	const RETRY_BUTTON = document.createElement("BUTTON");
	const RETRY_BUTTON_CHILD = document.createTextNode("Retry!");

	RETRY_BUTTON.appendChild(RETRY_BUTTON_CHILD);
	RETRY_BUTTON.id = ("submit_button");
	RETRY_BUTTON.className = ("btn btn-light btn-lg");
	RETRY_BUTTON_CONTAINER!.appendChild(RETRY_BUTTON);

	HOME_BUTTON.onclick = function() {
		return window.location.assign("/");
	}

	RETRY_BUTTON.onclick = function() {
		return window.location.assign(PAGE_URL);
	}
}

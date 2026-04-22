const PROBLEM_FORM = document.
	getElementById("problem_form") as HTMLFormElement;
const ERROR_DISPLAY = document.
	getElementById("errP") as HTMLParagraphElement;

if (PROBLEM_FORM){
	PROBLEM_FORM.addEventListener("submit", (event) => {
		event.preventDefault(); 
		const TITLE  = (document.getElementById("title") as HTMLInputElement).value;
		const INSTRUCTION = (document.getElementById("instr") as HTMLInputElement).value;
		const TEST_CASE  = (document.getElementById("exmpl") as HTMLInputElement).value;
		const ANSWER_STRING = (document.getElementById("answ") as HTMLInputElement).value;

		const DELIM_TEST_REGEX: RegExp = /\/(\w+)/ig;
		const DELIMS_PRESENT = DELIM_TEST_REGEX.exec(ANSWER_STRING);

		if (TITLE.trim() === "" || INSTRUCTION.trim() === "" || ANSWER_STRING.trim() === "" || TEST_CASE.trim() === "") {
			ERROR_DISPLAY.innerHTML = 
				"Don't leave empty fields!";

		} else if (DELIMS_PRESENT){
			ERROR_DISPLAY.innerHTML = 
				"Don't include delimiters in your regular expression.";

		} else {
			const ANSWER_REGEX = new RegExp(ANSWER_STRING);
			ERROR_DISPLAY.innerHTML = "";
			regexTest(TITLE, INSTRUCTION, ANSWER_STRING, ANSWER_REGEX, TEST_CASE);
		}
	});
}

function regexTest(TITLE: string, INSTRUCTION: string, ANSWER_STRING: string, ANSWER_REGEX: RegExp, TEST_CASE: string){
	
	if (ANSWER_REGEX.test(TEST_CASE)){
		createConfirm(TITLE, INSTRUCTION, ANSWER_STRING, ANSWER_REGEX, TEST_CASE);
	} else {
		return ERROR_DISPLAY.innerHTML = "Please use JS regex, and include delimiters!"; 
	}
}

function createConfirm(TITLE: string, INSTRUCTION: string, ANSWER_STRING: string, ANSWER_REGEX: RegExp, TEST_CASE: string){
	document.getElementById("problem_form")!.remove();
	document.getElementById("cheatsheet")!.remove();

	const ANSWER_REGEX_RESULT = ANSWER_REGEX.exec(TEST_CASE);

	if (ANSWER_REGEX_RESULT === null){
		window.location.assign("http://localhost:8000/create");
		return ERROR_DISPLAY.innerHTML = ("Regex expression didn't match anything, please try again!");

	} 

	const confirmMsg = document.getElementById("confirm_msg");
	const confirmMsgChild = document.
		createTextNode("Is [" + ANSWER_REGEX_RESULT + "] the data out of [" + TEST_CASE + "] that you want to use?");
	confirmMsg!.appendChild(confirmMsgChild);
	
	const aButtonContainer = document.getElementById("a_button_container");
	let agreeButton = document.createElement("BUTTON");
	let aButtonNode = document.createTextNode("Yep");

	agreeButton.appendChild(aButtonNode);
	agreeButton.id = ("submit_button");
	agreeButton.className = ("btn btn-light btn-lg");
	aButtonContainer!.appendChild(agreeButton);

	const dButtonContainer = document.getElementById("b_button_container");
	let disagreeButton = document.createElement("BUTTON");
	let dButtonNode = document.createTextNode("Cancel creation");

	disagreeButton.appendChild(dButtonNode);
	disagreeButton.id = ("submit_button");
	disagreeButton.className = ("btn btn-light btn-lg");
	dButtonContainer!.appendChild(disagreeButton);

	agreeButton.onclick = function() {
		return problemPost(TITLE, INSTRUCTION, ANSWER_STRING, TEST_CASE);

	}

	disagreeButton.onclick = function() {
		return window.location.href = "http://localhost:8000/create";
	}
}

async function problemPost(TITLE: string, INSTRUCTION: string, ANSWER_STRING: string, TEST_CASE: string) {
	const RESPONSE = await fetch("http://localhost:8000/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: TITLE, 
			instruction: INSTRUCTION, 
			answer: ANSWER_STRING, 
			test_data: TEST_CASE
		}),
	});

	return afterPost(RESPONSE, TITLE);
}

function afterPost(RESPONSE: Response, TITLE: string){
	if (RESPONSE.status === 200){
		return redirectSetup(TITLE);
	} if (RESPONSE.status === 204){
		return ERROR_DISPLAY.innerHTML = ("Please login first!");
	} else {
		return console.log(RESPONSE.status);
	}
}

async function redirectSetup(TITLE: string) {
	const RESPONSE = await fetch("http://localhost:8000/redirect", {
		method: "SEARCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: TITLE
		}),
	});
		
	return redirect(RESPONSE);
}

function redirect(RESPONSE: Response){
	if (RESPONSE.status === 200){
		return window.location.assign(RESPONSE.url);
	} 
}

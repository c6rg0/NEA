async function redirectSetup(input_title: string) {
	try {
		const response = await fetch("http://localhost:8000/redirect", {
			method: "SEARCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: input_title
			}),
		});

		let status: number = response.status;
		console.log(status);

		if (status === 200){
			console.log(response);
			window.location.assign(response.url);
			return;
		} else {
			return console.log(status);
		}

	} catch(error) {
		console.log("Error: "+error);
		return errormsg.innerHTML = ("Network error!");
	}
}

async function problemPost(input_title: string, input_instr: string, input_answer: string, input_example: string) {
	try {
		const response = await fetch("http://localhost:8000/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: input_title, 
				instruction: input_instr, 
				answer: input_answer, 
				example: input_example
			}),
		});

		let status: number = response.status;
		console.log(status);
		
		if (status === 200){
			return redirectSetup(input_title);
		} if (status === 204){
			return errormsg.innerHTML = ("Please login first!");
		} else {
			return console.log(status);
		}

	} catch(error) {
		console.log("Error: "+error);
		return errormsg.innerHTML = ("Network error!");
	}
}

const problemForm = document.
	getElementById("problem_form") as HTMLFormElement;
const errormsg = document.
	getElementById("errP") as HTMLParagraphElement;

problemForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const input_title  = (document.getElementById("title") as HTMLInputElement).value;
        const input_instr = (document.getElementById("instr") as HTMLInputElement).value;
	const input_example  = (document.getElementById("exmpl") as HTMLInputElement).value;
	const input_answer = (document.getElementById("answ") as HTMLInputElement).value;

	const test_input: RegExp = /\/(\w+)/ig;
	const delimsExist = test_input.exec(input_answer);

	if (input_title.trim() === "" || input_instr.trim() === "" || input_answer.trim() === "" || input_example.trim() === "") {
		errormsg.innerHTML = 
			"Please fill in all fields!";

	} if (delimsExist){
		errormsg.innerHTML = 
			"Do not include delimiters in your regular expression.";

	} else {
		const conv_answer = new RegExp(input_answer);
		errormsg.innerHTML = "";
		regexTest(input_title, input_instr, input_answer, conv_answer, input_example);

	}
});

function regexTest(input_title: string, input_instr: string, input_answer: string, conv_answer: RegExp, input_example: string){
	
	if (conv_answer.test(input_example)){
		console.log("Test came: true!");
		regexConfirm(input_title, input_instr, input_answer, conv_answer, input_example);
	} else {
		console.log("Test came: false D:");
		errormsg.innerHTML = "Please use JS regex, and include delimiters!"; return; }

}

function regexConfirm(input_title: string, input_instr: string, input_answer: string, conv_answer: RegExp, input_example: string){

	// Delete visual elements
	try{
		document.getElementById("problem_form")!.remove();
		document.getElementById("cheatsheet")!.remove();
	} catch (err) {
		console.log("Oopsie, something has gone wrong --> " + err)
	}

	// Have the user confirm whether the data and solution match,
	// If not revert screen.

	let array = conv_answer.exec(input_example);

	if (array === null){
		window.location.assign("http://localhost:8000/create");
		return errormsg.innerHTML = ("Regex expression didn't match anything, please try again!");

	} else {
		console.log("Is [" + array + "] the data out of [" + input_example + "] that you want to use?");	
	}

	const confirmMsg = document.getElementById("confirm_msg");
	const confirmMsgChild = document.createTextNode("Is [" + array + "] the data out of [" + input_example + "] that you want to use?");
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
		return problemPost(input_title, input_instr, input_answer, input_example);

	}

	disagreeButton.onclick = function() {
		window.location.assign("/create");
	}
	
}

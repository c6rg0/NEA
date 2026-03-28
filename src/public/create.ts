function redirect(response: Response){
	console.log(response.status);

	if (response.status === 200){
		console.log(response);
		return window.location.assign(response.url);
	} else {
		return console.log(response.status);
	}
}

async function redirectSetup(title: string) {
	try {
		const response = await fetch("http://localhost:8000/redirect", {
			method: "SEARCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title
			}),
		});
		
		return redirect(response);

	} catch(error) {
		console.log("Error: "+error);
		return errormsg.innerHTML = ("Network error!");
	}
}

function afterPost(response: Response, title: string){
	console.log(response.status);
		
	if (response.status === 200){
		return redirectSetup(title);
	} if (response.status === 204){
		return errormsg.innerHTML = ("Please login first!");
	} else {
		return console.log(response.status);
	}
}

async function problemPost(title: string, instr: string, answer: string, example: string) {
	try {
		const response = await fetch("http://localhost:8000/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title, 
				instruction: instr, 
				answer: answer, 
				example: example
			}),
		});

		return afterPost(response, title);

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
        const title  = (document.getElementById("title") as HTMLInputElement).value;
        const instr = (document.getElementById("instr") as HTMLInputElement).value;
	const example  = (document.getElementById("exmpl") as HTMLInputElement).value;
	const answer = (document.getElementById("answ") as HTMLInputElement).value;

	const test_input: RegExp = /\/(\w+)/ig;
	const delimsExist = test_input.exec(answer);

	if (title.trim() === "" || instr.trim() === "" || answer.trim() === "" || example.trim() === "") {
		errormsg.innerHTML = 
			"Don't leave empty fields!";

	} if (delimsExist){
		errormsg.innerHTML = 
			"Don't include delimiters in your regular expression.";

	} else {
		const conv_answer = new RegExp(answer);
		errormsg.innerHTML = "";
		regexTest(title, instr, answer, conv_answer, example);

	}
});

function regexTest(title: string, instr: string, answer: string, conv_answer: RegExp, example: string){
	
	if (conv_answer.test(example)){
		console.log("Test came: true!");
		regexConfirm(title, instr, answer, conv_answer, example);
	} else {
		console.log("Test came: false D:");
		return errormsg.innerHTML = "Please use JS regex, and include delimiters!"; 
	}
}

function regexConfirm(title: string, instr: string, answer: string, conv_answer: RegExp, example: string){

	document.getElementById("problem_form")!.remove();
	document.getElementById("cheatsheet")!.remove();

	let array = conv_answer.exec(example);

	if (array === null){
		window.location.assign("http://localhost:8000/create");
		return errormsg.innerHTML = ("Regex expression didn't match anything, please try again!");

	} else {
		console.log("Is [" + array + "] the data out of [" + example + "] that you want to use?");	
	}

	const confirmMsg = document.getElementById("confirm_msg");
	const confirmMsgChild = document.createTextNode("Is [" + array + "] the data out of [" + example + "] that you want to use?");
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
		return problemPost(title, instr, answer, example);

	}

	disagreeButton.onclick = function() {
		window.location.assign("/create");
	}
	
}

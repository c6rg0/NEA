async function problemPost(input_title: string, input_instr: string, input_answer: string, input_example: string) {
	try {
		const response = await fetch("http://localhost:8000/create-problem", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// this will need everything, not just title
			body: JSON.stringify({title: input_title, instruction: input_instr, answer: input_answer, example: input_example}),
		});

		let status: number = response.status;
		console.log(status);

		if (status === 204){
			errormsg.innerHTML = "Please login first and retry after you're logged in!";
			return;
		}

		if (status === 401){
			// User error
			errormsg.innerHTML =  "";
			return;
		}

		if (status === 409){
			// Clash with existing data
			errormsg.innerHTML = "";
			return;
		}

		if (status === 200){
			window.location.assign("/create-success");
			return;
		}

	} catch(error) {
		console.log("Error"+error);
		errormsg.innerHTML = ("!!Network error!!");
		return;
	}
}

const problemForm = document.
	getElementById("problem_form") as HTMLFormElement;
const errormsg = document.
	getElementById('errP') as HTMLParagraphElement;

problemForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const input_title  = (document.getElementById("title") as HTMLInputElement).value;
        const input_instr = (document.getElementById("instr") as HTMLInputElement).value;
	const input_example  = (document.getElementById("exmpl") as HTMLInputElement).value;
	// Conversion from string to RegExp
	const input_answer = (document.getElementById("answ") as HTMLInputElement).value;
	const conv_answer = new RegExp(input_answer, "g");

	if (input_title.trim() === "" || input_instr.trim() === "" || input_answer.trim() === "" || input_example.trim() === "") {
        	errormsg.innerHTML = 
			"Please fill in the fields!";
        } else {
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
		errormsg.innerHTML = "Please use JS regex, and include delimiters!";
		return;
	}

}

function regexConfirm(input_title: string, input_instr: string, input_answer: string, conv_answer: RegExp, input_example: string){

	// Delete visual elements
	document.getElementById("problem_form")!.remove();
	document.getElementById("title")!.remove();
	document.getElementById("instr")!.remove();
	document.getElementById("exmpl")!.remove();
	document.getElementById("answ")!.remove();

	// Have the user confirm whether the data and solution match,
	// If not revert screen.

	let array = conv_answer.exec(input_example);

	if (array === null){
		return;
	} else {
		console.log("Is" + array + "the data out of" + input_example + "that you want to use?");	
	}

	const buttonContainer = document.getElementById("button_container");

	let button = document.createElement("BUTTON");
	let button_node = document.
		createTextNode("Sumbit");

	button.appendChild(button_node);
	button.id = ("submit_button");
	buttonContainer!.appendChild(button);

	problemPost(input_title, input_instr, input_answer, input_example);
}

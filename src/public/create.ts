async function problemPost(input_title: string, input_instr: string, input_answer: string, input_example: string, input_test: string) {
	try {
		const response = await fetch("http://localhost:8000/create-problem", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// this will need everything, not just title
			body: JSON.stringify({title: input_title, instruction: input_instr, answer: input_answer, example: input_example, test: input_test }),
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
	const input_answer = (document.getElementById("answ") as HTMLInputElement).value;
        const input_test  = (document.getElementById("test") as HTMLInputElement).value;

	if (input_title.trim() === "" || input_instr.trim() === "" || input_answer.trim() === "" || input_example.trim() === "" || input_test.trim() === "" ) {
        	errormsg.innerHTML = 
			"Please fill in the fields!";
        } else {
		errormsg.innerHTML = "";
		problemPost(input_title, input_instr, input_answer, input_example, input_test);
	}
});

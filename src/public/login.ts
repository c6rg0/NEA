async function logPost(user: string, pass: string) {
	const response = await fetch("http://localhost:8000/submit-login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({username: user, password: pass }),

	});

	let status: number = response.status;
	console.log(status);

	if (status == 401){
		logExists.innerHTML = "Incorrect username or password!";

	}
	if (status == 200){
		window.location.assign("/");
	}

	else {
		logExists.innerHTML = "501";
	}

}


const logForm = document.
	getElementById("login_form") as HTMLFormElement;

const logExists = document.
	getElementById('exists') as HTMLParagraphElement;
const logLength = document.
	getElementById('length') as HTMLParagraphElement;
const logNums = document.
	getElementById('nums') as HTMLParagraphElement;
const logSymbol = document.
	getElementById('symbol') as HTMLParagraphElement;

logForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        if (username.trim() === " || password.trim() === ") {
        	return logLength.innerHTML = 
			"Please fill in the fields";
        }

	let passLen:number = password.length;
	let len = true;

	if (passLen < 6) {
		len = false; 
		return logLength.innerHTML = 
		"Password must be 6 characters or more!";
	}
	
	let num = true;
	let symbol = true;

	for(let i = 0; i < passLen; i++){
		const char: string = password[i];
		if (char >= '0' && char <= '9'){
			num = true;
		}
		else if (!/[a-zA-Z0-9]/.test(char)){
			symbol = true;
		}
	}

	if (len == true && num == true && symbol == true){
		logLength.innerHTML = "";
		logNums.innerHTML = "";
		logSymbol.innerHTML = "";

		const user: string = username;
		const pass: string = password;
		logPost(user, pass);
	}

	else if(!num){
		logNums.innerHTML = "Please include at least 1 number!";
	}
	else if (!symbol){
		logSymbol.innerHTML = "Please include at least 1 symbol!";
	}
});



async function logPost(user: string, pass: string) {
	const response = await fetch(
		"http://localhost:8000/submit-login", {
		method: 'POST',
		body: new URLSearchParams({ username: user,
					  password: pass })
	});
}

const logForm = document.
	getElementById("login_form") as HTMLFormElement;

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
        	logLength.innerHTML = 
			"Please fill in the fields";
        }

	let passLen:number = password.length;
	let len = true;

	if (passLen < 6) {
		logLength.innerHTML = 
		"Password must be 6 characters or more!";
		len = false; 
	}
	
	let num = true;
	let symbol = true;

	for(let i = 0; i < passLen; i++){
		const char: string = password[i];
		if (typeof char === 'number'){
			num = true;
		}
		else if (typeof char === 'symbol'){
			symbol = true;
		}
	}

	if (len == true && num == true && symbol == true){
		logLength.innerHTML = "";
		logNums.innerHTML = "";
		logSymbol.innerHTML = "";

		const user = JSON.stringify({username: "string"});
		const pass = JSON.stringify({password: "string"});
		logPost(user, pass);
	}

	else if(!num){
		logNums.innerHTML = "Please include at least 1 number!";
	}
	else if (!symbol){
		logSymbol.innerHTML = "Please include at least 1 symbol!";
	}
});

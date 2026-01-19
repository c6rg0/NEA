async function sigPost(user: string, pass: string) {
	const response = await fetch("http://localhost:8000/submit-signup", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({username: user, password: pass }),
	});

	let status: number = response.status;
	console.log(status);

	if (status == 204){
		sigExists.innerHTML = "Username or/and password is required!";
	}

	if (status == 401){
		sigExists.innerHTML = "Incorrect username or password!";
	}
	
	if (status == 409){
		sigExists.innerHTML = "Username already exists!";
	}

	if (status == 200){
		sigExists.innerHTML = "";
	}
}

const sigForm = document.
	getElementById("signup_form") as HTMLFormElement;

const sigExists = document.
	getElementById('exists') as HTMLParagraphElement;
const sigLength = document.
	getElementById('length') as HTMLParagraphElement;
const sigNums = document.
	getElementById('nums') as HTMLParagraphElement;
const sigSymbol = document.
	getElementById('symbol') as HTMLParagraphElement;

sigForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        if (username.trim() === "" || password.trim() === "") {
        	sigLength.innerHTML = 
			"Please fill in the fields";
        }

	let passLen:number = password.length;
	let len = true;

	if (passLen < 6) {
		sigLength.innerHTML = 
		"Password must be 6 characters or more!";
		len = false; 
	}
	
	let num = false;
	let symbol = false;

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
		sigLength.innerHTML = "";
		sigNums.innerHTML = "";
		sigSymbol.innerHTML = "";

		const user: string = username;
		const pass: string = password;
		sigPost(user, pass);
	}

	else if(!num){
		sigNums.innerHTML = "Please include at least 1 number!";
	}
	else if (!symbol){
		sigSymbol.innerHTML = "Please include at least 1 symbol!";
	}
});

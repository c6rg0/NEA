function signupResponse(response: Response){
	console.log(response.status);

	if (response.status == 204){
		return existsMsg.innerHTML = "Username or/and password is required!";
	}

	if (response.status == 401){
		return existsMsg.innerHTML = "Incorrect username or password!";
	}
	
	if (response.status == 409){
		return existsMsg.innerHTML = "Username already exists!";
	}

	if (response.status == 200){
		return window.location.assign("/login");
	}
}

async function postSignup(user: string, pass: string) {
	const response = await fetch("http://localhost:8000/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({username: user, password: pass }),
	});

	return signupResponse(response);
}

const signupForm = document.
	getElementById("signup_form") as HTMLFormElement;

const existsMsg = document.
	getElementById("existsMsg") as HTMLParagraphElement;
const lengthMsg = document.
	getElementById("length") as HTMLParagraphElement;
const numsMsg = document.
	getElementById("nums") as HTMLParagraphElement;
const symbolMsg = document.
	getElementById("symbol") as HTMLParagraphElement;

signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        if (username.trim() === "" || password.trim() === "") {
        	lengthMsg.innerHTML = 
			"Please fill in all fields";
        }

	// Everything below this is pretty convoluted

	let len = true;
	let num = false;
	let symbol = false;

	if (password.length < 6) {
		lengthMsg.innerHTML = 
		"Password must be 6 characters or more!";
		len = false; 
	}

	for(let i = 0; i < password.length; i++){
		const char: string = password[i];
		if (char >= "0" && char <= "9"){
			num = true;
		}
		else if (!/[a-zA-Z0-9]/.test(char)){
			symbol = true;
		}
	}

	if (len == true && num == true && symbol == true){
		lengthMsg.innerHTML = "";
		numsMsg.innerHTML = "";
		symbolMsg.innerHTML = "";

		const user: string = username;
		const pass: string = password;
		postSignup(user, pass);
	}

	else if(!num){
		numsMsg.innerHTML = "Please include at least 1 number!";
	}
	else if (!symbol){
		symbolMsg.innerHTML = "Please include at least 1 symbol!";
	}
});

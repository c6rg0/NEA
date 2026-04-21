function signupResponse(RESPONSE: Response){
	if (RESPONSE.status === 200){
		return window.location.assign("/login");
	} else if (RESPONSE.status === 401){
		DISPLAY_EXISTS.innerHTML = "Incorrect username or password!";
	} else if (RESPONSE.status === 409){
		DISPLAY_EXISTS.innerHTML = "Username already exists!";
	} else {
		console.log(RESPONSE.status);
	}
}

async function postSignup(INPUT_USERNAME: string, INPUT_PASSWORD: string) {
	const RESPONSE = await fetch("http://localhost:8000/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: INPUT_USERNAME, password: INPUT_PASSWORD }),
	});

	return signupResponse(RESPONSE);
}

const SIGNUP_FORM = document.
	getElementById("signup_form") as HTMLFormElement;

const DISPLAY_EXISTS = document.
	getElementById("existsMsg") as HTMLParagraphElement;
const DISPLAY_LEGNTH = document.
	getElementById("length") as HTMLParagraphElement;
const DISPLAY_NUMS = document.
	getElementById("nums") as HTMLParagraphElement;
const DISPLAY_SYMBOLS = document.
	getElementById("symbol") as HTMLParagraphElement;

SIGNUP_FORM.addEventListener("submit", (event) => {
        event.preventDefault(); 

	DISPLAY_LEGNTH.innerHTML = "";
	DISPLAY_NUMS.innerHTML = "";
	DISPLAY_SYMBOLS.innerHTML = "";
	DISPLAY_EXISTS.innerHTML = "";

        const INPUT_USERNAME = (document.getElementById("username") as HTMLInputElement).value;
        const INPUT_PASSWORD = (document.getElementById("password") as HTMLInputElement).value;

        if (INPUT_USERNAME.trim() === "" || INPUT_PASSWORD.trim() === "") {
        	DISPLAY_LEGNTH.innerHTML = 
			"Please fill in all fields";
        }

	let len = true;
	let num = false;
	let symbol = false;

	if (INPUT_PASSWORD.length < 6) {
		DISPLAY_LEGNTH.innerHTML = 
			"Password must be 6 characters or more";
		len = false; 
	}

	if (INPUT_PASSWORD.length > 24) {
		DISPLAY_LEGNTH.innerHTML = 
			"Password must be less than 24 characters";
		len = false; 
	}

	if (INPUT_USERNAME.length > 16) {
		DISPLAY_LEGNTH.innerHTML = 
			"Username must be less than 16 characters";
		len = false; 
	}

	let lower = false;
	let upper = false; 

	for (let i = 0; i < INPUT_PASSWORD.length; i++){
		const char: string = INPUT_PASSWORD[i];

		if (char >= "0" && char <= "9"){
			num = true;
		} if (!/[a-zA-Z0-9]/.test(char)){
			symbol = true;
		} if (/[a-z]/.test(char)){
			lower = true;
		} if (/[A-Z]/.test(char)){
			upper = true;
		}

	}

	if (len === true && num === true && symbol === true && lower === true && upper === true){
		DISPLAY_LEGNTH.innerHTML = "";
		DISPLAY_NUMS.innerHTML = "";
		DISPLAY_SYMBOLS.innerHTML = "";

		postSignup(INPUT_USERNAME, INPUT_PASSWORD);

	} if (!num){
		DISPLAY_NUMS.innerHTML = "Please include at least 1 number!";

	} if (!symbol){
		DISPLAY_SYMBOLS.innerHTML = "Please include at least 1 symbol!";
	} if (!lower || !upper){
		DISPLAY_EXISTS.innerHTML = "Please use an upper case and lower case letter";
	}
});

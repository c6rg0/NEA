function loginResponse(RESPONSE: Response){
	// Using "===" was causing a problem with if 401, 
	// probably because of the JSON that comes with it
	if (RESPONSE.status === 200){
		return window.location.assign("/");
	} if (RESPONSE.status == 401){
		return LOGIN_ERROR_DISPAY.innerHTML = "Incorrect username or password";
	} if (RESPONSE.status == 404){
		return LOGIN_ERROR_DISPAY.innerHTML = "User doesn't exist";
	} if (RESPONSE.status === 412){ 
		return LOGIN_ERROR_DISPAY.innerHTML = "Required credentials are missing";
	} else {
		console.log(RESPONSE.status);
		return LOGIN_ERROR_DISPAY.innerHTML = "Unexpected server problem";
	}
}

async function loginPost(INPUT_USERNAME: string, INPUT_PASSWORD: string) {
	const RESPONSE = await fetch("http://localhost:8000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: INPUT_USERNAME, 
			password: INPUT_PASSWORD 
		}),
	});

	return loginResponse(RESPONSE);
}

const LOGIN_FORM = document.
	getElementById("login_form") as HTMLFormElement;
const LOGIN_ERROR_DISPAY = document.
	getElementById("exists") as HTMLParagraphElement;

LOGIN_FORM.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const INPUT_USERNAME = (document.getElementById("username") as HTMLInputElement).value;
        const INPUT_PASSWORD = (document.getElementById("password") as HTMLInputElement).value;

        if (INPUT_USERNAME.trim() === "" || INPUT_PASSWORD.trim() === "") {
        	LOGIN_ERROR_DISPAY.innerHTML = 
			"Please fill in the fields";
        } else {
			LOGIN_ERROR_DISPAY.innerHTML = "";
			return loginPost(INPUT_USERNAME, INPUT_PASSWORD);
		}
});

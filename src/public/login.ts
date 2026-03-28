function loginResponse(response: Response){
	console.log(response.status);

	if (response.status === 401){
		return loginExists.innerHTML = "Incorrect username or password!";
	} if (response.status === 200){
		return window.location.assign("/");
	} else {
		return loginExists.innerHTML = "501";
	}
}

async function loginPost(username: string, password: string) {
	const response = await fetch("http://localhost:8000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username, 
			password: password 
		}),
	});

	return loginResponse(response);
}

const loginForm = document.
	getElementById("login_form") as HTMLFormElement;
const loginExists = document.
	getElementById("exists") as HTMLParagraphElement;
const loginLength = document.
	getElementById("length") as HTMLParagraphElement;

loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        if (username.trim() === " || password.trim() === ") {
        	return loginLength.innerHTML = 
			"Please fill in the fields";
        } else {
		loginLength.innerHTML = "";
		return loginPost(username, password);
	}
});



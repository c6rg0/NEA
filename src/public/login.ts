async function logPost(user: string, pass: string) {
	const response = await fetch("http://localhost:8000/submit-login", {
		method: 'POST',
		body: new URLSearchParams({ username: user, password: pass })
	});
}

const logForm = document.getElementById("login_form") as HTMLFormElement;
const logError = document.getElementById('error') as HTMLParagraphElement;

logForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        if (username.trim() === " || password.trim() === ") {
        	logError.innerHTML = "Please fill in the fields";
        }
	let passLen:number = password.length;
	if (passLen < 6) {
		logError.innerHTML = "Password must be 6 characters or more";
	}
	else {
		logError.innerHTML = "";
		const user = JSON.stringify({username: "string"});
		const pass = JSON.stringify({password: "string"});
		logPost(user, pass);
	}
});

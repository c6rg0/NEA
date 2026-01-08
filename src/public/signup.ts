async function sigPost(user: string, pass: string) {
	const response = await fetch("http://localhost:8000/submit-signup", {
		method: 'POST',
		body: new URLSearchParams({ username: user, password: pass })
	});
}

const sigForm = document.getElementById("signup_form") as HTMLFormElement;
const sigError = document.getElementById('error') as HTMLParagraphElement;

sigForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        if (username.trim() === " || password.trim() === ") {
        	sigError.innerHTML = "Please fill in the fields";
        }
	let passLen:number = password.length;
	if (passLen < 6) {
		sigError.innerHTML = "Password must be 6 characters or more";
	}
	else {
		sigError.innerHTML = "";
		const user = JSON.stringify({username: "string"});
		const pass = JSON.stringify({password: "string"});
		sigPost(user, pass);
	}
});

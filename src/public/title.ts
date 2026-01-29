async function titlePost(input_title: string) {
	try {
		const response = await fetch("http://localhost:8000/submit-title", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({title: input_title}),
		});

		let status: number = response.status;
		console.log(status);

		if (status === 204){
			titleErr.innerHTML = "Please login first and retry after you're logged in!";
			return;
		}

		if (status === 401){
			// User error
			titleErr.innerHTML =  "";
			return;
		}

		if (status === 409){
			// Clash with existing data
			titleErr.innerHTML = "";
			return;
		}

		if (status === 200){
			window.location.assign("/create-content");
			return;
		}

	} catch(error) {
		console.log("Error"+error);
		titleErr.innerHTML = ("!!Network error!!");
		return;
	}
}

const titleForm = document.
	getElementById("title_form") as HTMLFormElement;
const titleErr = document.
	getElementById('exists') as HTMLParagraphElement;

titleForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const input_title  = (document.getElementById("title") as HTMLInputElement).value;

        if (input_title.trim() === "") {
        	titleErr.innerHTML = 
			"Please fill in the fields";
        } else {
		titleErr.innerHTML = "";
		titlePost(input_title);
	}
});

// https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript

const form = document.querySelector("#form id");

async function sendData() {
	// Associate the FormData object with the form element
	const formData = new FormData(form)

	try {
		const response = await fetch("http://localhost:8000/submit-quiz-metadata", {
			method: "POST",
			// Set the FormData instance as the request body
			body: formData,
		});
		console.log(await response.json());
	} catch (e) {
		console.error(e);
	}
}

// Take over form submission
form.addEventListener("submit", (event) => {
	event.preventDefault();
	sendData();
});



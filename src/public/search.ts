const searchForm = document.
	getElementById("search_form") as HTMLFormElement;

document.addEventListener("DOMContentLoaded", () => {
	searchForm.addEventListener("submit", (event) => {
		event.preventDefault(); 
		console.log("Listener fired, prevented default");

		const input_search = (document.getElementById("search") as HTMLInputElement).value;

		if (input_search.trim() === "") {
			return;
		} else {
			const url = "http://localhost:8000/search/" + input_search;
			return window.location.href = url;
		}
	});
});

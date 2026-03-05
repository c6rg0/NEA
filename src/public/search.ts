const searchForm = document.
	getElementById("search_form") as HTMLFormElement;

searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const input_search = (document.getElementById("search") as HTMLInputElement).value;

	if (input_search.trim() === "") {
        	return;
	} else {
		const url = "http://localhost:8000/search/" + input_search;
		window.location.assign(url);
		return;
	}
});

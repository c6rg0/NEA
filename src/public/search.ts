const SEARCH_FORM = document.
	getElementById("search_form") as HTMLFormElement;

const PLACEHOLDER_FORM = document.
	getElementById("placeholder_form") as HTMLButtonElement;

const PLACEHOLDER_BUTTON = document.
	getElementById("placeholder_button") as HTMLButtonElement;

// FTS5 doesn't allow special characters (like "'")
// POC: SqliteError: fts5: syntax error near "'"	
// Inputs should be stripped to just alphanumeric symbols

SEARCH_FORM.addEventListener("submit", (event) => {
	event.preventDefault(); 
	console.log("Listener fired, prevented default");

	let unsanitizedSearch = (document.getElementById("search") as HTMLInputElement).value;
	const SYMBOL_STRIP: RegExp = /[^a-zA-Z0-9 ]/g;
	const SEARCH: string = unsanitizedSearch.replace(SYMBOL_STRIP, "").trim();
	console.log(SEARCH);
	
	if (SEARCH) {
		const NEW_URL = new URL(window.location.href);

		// Need to replace any existing search query with 
		// regex.

		NEW_URL.searchParams.set("q", SEARCH); 
		// "http://localhost:8000/search?q=Digit"
		window.location.assign(NEW_URL.toString());

	} else {
		return;
	}
});

PLACEHOLDER_FORM.addEventListener("submit", (event) => {
	event.preventDefault(); 

	const NEW_URL = new URL(window.location.href);
	// Filter upper bound and filter lower bound
	NEW_URL.searchParams.set("fu", "500"); 
	NEW_URL.searchParams.set("fl", "1000"); 

});

PLACEHOLDER_BUTTON.addEventListener("submit", (event) => {
	event.preventDefault(); 

	const NEW_URL = new URL(window.location.href);
	NEW_URL.searchParams.set("order", "DESC"); 
	NEW_URL.searchParams.set("sort", "time_created"); 
	window.location.assign(NEW_URL.toString());

});

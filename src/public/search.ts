const searchForm = document.
	getElementById("search_form") as HTMLFormElement;

// FTS5 doesn't allow special characters (like "'")
// POC: SqliteError: fts5: syntax error near "'"	
// Inputs should be stripped to just alphanumeric symbols

searchForm.addEventListener("submit", (event) => {
	event.preventDefault(); 
	console.log("Listener fired, prevented default");

	let unsanitizedSearch = (document.getElementById("search") as HTMLInputElement).value;
	const reForAlphNum: RegExp = /[^a-zA-Z0-9 ]/g;
	const search: string = unsanitizedSearch.replace(reForAlphNum, "").trim();
	console.log(search);
	
	if (search) {
		const url = new URL("http://localhost:8000/search");

		url.searchParams.set("q", search); 
		// url.searchParams.set("sort", "tries_desc");
		console.log(url.toString());
		// "http://localhost:8000/search?q=Digit(&sort=tries_desc)"

		window.location.assign(url.toString());

	} else {
		return;
	}
});

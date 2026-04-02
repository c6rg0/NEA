const searchForm = document.
	getElementById("search_form") as HTMLFormElement;

// FTS5 doesn't allow special characters (like "'")
// POC: SqliteError: fts5: syntax error near "'"	
// Inputs should be stripped to just alphanumeric symbols

searchForm.addEventListener("submit", (event) => {
	event.preventDefault(); 
	console.log("Listener fired, prevented default");

	const unsanitizedSearch = (document.getElementById("search") as HTMLInputElement).value;
	const reForAlphNum: RegExp = /[a-zA-Z0-9]+/;
	const search = reForAlphNum.exec(unsanitizedSearch);
	console.log(search);

	if (search) {
		const url = "http://localhost:8000/search/" + search;
		return window.location.href = url;
	} else {
		return;
	}
});

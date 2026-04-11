const SEARCH_FORM = document.
	getElementById("search_form") as HTMLFormElement;

const FILTER_FORM = document.
	getElementById("filter_form") as HTMLButtonElement;

// Setting the HREF of the buttons responsible for changing order
const ORDER_DESC = document.getElementById("order_desc") as HTMLAnchorElement;
const ORDER_ASC = document.getElementById("order_asc") as HTMLAnchorElement;

if (ORDER_DESC){
	const CURL= new URL(window.location.href);
	CURL.searchParams.set("order", "DESC"); 
	ORDER_DESC.href = CURL.toString();
}

if (ORDER_ASC){
	const CURL= new URL(window.location.href);
	CURL.searchParams.set("order", "ASC"); 
	ORDER_ASC.href = CURL.toString();
}

// sortWhitelist = ["elo", "time_created", "tries"]; 
const ELO_SORT = document.getElementById("elo_sort") as HTMLAnchorElement;
if (ELO_SORT){
	const CURL= new URL(window.location.href);
	CURL.searchParams.set("sort", "elo"); 
	ELO_SORT.href = CURL.toString();
}

const TIME_SORT = document.getElementById("time_sort") as HTMLAnchorElement;
if (TIME_SORT){
	const CURL= new URL(window.location.href);
	CURL.searchParams.set("sort", "time_created"); 
	TIME_SORT.href = CURL.toString();
}

const TRIES_SORT = document.getElementById("tries_sort") as HTMLAnchorElement;
if (TRIES_SORT){
	const CURL= new URL(window.location.href);
	CURL.searchParams.set("sort", "times_attempted"); 
	TRIES_SORT.href = CURL.toString();
}

const PREVIOUS = document.getElementById("previous") as HTMLAnchorElement;
const NEXT = document.getElementById("next") as HTMLAnchorElement;

if (PREVIOUS){
	const CURL = new URL(window.location.href);
	if (CURL.searchParams.has("page")){
		let page = CURL.searchParams.get("page");
		const PARSED = Number(page);
		if (!isNaN(PARSED)){
			if (PARSED >= 2){
				// Need to get what the previous page num is,
				// also, don't let it go below 1; if 1, keep 1.
				CURL.searchParams.set("page", (PARSED - 1).toString()); 
				PREVIOUS.href = CURL.toString();
			} else {
				CURL.searchParams.set("page", "1"); 
				PREVIOUS.href = CURL.toString();
			}
		}
	} else {
		CURL.searchParams.set("page", "1"); 
		PREVIOUS.href = CURL.toString();
	}
}

if (NEXT){
	const CURL = new URL(window.location.href);
	if (CURL.searchParams.has("page")){
		let page = CURL.searchParams.get("page");
		const PARSED = Number(page);
		if (!isNaN(PARSED)){
			// Need to get what the previous page num is,
			// also, don't let it go below 1; if 1, keep 1.
			CURL.searchParams.set("page", (PARSED + 1).toString()); 
			NEXT.href = CURL.toString();
		}
	} else {
		CURL.searchParams.set("page", "2"); 
		NEXT.href = CURL.toString();
	}
}

// FTS doesn't allow special characters (like "'")
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

FILTER_FORM.addEventListener("submit", (event) => {
	event.preventDefault(); 

	const NEW_URL = new URL(window.location.href);
	const eloLower: string = (document.getElementById("elo_lower") as HTMLInputElement).value;
	const eloUpper: string = (document.getElementById("elo_upper") as HTMLInputElement).value;

	if (eloLower){
		NEW_URL.searchParams.set("fl", eloLower); 
	}

	if (eloUpper){
		NEW_URL.searchParams.set("fu", eloUpper); 
	}

	if (eloLower || eloUpper){
		window.location.assign(NEW_URL.toString());
	}
);

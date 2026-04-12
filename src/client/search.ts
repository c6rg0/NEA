orderURLAssign();
sortURLAssign();
paginationURLAssign();

function orderURLAssign(){
	const ORDER_DESC = document.getElementById("order_desc") as HTMLAnchorElement;
	if (ORDER_DESC){
		// CURL: current URL
		const CURL= new URL(window.location.href);
		CURL.searchParams.set("order", "DESC");
		ORDER_DESC.href = CURL.toString();
	}

	const ORDER_ASC = document.getElementById("order_asc") as HTMLAnchorElement;
	if (ORDER_ASC){
		const CURL= new URL(window.location.href);
		CURL.searchParams.set("order", "ASC"); 
		ORDER_ASC.href = CURL.toString();
	}
}

function sortURLAssign(){
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
}

function paginationURLAssign(){
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
}

function inputSanitization(DIRTY_INPUT: string){
	// FTS doesn't allow special characters (like "'")
	// POC: SqliteError: fts5: syntax error near "'"	
	// Inputs should be stripped to just alphanumeric symbols

	const SYMBOL_STRIP: RegExp = /[^a-zA-Z0-9 ]/g;
	return DIRTY_INPUT.replace(SYMBOL_STRIP, "").trim();
}

const SEARCH_FORM = document.
	getElementById("search_form") as HTMLFormElement;

SEARCH_FORM.addEventListener("submit", (event) => {
	event.preventDefault(); 

	const DIRTY_INPUT: string = (document.getElementById("search") as HTMLInputElement).value;
	const SEARCH: string = inputSanitization(DIRTY_INPUT);
		
	// Sanitizing first because the user could have only entered symbols
	if (SEARCH && SEARCH !== "") {
		const NEW_URL = new URL(window.location.href);
		NEW_URL.searchParams.set("q", SEARCH); 
		window.location.assign(NEW_URL.toString());
	} 
});

const FILTER_FORM = document.
	getElementById("filter_form") as HTMLButtonElement;

FILTER_FORM.addEventListener("submit", (event) => {
	event.preventDefault(); 

	const NEW_URL = new URL(window.location.href);
	const ELO_LOWER: string = (document.getElementById("elo_lower") as HTMLInputElement).value;
	const ELO_UPPER: string = (document.getElementById("elo_upper") as HTMLInputElement).value;

	if (ELO_LOWER){
		NEW_URL.searchParams.set("fl", ELO_LOWER); 
	}

	if (ELO_UPPER){
		NEW_URL.searchParams.set("fu", ELO_UPPER); 
	}

	if (ELO_LOWER || ELO_UPPER){
		window.location.assign(NEW_URL.toString());
	}
});

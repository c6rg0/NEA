async function searchGet(input_search: string) {
	try {
		const response = await fetch("http://localhost:8000/search-request", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ input_search: input_search}),
		});

		let status: number = response.status;
		console.log(status);

		if (status === 200){
			window.location.assign("/");
			return;
		}

	} catch(error) {
		console.log("Error"+error);
		return;
	}
}

const searchForm = document.
	getElementById("search_form") as HTMLFormElement;

searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const input_search = (document.getElementById("title") as HTMLInputElement).value;

	if (input_search.trim() === "") {
        	return;
	} else {
		searchGet(input_search);
	}
});

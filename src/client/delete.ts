async function deleteFetch(){
	const RESPONSE = await fetch(window.location.href, {
		method: "DELETE",
	});

	if (RESPONSE.status === 200){
		return window.location.href = "http://localhost:8000/user";
	} else {
		console.log(RESPONSE.status);
	}
}

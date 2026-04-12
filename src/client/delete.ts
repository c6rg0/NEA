async function deleteFetch(){
	const RESPONSE = await fetch(window.location.href, {
		method: "DELETE",
	});

	if (RESPONSE.status === 200){
		window.location.href = "http://localhost:8000/user";
	} else {
		window.location.href = "http://localhost:8000/user";
		return console.log(RESPONSE.status);
	}
}

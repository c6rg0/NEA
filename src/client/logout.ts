async function logout() {
	const RESPONSE = await fetch("http://localhost:8000/logout", {
		method: "POST",
	});

	if (RESPONSE.status === 200) {
		return window.location.assign("/");
	} else {
		console.log(RESPONSE.status);
	}
}



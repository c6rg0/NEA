function logoutResponse(RESPONSE: Response){
	if (RESPONSE.status === 200){
		return window.location.assign("/");
	} else {
		console.log(RESPONSE.status);
	} 
}

async function logout() {
	const RESPONSE = await fetch("http://localhost:8000/logout", {
		method: "POST",
	});

	return logoutResponse(RESPONSE);
}



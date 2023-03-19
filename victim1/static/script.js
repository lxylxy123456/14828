document.getElementById("load").addEventListener("click", function(event) {
	event.preventDefault();
	const req = new XMLHttpRequest();
	req.addEventListener("load", function(event) {
		eval(req.responseText);
	});
	req.open("GET", "/static/dynamic.js");
	req.send();
});

document.getElementById("redir_update").addEventListener("click", function(e) {
	e.preventDefault();
	const payload = new FormData();
	payload.append("url", document.getElementById("redir_url").value);
	const req = new XMLHttpRequest();
	req.open("POST", "/redirect");
	req.send(payload);
});

for (let i of document.getElementsByClassName("redir_prefill")) {
	i.addEventListener("click", function(event) {
		const attacker = document.getElementById("attacker").value;
		let url = i.innerText.replace("ATTACKER", attacker);
		document.getElementById("redir_url").value = url;
	});
}


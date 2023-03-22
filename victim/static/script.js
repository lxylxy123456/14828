document.getElementById("load").addEventListener("click", function(event) {
	event.preventDefault();
	const req = new XMLHttpRequest();
	req.addEventListener("load", function(event) {
		eval(req.responseText);
	});
	req.open("GET", "/static/dynamic.js");
	req.send();
});

function send_redir_url() {
	const payload = new FormData();
	payload.append("url", document.getElementById("redir_url").value);
	const req = new XMLHttpRequest();
	req.open("POST", "/redirect");
	req.send(payload);
}

document.getElementById("redir_url").addEventListener("input", send_redir_url);

for (let i of document.getElementsByClassName("redir_prefill")) {
	i.addEventListener("click", function(event) {
		document.getElementById("redir_url").value = this.innerText;
		send_redir_url();
	});
}

{
	const req = new XMLHttpRequest();
	req.addEventListener("load", function(event) {
		document.getElementById("user").value = req.responseText;
	});
	req.open("GET", "/upload/user.js");
	req.send();
}

document.getElementById("user").addEventListener("input", function(event) {
	const payload = new FormData();
	payload.append("user", this.value);
	const req = new XMLHttpRequest();
	req.open("POST", "/upload/user.js");
	req.send(payload);
});

document.getElementById("csp_apply").addEventListener("click", function(event) {
	event.preventDefault();
	location.reload();
});

function handle_check(event) {
	const payload = new FormData();
	for (let i = 0;; i++) {
		const elem = document.getElementById("c" + i);
		payload.append("c" + i, JSON.stringify(elem.checked));
		if (elem.classList.contains("last")) {
			break;
		}
	}

	const req = new XMLHttpRequest();
	req.open("POST", "/csp-list");
	req.send(payload);
}

for (let i = 0;; i++) {
	const elem = document.getElementById("c" + i);
	elem.addEventListener("click", handle_check);
	if (elem.classList.contains("last")) {
		break;
	}
}


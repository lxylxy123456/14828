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
	req.open("POST", "/filter-list");
	req.send(payload);
}

for (let i = 0;; i++) {
	const elem = document.getElementById("c" + i);
	elem.addEventListener("click", handle_check);
	if (elem.classList.contains("last")) {
		break;
	}
}


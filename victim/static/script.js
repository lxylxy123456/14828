/*
 *  Demo of Arbitrary Code Injection in Adblock Plus
 *  Copyright (C) 2023  Eric Li, Teresa Alberto, and Chengcheng Ding
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

{
	const req = new XMLHttpRequest();
	const url = new URL('/advertisement', document.baseURI);
	const params = new URLSearchParams();
	params.set('city', 'pittsburgh');
	params.set('role', 'students');
	params.set('company', 'CMU');
	url.search = params.toString();
	req.addEventListener("load", function() {
		document.getElementById("user_info").innerText = req.responseText;
	});
	req.open("GET", url, true);
	req.send();
}


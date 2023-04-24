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


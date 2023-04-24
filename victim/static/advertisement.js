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

// https://stackoverflow.com/questions/9815762/

{
	const img = new Image();
	img.addEventListener("load", function(event) {
		document.getElementById("ajs").className = "success";
		document.getElementById("ajs").innerText = "OK";
	});
	img.addEventListener("error", function(event) {
		document.getElementById("ajs").className = "warn";
		document.getElementById("ajs").innerText = "Blocked";
	});
	img.src = "/static/advertisement.png";
	document.getElementById("ads_png").appendChild(img);
}


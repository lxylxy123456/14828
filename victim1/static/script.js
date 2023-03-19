document.getElementById("sjs").innerText = "Static JS loaded";
document.getElementById("sjs").classList.remove("fail");
document.getElementById("sjs").classList.add("success");

document.getElementById("load").addEventListener("click", function(event) {
	event.preventDefault();
	const req = new XMLHttpRequest();
	req.addEventListener("load", function(event) {
		eval(req.responseText);
	});
	req.open("GET", "/static/dynamic.js");
	req.send();
});


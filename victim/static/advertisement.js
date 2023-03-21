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


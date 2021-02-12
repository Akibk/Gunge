
const HTTP = new XMLHttpRequest();
HTTP.open("GET","https://a.4cdn.org/po/catalog.json");
HTTP.send();
HTTP.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var jason = JSON.parse(this.responseText);
		var data = jason[0].threads[0];
		console.log(data);
		alert(data);
	} else {
		alert(this.readyState + " "+this.status);
}
}

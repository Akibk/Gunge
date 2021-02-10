function aler(sttext){
	document.getElementById("messme").innerHTML = sttext;
}

function placeTub(vid){
	var ifrm = document.createElement("iframe")
	ifrm.setAttribute("src", "https://www.youtube-nocookie.com/embed/"+vid);
	ifrm.setAttribute("frameborder", "0");
	ifrm.style.width = "560px";
	ifrm.style.height = "480px";
	ifrm.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
	document.body.appendChild(ifrm);
}

function placeTwat(tweet){
	var blkq = document.createElement("blockquote");
	blkq.classList.add("quote")
	blkq.setAttribute("class", "twitter-tweet");
	blkq.innerHTML = tweet;
	document.body.appendChild(x);
}

const Http = new XMLHttpRequest();
aler("set the url");
var search = "goo";
var url = "https://www.youtuberandom.com";
aler("getting url");
Http.open("GET", url);
Http.send();
aler("sent url");
Http.onreadystatechange=function(){
	if(this.readyState==4 && this.status==200){
		aler("found");
		var str = Http.responseText
		let re = /videoId:"[a-zA-Z0-9-_]{11}/g
		aler("gonna do the reggie");
		var vid_arr = str.match(re);
		var vid = vid_arr[0].slice(9);

		aler("regex found");
		placeTub(vid);
		aler("vid playing");
	} else {
		aler("vid ready state: "+this.readyState+", status: " + this.status);
	}
}


const Httap = new XMLHttpRequest();
aler("set the url");
var ural = "http://tweet.onerandom.com";
aler("getting url");
Httap.open("GET", ural);
Httap.withCredentials = true;
Httap.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
Httap.setRequestHeader("Accept-Language", "en-US,en;q=0.5");
Httap.setRequestHeader("Connection", "keep-alive");
Httap.setRequestHeader("Upgrade-Insecure-Requests", "1");

Httap.send();
aler("sent url: " + ural);
Httap.onreadystatechange=function(){
	if(this.readyState==4 && this.status==200){
		aler("found");
		var star = Http.responseText
		let rae = /<block[\s\S]+?kquote>/g
		aler("gonna do the reggie");
		var twe_arr = star.match(rae);
		var tweet = twe_arr[0];

		aler("regex found");
		placeTwat(tweet);
		aler("tweet tweeting");
	} else {
		aler("tweet ready state: "+this.readyState+", status: " + this.statustext + ", text: " + this.responsetext);
	}
}

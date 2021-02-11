aler("DOOT");
getTub();
getRed();

function aler(sttext) {
	document.getElementById("messme").innerHTML = sttext;
}

function placeTub(vid) {
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute("src", "https://www.youtube-nocookie.com/embed/" + vid);
	ifrm.setAttribute("frameborder", "0");
	ifrm.style.width = "560px";
	ifrm.style.height = "480px";
	ifrm.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
	document.body.appendChild(ifrm);
}

function placeTwat(tweet) {
	var blkq = document.createElement("blockquote");
	blkq.classList.add("quote");
	blkq.setAttribute("class", "twitter-tweet");
	blkq.innerHTML = tweet;
	document.body.appendChild(blkq);
}

function placeRed(LINK, SUBR, TITLE) {
	var blkq = document.createElement("blockquote");
	blkq.classList.add("quote");
	blkq.setAttribute("class", "reddit-card");
	blkq.innerHTML = "<a href=" + LINK + ">" + TITLE + "</a> from <a href=\"http://www.reddit.com/" + SUBR + "\">" + SUBR + "</a>";
	document.body.appendChild(blkq);
}

function getrndSub() {
	const tot_line = 1082971;
	const HTTP = new XMLHttpRequest();
	//const url = "./subreddits.txt";
	HTTP.open("GET", url);
	HTTP.send();
	HTTP.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const filecontent = this.responseText;
			const filelines = filecontent.split('\n');
			const idx = Math.floor(Math.random() * tot_line);
			const sub = filelines[idx];
			return sub;
		}
	}
}

function getTub() {

	const Http = new XMLHttpRequest();
	aler("set the url");
	const url = "https://www.youtuberandom.com";
	aler("getting url");
	Http.open("GET", url);
	Http.send();
	aler("sent url");
	Http.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			aler("found");
			const str = Http.responseText;
			const re = /videoId:"[a-zA-Z0-9-_]{11}/g;
			aler("gonna do the reggie");
			const vid_arr = str.match(re);
			const vid = vid_arr[0].slice(9);

			aler("regex found");
			placeTub(vid);
			aler("vid playing");
		} else {
			aler("vid ready state: " + this.readyState + ", status: " + this.status);
		}
	}
}

function getRed() {

	const HTTP = new XMLHttpRequest();
	let SUBR = getrndSub();

	const url = "http://www.reddit.com/r/" + SUBR + "/.json";
	HTTP.open("GET", url);
	HTTP.send();
	HTTP.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jason = JSON.parse(this.readtext);
			const tot_len = jason.data.children.length;
			const rndthread = Math.floor(Math.random() * tot_len);
			const data_jason = jason.data.children[rndthread].data;

			const TITLE = data_jason.title;
			const LINK = data_jason.permalink;
			SUBR = "/r/" + SUBR;

			placeRed(LINK, SUBR, TITLE);
		} else {
			aler("reddit rstate: " + this.readyState + " status: " + this.status);
		}
	}
}

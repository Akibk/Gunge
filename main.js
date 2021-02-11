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

function placeRed(LINK, SUBR, TITLE){
	const quotesEl = document.querySelector('.quotes');
	const quoteEl = document.createElement('blockquote');
	quoteEl.classList.add('quote');
	quoteEl.setAttribute("class", "reddit-card");
	let url = "<a href=\"https://old.reddit.com" + LINK + "\">" + TITLE + "</a> from <a href=\"http://www.reddit.com" + SUBR + "\">" + SUBR + "</a>";
	quoteEl.innerHTML = url;
	//quoteEl.innerHTML = `<a href="https://old.reddit.com/r/Military/comments/lgioio/prince_harry_recently_won_a_court_case_against_a/?ref=share&ref_source=embed">Prince Harry recently won a court case against a news rag, and will be donating the winnings to the Invictus fund for disabled Veterans.</a> from <a href="http://www.reddit.com/r/Military">r/Military</a>`;
	quotesEl.appendChild(quoteEl);


	const scr = document.createElement("script");
	scr.charset = "UTF-8";
	scr.async = true;
	scr.src = "https://embed.redditmedia.com/widgets/platform.js";
	quotesEl.appendChild(scr);

}



function plaeRed(LINK, SUBR, TITLE) {
	const posts = document.querySelector('.quotes');
	const quote = document.createElement('blockquote');
	quote.classList.add('quote');
	quote.setAttribute("class", "reddit-card");
	quote.innerHTML = "<a href=" + LINK + ">" + TITLE + "</a> from <a href=\"http://www.reddit.com/" + SUBR + "\">" + SUBR + "</a>";
	posts.appendChild(quote);

	const scr = document.createElement("script");
	scr.charset = "UTF-8";
	scr.async = true;
	scr.src = "https://embed.redditmedia.com/widgets/platform.js";
	posts.appendChild(scr);
}

function getrndSub() {
	const redlist = ["viXra_revA", "vixra", "Discontinence", "sorceryofthespectacle"];
	var redout = redlist[ Math.floor(Math.random() * redlist.length) ];
	return redout;
}

function getrndoSub() {
	const tot_line = 1082971;
	const HTTP = new XMLHttpRequest();
	//const url = "subreddits.txt";
	const url = "https://old.reddit.com/r/viXra_revA/wiki/index/.json";	
	HTTP.open("GET", url);
	//HTTP.withCredentials = true;
	//HTTP.setRequestHeader("Access-Control-Allow-Origin", '*'); 
	HTTP.send();
	HTTP.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			aler("got the file");
			const filecontent = this.responseText;
			aler("converting to lines");
			const filelines = filecontent.split('\n');
			aler("example line: " + filelines[0]);
			const idx = Math.floor(Math.random() * tot_line);
			aler("index: "+idx);
			const sub = filelines[idx];
			aler("got sub: "+sub);
			return sub;
		} else {
			aler("getting list: "+this.responseURL+", state: " + this.readyState + " status: "+this.status);
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
			aler("vid from: "+this.responseURL+" ready state: " + this.readyState + ", status: " + this.status);
		}
	}
}

function getRed() {

	const HTTP = new XMLHttpRequest();
	aler("getrndSub");
	let SUBR = getrndSub();
	aler(SUBR);

	const url = "https://www.reddit.com/r/" + SUBR + "/.json";
	HTTP.open("GET", url);
	HTTP.send();
	HTTP.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jason = JSON.parse(this.responseText);
			const tot_len = jason.data.children.length;
			const rndthread = Math.floor(Math.random() * tot_len);
			const data_jason = jason.data.children[rndthread].data;

			const TITLE = data_jason.title;
			const LINK = data_jason.permalink;
			SUBR = "/r/" + SUBR;
			aler("successfully got reddit post");
			placeRed(LINK, SUBR, TITLE);
		} else {
			aler("reddit: "+SUBR+" rstate: " + this.readyState + " status: " + this.status);
		}
	}
}

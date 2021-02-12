function aler(sttext) {
	document.getElementById("messme").innerHTML = sttext;
}

function placeTub(vid) {
	const quotesEl = document.querySelector('.quotes');
	const ifrm = document.createElement("iframe");
	ifrm.setAttribute("src", "https://www.youtube-nocookie.com/embed/" + vid);
	ifrm.setAttribute("frameborder", "0");
	ifrm.style.width = "560px";
	ifrm.style.height = "480px";
	ifrm.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
	quotesEl.appendChild(ifrm);
}

function placeTwat(tweet){
	const quotesEl = document.querySelector('.quotes');
	const quoteEl = document.createElement('blockquote');
	quoteEl.classList.add('quote');
	quoteEl.setAttribute("class", "twitter-tweet");
	let url = '<a href="https://twitter.com/"'+tweet+'>F</a>';
	quoteEl.innerHTML = url;
	quotesEl.appendChild(quoteEl);

	const scr = document.createElement("script");
	scr.charset = "UTF-8";
	scr.async = true;
	scr.src = "https://platform.twitter.com/widgets.js";
	quotesEl.appendChild(scr);

}

function placeRed(LINK, SUBR, TITLE){
	const quotesEl = document.querySelector('.quotes');
	const quoteEl = document.createElement('blockquote');
	quoteEl.classList.add('quote');
	quoteEl.setAttribute("class", "reddit-card");
	let url = "<a href=\"https://old.reddit.com" + LINK + "\">" + TITLE + "</a> from <a href=\"http://www.reddit.com" + SUBR + "\">" + SUBR + "</a>";
	quoteEl.innerHTML = url;
	quotesEl.appendChild(quoteEl);

	const scr = document.createElement("script");
	scr.charset = "UTF-8";
	scr.async = true;
	scr.src = "https://embed.redditmedia.com/widgets/platform.js";
	quotesEl.appendChild(scr);

}

function getTub() {
	const Http = new XMLHttpRequest();
	aler("set the url");
	const url = "https://www.youtuberandom.com/?r="+Math.floor(Math.random()*100000);
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

function getTwat() {

	const HTTP = new XMLHttpRequest();
	const url = "https://tweet.kylescheer.com/?r=2";
	HTTP.open("GET", url);
	HTTP.send();
	HTTP.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const str = HTTP.responseText;
			const re = /ID of Tweet: <\/b>([0-9]+?)<[\s\S]+?Screen name: <\/b>([\s\S]+?)</g;
			aler("gonna do the reggie");
			const tw_arr = str.match(re);
			aler(tw_arr);
			const ID = tw_arr[0];
			const NAME = tw_arr[1];
			var tweet = NAME+"/status/"+ID;
			aler(tweet);
			placeTwat(tweet);
		} else {
			aler("twitter rstate: " + this.readyState + " status: " + this.status);
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




    window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
		aler("DOOT");
		getTub();
		getRed();
		//placeTwat();
        }
    }, {
        passive: true
    });

getTub();
getRed();
//getTwat();

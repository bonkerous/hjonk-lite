async function getPost() {
	const handle = document.getElementById("handleInput").value;
	const apiurl = "https://hjonk.me/api/v1.0/posts/" + handle
	
	document.querySelector(".hjonk-posts").innerHTML = "";
	document.querySelector(".hjonk-posts").innerHTML = "Working...";

	try {
		const responce = await fetch(apiurl);
		document.querySelector(".hjonk-posts").innerHTML = "";
		
		if (!responce.ok) {
			throw new Error('Responce status: ${responce.status}');
		}
		
		const json = await responce.json();
		
		for (const property in json) {
			const post = json[property].body;
			const postDate = json[property].created_at;
			
			if (json[property].media != null) {
				console.log('fuck you');
			};
			
			const node = document.createElement("div");
			const post_date = document.createTextNode("Posted at " + postDate);
			const post_body = document.createTextNode(post);
			node.appendChild(document.createElement("br"));
			node.appendChild(document.createElement("hr"));
			node.appendChild(post_date);
			node.appendChild(document.createElement("br"));
			node.appendChild(post_body);
			node.appendChild(document.createElement("br"));
			node.appendChild(document.createElement("hr"));
			document.querySelector(".hjonk-posts").appendChild(node);
		}
	} catch (error) {
		console.error(error.message);
	}
}

async function getFeed() {
	document.querySelector(".hjonk-feed").innerHTML = "";
	document.querySelector(".hjonk-feed").innerHTML = "Working...";
	const rssurl = "https://hjonk.me/rss/feed";
	const parser = new DOMParser();
	try {
		const response = await fetch(rssurl);
		if (!response.ok) {
			throw new Error('Response status: ${responce.status}');
		}
		document.querySelector(".hjonk-feed").innerHTML = "";
		const response_data = await response.text();
		const feed = parser.parseFromString(response_data, "text/xml");
		const errorNode = feed.querySelector("parsererror");
		if (errorNode) {
			console.log("error while parsing");
		} else {
			// pass
		}
		
		for (const property in feed.getElementsByTagName("item")) {
			if (property == 0) {
				// pass
			}
			else {
				const node = document.createElement("div");
				const post_date = "Posted at " + feed.getElementsByTagName("pubDate")[property].childNodes[0].nodeValue;
				const post_body = feed.getElementsByTagName("description")[property].childNodes[0].nodeValue;
				node.appendChild(document.createElement("br"));
				node.appendChild(document.createElement("hr"));
				node.append(post_date);
				node.appendChild(document.createElement("br"));
				node.append(post_body);
				node.appendChild(document.createElement("br"));
				node.appendChild(document.createElement("hr"));
				document.querySelector(".hjonk-feed").appendChild(node);
			}
		}
	} catch (error) {
		console.error(error.message);
		console.log("\"can't access property 0, feed.getElementsByTagName(...)[property].childNodes is undefined\" means the post was a repost and had no content, don't worry about it.")
	}
}

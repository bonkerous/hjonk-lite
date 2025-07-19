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
			node.class = "post-card";
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
	const rssurl = "https://hjonk.me/rss/feed"
	try {
		const response = await fetch(rssurl);
		if (!response.ok) {
			throw new Error('Response status: ${responce.status}');
		}
		
		const feed = response => response.text().then(str => new window.DOMParser().parseFromString(str, "text/xml"));
		
		const node = document.createElement("div");
		node.clas
		const textnode = document.createTextNode(feed);
		node.appendChild(textnode);
		document.querySelector(".hjonk-feed").innerHTML = "";
		document.querySelector(".hjonk-feed").appendChild(node);
	} catch (error) {
		console.error(error.message);
	}
}
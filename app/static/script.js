document.addEventListener("DOMContentLoaded", () => {
	const msgDisplay = document.querySelector("#messages");
	const msg = document.querySelector("#message");
	const submit = document.querySelector("#submit");
	const userId = Math.floor(Math.random() * 1000);

	const ws = io.connect("http://localhost:5000");
	ws.on("connect", () => {
		ws.send("User connected!");
	});

	ws.on("message", data => {
		const dataObj = JSON.parse(data);
		const newMessage = document.createElement("div");
		const userTitle = document.createElement("h3");
		const content = document.createElement("p");
		const time = document.createElement("p");

		userTitle.innerText = dataObj["userId"];
		content.innerText = dataObj["content"];
		time.innerText = dataObj["time"];

		newMessage.append(userTitle);
		newMessage.append(content);
		newMessage.append(time);

		msgDisplay.append(newMessage);
		msg.value = "";
	});

	submit.addEventListener("click", e => {
		e.preventDefault();
		const data = {
			userId: userId,
			content: msg.value,
			time: Date(Date.now()).toString().slice(0, 25)
		};
		ws.send(JSON.stringify(data));
	});
});

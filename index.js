const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("This is my proxy server")
})

app.listen(5000, () => {
	console.log("Listening on local port 5000");
});

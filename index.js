const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
})
const url = require("url");

app.get("/", (req, res) => {
	res.send("This is my proxy server")
});

app.use("/world-weather", limiter, (req, res, next) => {
	const city = req.query.city
	createProxyMiddleware({
		target: `https://api.weatherapi.com/v1/current.json?key=2dc5159ca1f2424599874900210112&q=${city}&aqi=no`,
		changeOrigin: true,
		// pathRewrite: {
		// 	[]: "",
		// },
	})(req, res, next);
});

app.listen(5000, () => {
	console.log("Listening on local port 5000");
});

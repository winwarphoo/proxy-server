const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
})
require("dotenv").config();
const url = require("url");

app.get("/", (req, res) => {
	res.send("This is my proxy server")
});

app.use("/world-weather", limiter, (req, res, next) => {
	const city = req.query.city
	createProxyMiddleware({
		target:`${process.env.BASE_API_URL_WORLD_WEATHER}?key=${process.env.API_KEY}&q=${city}&aqi=no`,
		changeOrigin: true,
		// pathRewrite: {
		// 	[]: "",
		// },
	})(req, res, next);
});

app.listen(5000, () => {
	console.log("Listening on local port 5000");
});

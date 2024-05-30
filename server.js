const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Define paths for the certificate files
const keyPath = path.resolve(__dirname, "key.pem");
const certPath = path.resolve(__dirname, "cert.pem");

// Set up the HTTPS server
const server = https.createServer(
	{
		key: fs.readFileSync(keyPath),
		cert: fs.readFileSync(certPath),
	},
	app
);

// Proxy middleware to forward requests to Vite development server
app.use(
	"/",
	createProxyMiddleware({
		target: "http://localhost:3000", // Vite's default port
		changeOrigin: true,
		secure: false,
		onProxyReq: (proxyReq, req, res) => {
			console.log("Proxying request:", req.url);
		},
		onProxyRes: (proxyRes, req, res) => {
			console.log("Response from target:", proxyRes.statusCode);
		},
	})
);

// Start the server on port 443
server.listen(443, "0.0.0.0", () => {
	console.log("HTTPS server running");
});

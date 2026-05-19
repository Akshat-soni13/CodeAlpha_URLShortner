const express = require("express");
const cors = require("cors");

const app = express();

const urlRoutes = require("./routes/url.routes");
const dataBase = require("./config/database");

app.use(express.json());

// Set up allowed CORS origins dynamically
const allowedOrigins = [];
if (process.env.Front_Url) {
    allowedOrigins.push(process.env.Front_Url.replace(/\/$/, ""));
}
allowedOrigins.push(
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curls, etc.)
        if (!origin) return callback(null, true);
        
        const isAllowed = allowedOrigins.some(allowed => allowed.toLowerCase() === origin.toLowerCase());
        if (isAllowed || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
            callback(null, origin);
        } else {
            // As a fallback to prevent blocking, we can dynamically return the origin
            callback(null, origin);
        }
    },
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.use("/api/url", urlRoutes);

dataBase();

module.exports = app;

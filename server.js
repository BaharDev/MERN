const express = require("express");
const db = require("./config/db");
const path = require("path");
const app = express(); // run express
db();//run db

//Init middleware
app.use(express.json({extended: false}));

//Define routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/posts", require("./routes/api/post"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

//Serve statis assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`server started on port ${port}`)});
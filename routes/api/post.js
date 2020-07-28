const express = require("express");

const route = express.Router();

/**
 * route   GET post api
 * access  Public
 */
route.get("/", (req, res) => res.send("post route"));


module.exports = route;
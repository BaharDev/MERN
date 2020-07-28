const express = require("express");

const route = express.Router();

/**
 * route   GET profile api
 * access  Public
 */
route.get("/", (req, res) => res.send("profile route"));


module.exports = route;
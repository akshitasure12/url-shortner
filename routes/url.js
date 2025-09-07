const express = require("express");
const { createShortUrl, numberOfClicks, redirectFunc } = require("../controllers/url");

const router = express.Router();

router.post("/", createShortUrl);

router.get("/analytics/:shortId", numberOfClicks);

router.get("/:shortId", redirectFunc);

module.exports = router;

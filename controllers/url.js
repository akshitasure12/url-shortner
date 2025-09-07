const { nanoid } = require("nanoid")
const Url = require("../models/url")

async function createShortUrl (req, res) {
    const allUrls = await Url.find({});
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({error : 'url is required'});
    }

    const shortId = nanoid(8);
    const row = await Url.create(
        {
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user._id
        }
    )
    console.log(row);
    return res.render("home", { id: shortId });
}

async function numberOfClicks(req, res) {
    const shortId = req.params.shortId;
    const urlDoc = await Url.findOne({shortId});

    return res.json({ clicks: urlDoc.visitHistory.length, analytics: urlDoc.visitHistory});
}

async function redirectFunc (req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({shortId}, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });
    return res.redirect(entry.redirectUrl);
};

module.exports = {createShortUrl, numberOfClicks, redirectFunc}
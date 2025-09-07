const User = require("../models/user");
const {setUser} = require("../services/auth");

async function userSignup (req, res) {
    const {name, email, password} = req.body;

    await User.create({
        name: name,
        email: email, 
        password: password,
    });

    return res.render("home");
}

async function userLogin (req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({email, password});
    if (!user) {
        return res.render("login", {error: "Invalid username or Password" });
    }

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {userSignup, userLogin};
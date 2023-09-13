const express = require("express");
const path = require("path");
require('./db/conn');
const User = require("./models/usermessage");


const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// Setting the paths
const staticpath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

// Middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatespath); // Fixed the 'app.set' line
hbs.registerPartials(partialspath); // Fixed the 'hbs.registerPartial' line

// Routing
app.get("/", (req, res) => {
    res.render("index");
});


app.post("/contact", async (req, res) => {
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).send(error);
    }
});


// Server creation
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});

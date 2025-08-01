const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const methodOverride = require('method-override');

let posts = require('./data.js');

app.use(methodOverride('_method')); // Allows us to use PUT and DELETE methods in forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Points to "views" folder
app.use(express.static(path.join(__dirname, "public"))); // Serves static files

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Server is working well");
});

app.get("/posts", (req, res) => {
    res.render("index", { posts }); // Renders "views/index.ejs"
});

app.get("/posts/new", (req, res) => {
    res.render("new"); // Renders "views/new.ejs"
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content})
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find(p => id === p.id);

     if (!post) {
        // Either send a 404 page or redirect
        return res.status(404).render('not-found'); // Create a not-found.ejs
        // OR:
        // return res.redirect('/posts'); // Redirect to posts list
    }

    res.render("show", {post});
});

app.patch("/posts/:id", (req, res) =>{
    let {id} =req.params;
    let newContent = req.body.content;
    let post = posts.find(p => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find(p => id === p.id);
    if (!post) {
        return res.status(404).render('not-found');
    }
    res.render("edit", {post}); // Renders "views/edit.ejs"
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter(p => id !== p.id);
    res.redirect("/posts");
})
//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const date =require(__dirname + "/date.js");



const app = express();

const items = [];
const workitems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

const day = date.getDay();

  res.render("list", {
    ListTitle: day,
    newItems: items
  });
});

app.post("/", function(req, res) {

const item = req.body.newItem;

if(req.body.list === "work"){
  workitems.push(item);
  res.redirect("/work");
}else{
  items.push(item);
  res.redirect("/");
}
});

app.get("/work", function(req, res) {
  res.render("list", {
    ListTitle: "work List",
    newItems: workitems
  });
});
 app.get("/about", function(req, res){
   res.render("about");
 });



app.listen(3000, function() {
  console.log("server started on port 3000")
});

const express = require("express"),
         path = require('path'),
           bp = require("body-parser"),
     mongoose = require("mongoose"),
          app = express(),
         port = 8000;

app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/ducks');

var DuckSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    favpond: String
   })
mongoose.model('Duck', DuckSchema);
var Duck = mongoose.model('Duck')

app.get("/", function(req, res){
    Duck.find({}, function(err, ducks){
        res.render("index.ejs", {ducks: ducks})
    })
});
app.get("/edit/:_id", function(req, res){
  var duck = req.params;
  res.render("edit.ejs", {duck: duck});
  console.log(duck);
  })

app.post("/edit/:_id", function(req, res){
  Duck.findByIdAndUpdate(req.params._id, req.body, (err, duck) => {
          if (err) {
              return res
                  .status(500)
                  .send({error: "unsuccessful"})
          };
          res.send({success: "success"});
      });


    // var duck_id = req.params;
    // console.log(req.body);
    // Duck.update({_id: duck_id},(error, duck) {name: req.body.name, gender: req.body.gender, age: req.body.age, favpond: req.body.favpond},
    //
    //   function(err){
    //
    // })
     res.redirect("/edit/:_id");
    });

app.post("/duck", function(req, res){
    let duck = new Duck(req.body);
    duck.save(function(err){
        console.log(err);
        res.redirect("/");
    });
});

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});

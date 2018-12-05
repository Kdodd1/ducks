console.log("inisde of routes.js");

const mongoose = require('mongoose'),
          Duck = mongoose.model('Duck')
          Ducks = require("../controllers/ducks")

module.exports = function(app){
  app.get("/", Ducks.getAll);
  app.get("/edit/:_id", Ducks.getOne);
  app.post("/edits/:_id", Ducks.update);
  app.post("/duck", Ducks.create);
  app.get("/delete/:_id", Ducks.delete);
}

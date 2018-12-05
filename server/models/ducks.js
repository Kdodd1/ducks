console.log("inisde of ducks.js");

const mongoose = require("mongoose");

var DuckSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    favpond: String
   })
mongoose.model('Duck', DuckSchema);

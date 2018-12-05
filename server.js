const express = require("express"),
         path = require('path'),
           bp = require("body-parser"),
     mongoose = require("mongoose"),
          app = express(),
         port = 8000,
         db_name = "ducks";

app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.Promise = global.Promise;

require("./server/config/mongoose")(db_name);
require("./server/config/routes.js")(app);

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});

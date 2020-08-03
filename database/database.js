const mongoose = require("mongoose");

mongoose.connect(process.env.MongoURL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log("DB Connected!")
})
.catch(err => {
    console.log("DB Not Connected!" + JSON.stringify(err, undefined, 2));
});
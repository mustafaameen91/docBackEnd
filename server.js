const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/routes/user.routes.js")(app);
require("./app/routes/master.routes.js")(app);
require("./app/routes/masterType.routes.js")(app);
require("./app/routes/lessons.routes.js")(app);
require("./app/routes/finalDegree.routes.js")(app);
require("./app/routes/roles.routes.js")(app);
require("./app/routes/masterClass.routes.js")(app);
require("./app/routes/registerDocument.routes.js")(app);
require("./app/routes/appVersion.routes.js")(app);
require("./app/routes/summerTraining.routes.js")(app);
require("./app/routes/courseSplit.routes.js")(app);
require("./app/routes/graduationDocument.routes.js")(app);
require("./app/routes/studentAverage.routes.js")(app);

exports.directory = __dirname;

app.listen(5555, () => {
   console.log("Server is running on port 6000.");
});

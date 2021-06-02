module.exports = (app) => {
   const appVersion = require("../controllers/appVersion.controllers.js");

   app.post("/api/addAppVersion", appVersion.create);

   app.get("/api/appVersions", appVersion.findAll);

   app.get("/api/appVersion/:appVersionId", appVersion.findOne);

   app.get("/api/appName/:appName", appVersion.findOneByAppName);

   app.put("/api/appVersion/:id", appVersion.update);

   app.delete("/api/appVersion/:id", appVersion.delete);

   app.delete("/api/appVersions", appVersion.deleteAll);
};

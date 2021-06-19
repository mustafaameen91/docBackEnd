module.exports = (app) => {
   const courseSplit = require("../controllers/courseSplit.controllers.js");

   app.post("/api/addCourseSplit", courseSplit.create);

   app.post("/api/addMultiCourseSplit", courseSplit.createCourseLessons);

   app.get("/api/courseSplits", courseSplit.findAll);

   app.get("/api/courseMaster/:masterId", courseSplit.findByMasterId);

   app.get("/api/courseSplit/:courseSplitId", courseSplit.findOne);

   app.put("/api/courseSplit/:id", courseSplit.update);

   app.delete("/api/courseSplit/:id", courseSplit.delete);

   app.delete("/api/courseSplits", courseSplit.deleteAll);
};

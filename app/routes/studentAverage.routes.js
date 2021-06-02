module.exports = (app) => {
   const studentAverage = require("../controllers/studentAverage.controllers.js");

   app.post("/api/addStudentAverage", studentAverage.create);

   app.post("/api/addMultiAverages", studentAverage.createAverages);

   app.get("/api/studentAverages", studentAverage.findAll);

   app.get("/api/studentAverage/:studentAverageId", studentAverage.findOne);

   app.get(
      "/api/averageBySection/:sectionId",
      studentAverage.findOneBySectionId
   );

   app.put("/api/studentAverage/:id", studentAverage.update);

   app.delete("/api/studentAverage/:id", studentAverage.delete);

   app.delete("/api/studentAverages", studentAverage.deleteAll);
};

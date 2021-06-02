module.exports = (app) => {
   const summerTraining = require("../controllers/summerTraining.controllers.js");

   app.post("/api/addSummerTraining", summerTraining.create);

   app.post("/api/addMultiSummer", summerTraining.createMultiSummer);

   app.get("/api/summerTrainings", summerTraining.findAll);

   app.get(
      "/api/summerTrainings/:sectionId",
      summerTraining.findAllBySectionId
   );

   app.get(
      "/api/summerTrainingStudy",
      summerTraining.findAllBySectionIdAndStudy
   );

   app.put("/api/summerTraining/:id", summerTraining.update);

   app.delete("/api/summerTraining/:id", summerTraining.delete);

   app.delete("/api/summerTrainings", summerTraining.deleteAll);
};

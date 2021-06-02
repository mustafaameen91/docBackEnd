module.exports = (app) => {
   const finalDegree = require("../controllers/finalDegree.controllers.js");

   app.post("/api/addFinalDegree", finalDegree.create);

   app.post("/api/addMultiDegrees", finalDegree.createDegrees);

   app.get("/api/finalDegrees", finalDegree.findAll);

   app.get("/api/sectionDegree", finalDegree.getAverageForStudents);

   app.get("/api/studentLevelDegree", finalDegree.getAverageForStudent);

   app.put("/api/finalDegree/:id", finalDegree.update);

   app.delete("/api/finalDegree/:id", finalDegree.delete);

   app.delete("/api/finalDegrees", finalDegree.deleteAll);
};

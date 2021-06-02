module.exports = (app) => {
   const lessons = require("../controllers/lessons.controllers.js");

   app.post("/api/addLessons", lessons.create);

   app.post("/api/addMultiLessons", lessons.createLessons);

   app.get("/api/lessons", lessons.findAll);

   app.get("/api/totalLessonsUnits", lessons.findAllByLevel);

   app.get("/api/lessons/:masterId", lessons.findAllByMasterId);

   app.put("/api/lesson/:id", lessons.update);

   app.delete("/api/lesson/:id", lessons.delete);

   app.delete("/api/lessons", lessons.deleteAll);
};

module.exports = (app) => {
   const marks = require("../controllers/marks.controllers.js");

   app.get("/api/marks", marks.findAll);

   app.get("/api/sectionMarks", marks.getAverageForStudents);

   app.get("/api/studentLevelMark", marks.getAverageForStudent);

   app.get("/api/studentsLevelMarks", marks.getAverageForStudentsLevels);
};

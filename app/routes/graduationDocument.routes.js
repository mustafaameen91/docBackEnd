module.exports = (app) => {
   const graduationDocument = require("../controllers/graduationDocument.controllers.js");

   app.post("/api/addGraduationDocument", graduationDocument.create);

   app.get("/api/graduationDocuments", graduationDocument.findAll);

   app.get(
      "/api/graduationDocument/:graduationDocumentId",
      graduationDocument.findOne
   );

   app.get(
      "/api/graduationSection/:sectionId",
      graduationDocument.findBySectionId
   );

   app.put("/api/graduationDocument/:id", graduationDocument.update);

   app.delete("/api/graduationDocument/:id", graduationDocument.delete);

   app.delete("/api/graduationDocuments", graduationDocument.deleteAll);
};

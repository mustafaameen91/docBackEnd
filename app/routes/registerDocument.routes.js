module.exports = (app) => {
   const registerDocument = require("../controllers/registerDocument.controllers.js");

   app.post("/api/addRegisterDocument", registerDocument.create);

   app.get("/api/registerDocuments", registerDocument.findAll);

   app.get(
      "/api/registerDocument/:sectionId",
      registerDocument.findBySectionId
   );

   app.put("/api/registerDocument/:id", registerDocument.update);

   app.delete("/api/registerDocument/:id", registerDocument.delete);

   app.delete("/api/registerDocuments", registerDocument.deleteAll);
};

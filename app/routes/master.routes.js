module.exports = (app) => {
   const master = require("../controllers/master.controllers.js");

   app.post("/api/addMaster", master.create);

   app.get("/api/masters/:sectionId", master.findAll);

   app.get("/api/masterInfo", master.findStudentInfo);

   app.get("/api/studentMaster/:masterId", master.findAllByMasterId);

   app.get(
      "/api/masterInformation/:masterId",
      master.findMasterClassByMasterId
   );

   app.put("/api/master/:id", master.update);

   app.delete("/api/master/:id", master.delete);

   app.delete("/api/masterAll/:id", master.deleteByMasterId);

   app.delete("/api/masters", master.deleteAll);
};

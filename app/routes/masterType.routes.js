module.exports = (app) => {
   const masterType = require("../controllers/masterType.controllers.js");

   app.post("/api/addMasterType", masterType.create);

   app.get("/api/masterTypes", masterType.findAll);

   app.put("/api/masterType/:id", masterType.update);

   app.delete("/api/masterType/:id", masterType.delete);

   app.delete("/api/masterTypes", masterType.deleteAll);
};

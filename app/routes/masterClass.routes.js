module.exports = (app) => {
   const masterClass = require("../controllers/masterClass.controllers.js");

   app.post("/api/addMasterClass", masterClass.create);

   app.get("/api/masterClasses", masterClass.findAll);

   app.get("/api/className", masterClass.findOneByClassName);

   app.put("/api/masterClass/:id", masterClass.update);

   app.delete("/api/masterClass/:id", masterClass.delete);

   app.delete("/api/masterClasses", masterClass.deleteAll);
};

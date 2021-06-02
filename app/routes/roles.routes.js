module.exports = (app) => {
   const roles = require("../controllers/roles.controllers.js");

   app.post("/api/addRole", roles.create);

   app.get("/api/roles", roles.findAll);

   app.put("/api/role/:id", roles.update);

   app.delete("/api/role/:id", roles.delete);

   app.delete("/api/roles", roles.deleteAll);
};

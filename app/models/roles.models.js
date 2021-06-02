const sql = require("./db.js");

const Roles = function (roles) {
   this.roleName = roles.roleName;
};

Roles.create = (newRole, result) => {
   sql.query("INSERT INTO roles SET ?", newRole, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new Role: ", { id: res.insertId, ...newRole });
      result(null, { id: res.insertId, ...newRole });
   });
};

Roles.findById = (roleId, result) => {
   sql.query(`SELECT * FROM roles WHERE idRole = ${roleId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found role: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Roles.getAll = (result) => {
   sql.query("SELECT * FROM roles", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("roles: ", res);
      result(null, res);
   });
};

Roles.updateById = (id, role, result) => {
   sql.query("UPDATE roles SET ?  WHERE idRole = ?", [role, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated role: ", { id: id, ...role });
      result(null, { id: id, ...role });
   });
};

Roles.remove = (id, result) => {
   sql.query("DELETE FROM roles WHERE idRole = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted role with id: ", id);
      result(null, res);
   });
};

Roles.removeAll = (result) => {
   sql.query("DELETE FROM roles", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} roles`);
      result(null, res);
   });
};

module.exports = Roles;

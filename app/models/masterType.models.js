const sql = require("./db.js");

const MasterType = function (masterType) {
   this.typeName = masterType.typeName;
};

MasterType.create = (newMasterType, result) => {
   sql.query("INSERT INTO masterType SET ?", newMasterType, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new MasterType: ", {
         id: res.insertId,
         ...newMasterType,
      });
      result(null, { id: res.insertId, ...newMasterType });
   });
};

MasterType.findById = (typeId, result) => {
   sql.query(
      `SELECT * FROM masterType WHERE idType = ${typeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found MasterType: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MasterType.getAll = (result) => {
   sql.query("SELECT * FROM masterType", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("MasterType: ", res);
      result(null, res);
   });
};

MasterType.updateById = (id, masterType, result) => {
   sql.query(
      "UPDATE masterType SET ?  WHERE idType = ?",
      [masterType, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated MasterType: ", { id: id, ...masterType });
         result(null, { id: id, ...masterType });
      }
   );
};

MasterType.remove = (id, result) => {
   sql.query("DELETE FROM masterType WHERE idType = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted MasterType with id: ", id);
      result(null, res);
   });
};

MasterType.removeAll = (result) => {
   sql.query("DELETE FROM masterType", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} MasterType`);
      result(null, res);
   });
};

module.exports = MasterType;

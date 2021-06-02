const sql = require("./db.js");

const MasterClass = function (masterClass) {
   this.masterId = masterClass.masterId;
   this.className = masterClass.className;
};

MasterClass.create = (masterClass, result) => {
   sql.query("INSERT INTO masterClass SET ?", masterClass, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new masterClass: ", {
         id: res.insertId,
         ...masterClass,
      });
      result(null, { id: res.insertId, ...masterClass });
   });
};

MasterClass.findById = (masterClassId, result) => {
   sql.query(
      `SELECT * FROM masterClass WHERE idMasterClass = ${masterClassId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found masterClass: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MasterClass.findByClassName = (className, masterId, result) => {
   sql.query(
      `SELECT * FROM masterClass WHERE className = '${className}' AND masterId = ${masterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found masterClass: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MasterClass.getAll = (result) => {
   sql.query("SELECT * FROM masterClass", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("masterClass: ", res);
      result(null, res);
   });
};

MasterClass.updateById = (id, masterClass, result) => {
   sql.query(
      "UPDATE masterClass SET ?  WHERE idMasterClass = ?",
      [masterClass, id],
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

         console.log("updated masterClass: ", { id: id, ...masterClass });
         result(null, { id: id, ...masterClass });
      }
   );
};

MasterClass.remove = (id, result) => {
   sql.query(
      "DELETE FROM masterClass WHERE idMasterClass = ?",
      id,
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

         console.log("deleted masterClass with id: ", id);
         result(null, res);
      }
   );
};

MasterClass.removeAll = (result) => {
   sql.query("DELETE FROM masterClass", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} masterClass`);
      result(null, res);
   });
};

module.exports = MasterClass;

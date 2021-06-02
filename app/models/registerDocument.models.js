const sql = require("./db.js");

const RegisterDocument = function (registerDocument) {
   this.studentName = registerDocument.studentName;
   this.phase = registerDocument.phase;
   this.studyType = registerDocument.studyType;
   this.average = registerDocument.average;
   this.averageWrite = registerDocument.averageWrite;
   this.sectionId = registerDocument.sectionId;
   this.gender = registerDocument.gender;
};

RegisterDocument.create = (newRegisterDocument, result) => {
   sql.query(
      "INSERT INTO registerdocument SET ?",
      newRegisterDocument,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new RegisterDocument: ", {
            id: res.insertId,
            ...newRegisterDocument,
         });
         result(null, { id: res.insertId, ...newRegisterDocument });
      }
   );
};

RegisterDocument.findById = (registerDocumentId, result) => {
   sql.query(
      `SELECT * FROM registerdocument WHERE idRegisterDocument = ${registerDocumentId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found RegisterDocument: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

RegisterDocument.getAll = (result) => {
   sql.query("SELECT * FROM registerdocument", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("RegisterDocument: ", res);
      result(null, res);
   });
};

RegisterDocument.getBySectionId = (sectionId, result) => {
   sql.query(
      `SELECT * FROM registerdocument WHERE sectionId = ${sectionId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found RegisterDocument: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

RegisterDocument.updateById = (id, registerDocument, result) => {
   sql.query(
      "UPDATE registerdocument SET ?  WHERE idRegisterDocument = ?",
      [registerDocument, id],
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

         console.log("updated RegisterDocument: ", {
            id: id,
            ...registerDocument,
         });
         result(null, { id: id, ...registerDocument });
      }
   );
};

RegisterDocument.remove = (id, result) => {
   sql.query(
      "DELETE FROM registerdocument WHERE idRegisterDocument = ?",
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

         console.log("deleted RegisterDocument with id: ", id);
         result(null, res);
      }
   );
};

RegisterDocument.removeAll = (result) => {
   sql.query("DELETE FROM registerdocument", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} RegisterDocument`);
      result(null, res);
   });
};

module.exports = RegisterDocument;

const sql = require("./db.js");

const GraduationDocument = function (graduationDocument) {
   this.studentName = graduationDocument.studentName;
   this.studentNameEn = graduationDocument.studentNameEn;
   this.collegeId = graduationDocument.collegeId;
   this.studentId = graduationDocument.studentId;
   this.sectionId = graduationDocument.sectionId;
   this.sectionName = graduationDocument.sectionName;
   this.dob = graduationDocument.dob;
   this.averageWriting = graduationDocument.averageWriting;
   this.enterYear = graduationDocument.enterYear;
   this.average = graduationDocument.average;
   this.sequence = graduationDocument.sequence;
   this.totalStudents = graduationDocument.totalStudents;
   this.firstAverage = graduationDocument.firstAverage;
   this.phase = graduationDocument.phase;
   this.failYears = graduationDocument.failYears;
   this.postponementYear = graduationDocument.postponementYear;
};

GraduationDocument.create = (newGraduationDocument, result) => {
   sql.query(
      "INSERT INTO graduationdocument SET ?",
      newGraduationDocument,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new graduationDocument: ", {
            id: res.insertId,
            ...newGraduationDocument,
         });
         result(null, { id: res.insertId, ...newGraduationDocument });
      }
   );
};

GraduationDocument.getBySectionId = (sectionId, result) => {
   sql.query(
      `SELECT * FROM graduationdocument WHERE sectionId = ${sectionId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found graduationDocument: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

GraduationDocument.findById = (graduationDocumentId, result) => {
   sql.query(
      `SELECT * FROM graduationdocument WHERE idGraduationDocument = ${graduationDocumentId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found graduationDocument: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

GraduationDocument.getAll = (result) => {
   sql.query("SELECT * FROM graduationdocument", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("graduationDocument: ", res);
      result(null, res);
   });
};

GraduationDocument.updateById = (id, graduationDocument, result) => {
   sql.query(
      "UPDATE graduationdocument SET ?  WHERE idGraduationDocument = ?",
      [graduationDocument, id],
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

         console.log("updated graduationDocument: ", {
            id: id,
            ...graduationDocument,
         });
         result(null, { id: id, ...graduationDocument });
      }
   );
};

GraduationDocument.remove = (id, result) => {
   sql.query(
      "DELETE FROM graduationdocument WHERE idGraduationDocument = ?",
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

         console.log("deleted graduationDocument with id: ", id);
         result(null, res);
      }
   );
};

GraduationDocument.removeAll = (result) => {
   sql.query("DELETE FROM graduationdocument", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} graduationDocument`);
      result(null, res);
   });
};

module.exports = GraduationDocument;

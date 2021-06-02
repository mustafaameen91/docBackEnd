const sql = require("./db.js");

const StudentAverage = function (studentAverage) {
   this.collegeNumber = studentAverage.collegeNumber;
   this.average = studentAverage.average;
   this.sectionId = studentAverage.sectionId;
   this.studyType = studentAverage.studyType;
};

StudentAverage.create = (newStudentAverage, result) => {
   sql.query(
      "INSERT INTO studentAverage SET ?",
      newStudentAverage,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new studentAverage: ", {
            id: res.insertId,
            ...newStudentAverage,
         });
         result(null, { id: res.insertId, ...newStudentAverage });
      }
   );
};

StudentAverage.createMultiAverage = (averages, result) => {
   sql.query(
      "INSERT INTO studentAverage (collageNumber , average , sectionId , studyType) VALUES ? ",
      [
         averages.map((degree) => [
            averages.collageNumber,
            averages.average,
            averages.sectionId,
            averages.studyType,
         ]),
      ],

      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new averages: ", {
            id: res.insertId,
         });
         result(null, { id: res.insertId });
      }
   );
};

StudentAverage.findBySectionId = (sectionId, result) => {
   sql.query(
      `SELECT * FROM studentAverage WHERE sectionId = ${sectionId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found studentAverage: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

StudentAverage.findById = (studentAverageId, result) => {
   sql.query(
      `SELECT * FROM studentAverage WHERE idStudentAverage = ${studentAverageId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found studentAverage: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

StudentAverage.getAll = (result) => {
   sql.query("SELECT * FROM studentAverage", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("studentAverage: ", res);
      result(null, res);
   });
};

StudentAverage.updateById = (id, studentAverage, result) => {
   sql.query(
      "UPDATE studentAverage SET ?  WHERE idStudentAverage = ?",
      [studentAverage, id],
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

         console.log("updated studentAverage: ", { id: id, ...studentAverage });
         result(null, { id: id, ...studentAverage });
      }
   );
};

StudentAverage.remove = (id, result) => {
   sql.query(
      "DELETE FROM studentAverage WHERE idStudentAverage = ?",
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

         console.log("deleted studentAverage with id: ", id);
         result(null, res);
      }
   );
};

StudentAverage.removeAll = (result) => {
   sql.query("DELETE FROM studentAverage", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} studentAverage`);
      result(null, res);
   });
};

module.exports = StudentAverage;

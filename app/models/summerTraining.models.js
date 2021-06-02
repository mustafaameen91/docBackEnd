const sql = require("./db.js");

const SummerTraining = function (summerTraining) {
   this.studentName = summerTraining.studentName;
   this.collageNumber = summerTraining.collageNumber;
   this.studyType = summerTraining.studyType;
   this.sectionId = summerTraining.sectionId;
};

SummerTraining.create = (newSummerTraining, result) => {
   sql.query(
      "INSERT INTO summertraining SET ?",
      newSummerTraining,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new summerTraining: ", {
            id: res.insertId,
            ...newSummerTraining,
         });
         result(null, { id: res.insertId, ...newSummerTraining });
      }
   );
};

SummerTraining.createMultiTraining = (summer, result) => {
   sql.query(
      "INSERT INTO summertraining (studentName , collageNumber , studyType , sectionId) VALUES ? ",
      [
         summer.map((summer) => [
            summer.name,
            summer.college_number,
            summer.type,
            summer.sectionid,
         ]),
      ],

      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new summerTraining: ", {
            id: res.insertId,
         });
         result(null, { id: res.insertId });
      }
   );
};

SummerTraining.findById = (summerTrainingId, result) => {
   sql.query(
      `SELECT * FROM summertraining WHERE idSummerTraining = ${summerTrainingId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found summerTraining: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

SummerTraining.getAll = (result) => {
   sql.query("SELECT * FROM summertraining", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("summerTraining: ", res);
      result(null, res);
   });
};

SummerTraining.getAllBySectionId = (sectionId, result) => {
   console.log(sectionId);
   sql.query(
      `SELECT * FROM summertraining WHERE sectionId = '${sectionId}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("summerTraining: ", res);
         result(null, res);
      }
   );
};

SummerTraining.getAllBySectionIdAndStudy = (sectionId, studyType, result) => {
   console.log(sectionId);
   sql.query(
      `SELECT * FROM summertraining WHERE sectionId = '${sectionId}' AND studyType = '${studyType}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("summerTraining: ", res);
         result(null, res);
      }
   );
};

SummerTraining.updateById = (id, summerTraining, result) => {
   sql.query(
      "UPDATE summertraining SET ?  WHERE idSummerTraining = ?",
      [summerTraining, id],
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

         console.log("updated summerTraining: ", { id: id, ...summerTraining });
         result(null, { id: id, ...summerTraining });
      }
   );
};

SummerTraining.remove = (id, result) => {
   sql.query(
      "DELETE FROM summertraining WHERE idSummerTraining = ?",
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

         console.log("deleted summerTraining with id: ", id);
         result(null, res);
      }
   );
};

SummerTraining.removeAll = (result) => {
   sql.query("DELETE FROM summertraining", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} summerTraining`);
      result(null, res);
   });
};

module.exports = SummerTraining;

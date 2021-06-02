const sql = require("./db.js");

const FinalDegree = function (finalDegree) {
   this.collageNumber = finalDegree.collageNumber;
   this.mark = finalDegree.mark;
   this.numberWriting = finalDegree.numberWriting;
   this.lessonId = finalDegree.lessonId;
   this.phase = finalDegree.phase;
   this.rule = finalDegree.rule;
   this.studentName = finalDegree.studentName;
};

FinalDegree.create = (newFinalDegree, result) => {
   sql.query("INSERT INTO finaldegree SET ?", newFinalDegree, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new FinalDegree: ", {
         id: res.insertId,
         ...newFinalDegree,
      });
      result(null, { id: res.insertId, ...newFinalDegree });
   });
};

FinalDegree.createMultiDegree = (degrees, result) => {
   sql.query(
      "INSERT INTO finaldegree (collageNumber , mark , numberWriting , lessonId , phase , rule , studentName) VALUES ? ",
      [
         degrees.map((degree) => [
            degree.collageNumber,
            degree.mark,
            degree.numberWriting,
            degree.lessonId,
            degree.phase,
            degree.rule,
            degree.studentName,
         ]),
      ],

      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new FinalDegree: ", {
            id: res.insertId,
         });
         result(null, { id: res.insertId });
      }
   );
};

FinalDegree.findById = (degreeId, result) => {
   sql.query(
      `SELECT * FROM finaldegree WHERE idDegree = ${degreeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found finalDegree: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

FinalDegree.findAverageForStudents = (sectionId, level, result) => {
   sql.query(
      `SELECT * FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND master.idMaster = lesson.masterId WHERE sectionId = ${sectionId} AND master.level = ${level}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found finalDegree: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};
//SELECT * , IF(master.masterTypeId = 1 , (SELECT course FROM coursesplit WHERE lesson.idLesson = coursesplit.lessonId AND master.idMaster = coursesplit.masterId) , 0 ) AS course FROM finalDegree JOIN lesson JOIN master ON finalDegree.lessonId = lesson.idLesson AND master.idMaster = lesson.masterId WHERE sectionId = ${sectionId} AND master.level = ${level} AND collageNumber LIKE '%${collageNumber}' GROUP BY finalDegree.enName

FinalDegree.findAverageForStudent = (
   sectionId,
   level,
   collageNumber,
   result
) => {
   sql.query(
      `SELECT * , IF(master.masterTypeId = 1 , (SELECT course FROM coursesplit WHERE lesson.idLesson = coursesplit.lessonId AND master.idMaster = coursesplit.masterId) , 0 ) AS course FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND master.idMaster = lesson.masterId WHERE sectionId = ${sectionId} AND master.level = ${level} AND collageNumber LIKE '%${collageNumber}' GROUP BY lessonId.enName`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found finalDegree: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

FinalDegree.getAll = (result) => {
   sql.query("SELECT * FROM finaldegree", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("finalDegrees: ", res);
      result(null, res);
   });
};

FinalDegree.updateById = (id, finalDegree, result) => {
   sql.query(
      "UPDATE finaldegree SET ?  WHERE idDegree = ?",
      [finalDegree, id],
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

         console.log("updated finalDegree: ", { id: id, ...finalDegree });
         result(null, { id: id, ...finalDegree });
      }
   );
};

FinalDegree.remove = (id, result) => {
   sql.query("DELETE FROM finaldegree WHERE idDegree = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted finalDegree with id: ", id);
      result(null, res);
   });
};

FinalDegree.removeAll = (result) => {
   sql.query("DELETE FROM finaldegree", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} finalDegrees`);
      result(null, res);
   });
};

module.exports = FinalDegree;

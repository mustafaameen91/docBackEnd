const sql = require("./db.js");
const oldSql = require("./dbOld.js");

const Marks = function (finalDegree) {
   this.collageNumber = finalDegree.collageNumber;
   this.mark = finalDegree.mark;
   this.numberWriting = finalDegree.numberWriting;
   this.lessonId = finalDegree.lessonId;
   this.phase = finalDegree.phase;
   this.rule = finalDegree.rule;
   this.studentName = finalDegree.studentName;
};

Marks.findById = (degreeId, result) => {
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

Marks.findAverageForStudents = (sectionId, level, result) => {
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

Marks.studentsLevelsData = (collageNumberStudents, result) => {
   function requestLevelOneMarks() {
      return new Promise(function (resolve, reject) {
         sql.query(
            `SELECT * FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND lesson.masterId = master.idMaster WHERE finaldegree.collageNumber IN (${collageNumberStudents.map(
               (data) => data
            )}) AND master.level = 1`,
            (err, rows) => {
               if (err) {
                  return reject(err);
               }
               resolve(rows);
            }
         );
      });
   }

   function requestLevelTwoMarks() {
      return new Promise(function (resolve, reject) {
         sql.query(
            `SELECT * FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND lesson.masterId = master.idMaster WHERE finaldegree.collageNumber IN (${collageNumberStudents.map(
               (data) => data
            )}) AND master.level = 2`,
            (err, rows) => {
               if (err) {
                  return reject(err);
               }
               resolve(rows);
            }
         );
      });
   }

   function requestLevelThreeMarks() {
      return new Promise(function (resolve, reject) {
         sql.query(
            `SELECT * FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND lesson.masterId = master.idMaster WHERE finaldegree.collageNumber IN (${collageNumberStudents.map(
               (data) => data
            )}) AND master.level = 3`,
            (err, rows) => {
               if (err) {
                  return reject(err);
               }
               resolve(rows);
            }
         );
      });
   }

   function requestLevelFourMarks() {
      return new Promise(function (resolve, reject) {
         sql.query(
            `SELECT * FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND lesson.masterId = master.idMaster WHERE finaldegree.collageNumber IN (${collageNumberStudents.map(
               (data) => data
            )}) AND master.level = 4`,
            (err, rows) => {
               if (err) {
                  return reject(err);
               }
               resolve(rows);
            }
         );
      });
   }

   function requestLevelFifthMarks() {
      return new Promise(function (resolve, reject) {
         sql.query(
            `SELECT * FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND lesson.masterId = master.idMaster WHERE finaldegree.collageNumber IN (${collageNumberStudents.map(
               (data) => data
            )}) AND master.level = 5`,
            (err, rows) => {
               if (err) {
                  return reject(err);
               }
               resolve(rows);
            }
         );
      });
   }

   Promise.allSettled([
      requestLevelOneMarks(),
      requestLevelTwoMarks(),
      requestLevelThreeMarks(),
      requestLevelFourMarks(),
      requestLevelFifthMarks(),
   ]).then((responses) => {
      let studentsData = {
         levelOne: responses[0],
         levelTwo: responses[1],
         levelThree: responses[2],
         levelFour: responses[3],
         levelFifth: responses[4],
      };
      result(null, studentsData);
   });
};

Marks.findAverageForStudentsLevels = (sectionId, searchTerm, result) => {
   console.log(searchTerm);
   oldSql.query(
      `SELECT * FROM student WHERE sectionid = ${sectionId} AND ${searchTerm} LIMIT 10`,
      (err, rows) => {
         if (err) {
            console.log(err);
            return;
         }
         let collageNumberStudents = rows.map(
            (student) => student.college_number
         );
         result(null, collageNumberStudents);
      }
   );
   // sql.query(
   //    `SELECT * FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND master.idMaster = lesson.masterId WHERE sectionId = ${sectionId} AND master.level = ${level}`,
   //    (err, res) => {
   //       if (err) {
   //          console.log("error: ", err);
   //          result(err, null);
   //          return;
   //       }

   //       if (res.length) {
   //          console.log("found finalDegree: ", res);
   //          result(null, res);
   //          return;
   //       }

   //       result({ kind: "not_found" }, null);
   //    }
   // );
};
//SELECT * , IF(master.masterTypeId = 1 , (SELECT course FROM coursesplit WHERE lesson.idLesson = coursesplit.lessonId AND master.idMaster = coursesplit.masterId) , 0 ) AS course FROM finalDegree JOIN lesson JOIN master ON finalDegree.lessonId = lesson.idLesson AND master.idMaster = lesson.masterId WHERE sectionId = ${sectionId} AND master.level = ${level} AND collageNumber LIKE '%${collageNumber}' GROUP BY finalDegree.enName

Marks.findAverageForStudent = (sectionId, level, collageNumber, result) => {
   sql.query(
      `SELECT * , IF(master.masterTypeId = 1 , (SELECT course FROM coursesplit WHERE lesson.idLesson = coursesplit.lessonId AND master.idMaster = coursesplit.masterId LIMIT 1) , 0 ) AS course FROM finaldegree JOIN lesson JOIN master ON finaldegree.lessonId = lesson.idLesson AND master.idMaster = lesson.masterId WHERE sectionId = ${sectionId} AND master.level = ${level} AND collageNumber LIKE '%${collageNumber}' GROUP BY lesson.enName`,
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

Marks.getAll = (result) => {
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

module.exports = Marks;

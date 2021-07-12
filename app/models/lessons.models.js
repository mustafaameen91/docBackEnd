const sql = require("./db.js");

const Lessons = function (lesson) {
   this.lessonName = lesson.lessonName;
   this.enName = lesson.enName;
   this.units = lesson.units;
   this.masterId = lesson.masterId;
};

Lessons.create = (newLesson, result) => {
   sql.query("INSERT INTO lesson SET ?", newLesson, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new lesson: ", {
         id: res.insertId,
         ...newLesson,
      });
      result(null, { id: res.insertId, ...newLesson });
   });
};

Lessons.createMultiLessons = (lessons, masterId, result) => {
   sql.query(
      "INSERT INTO lesson (lessonName , enName , units , masterId) VALUES ?",
      [
         lessons.map((lesson) => [
            lesson.arName,
            lesson.enName,
            lesson.units,
            masterId,
         ]),
      ],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new lessons: ", lessons);
         result(null, lessons);
      }
   );
};

Lessons.findById = (lessonId, result) => {
   sql.query(
      `SELECT * FROM lesson WHERE idLesson = ${lessonId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found lesson: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Lessons.getAll = (result) => {
   sql.query("SELECT * FROM lesson", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("lessons: ", res);
      result(null, res);
   });
};

Lessons.getAllByMasterId = (masterId, result) => {
   sql.query(
      `SELECT * FROM lesson WHERE masterId = ${masterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("lessons: ", res);
         result(null, res);
      }
   );
};
//old query must check i dont know why dosnt work
//SELECT  SUM(units)  total FROM lesson JOIN master ON master.idMaster = lesson.masterId WHERE master.level = ${level} AND sectionId = ${sectionId}SELECT  SUM(units)  total FROM lesson JOIN master ON master.idMaster = lesson.masterId WHERE master.level = ${level} AND sectionId = ${sectionId}
Lessons.getAllByLevel = (level, sectionId, result) => {
   sql.query(
      `SELECT  SUM(units)  total FROM lesson JOIN master ON master.idMaster = lesson.masterId WHERE master.level = ${level} AND sectionId = ${sectionId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("lessons: ", res);
         result(null, res);
      }
   );
};

Lessons.updateById = (id, lesson, result) => {
   sql.query(
      "UPDATE lesson SET ?  WHERE idLesson = ?",
      [lesson, id],
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

         console.log("updated lesson: ", { id: id, ...lesson });
         result(null, { id: id, ...lesson });
      }
   );
};

Lessons.remove = (id, result) => {
   sql.query("DELETE FROM lesson WHERE idLesson = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted lesson with id: ", id);
      result(null, res);
   });
};

Lessons.removeAll = (result) => {
   sql.query("DELETE FROM lesson", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} lessons`);
      result(null, res);
   });
};

module.exports = Lessons;

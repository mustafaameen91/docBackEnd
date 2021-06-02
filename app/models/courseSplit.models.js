const sql = require("./db.js");

const CourseSplit = function (courseSplit) {
   this.masterId = courseSplit.masterId;
   this.lessonId = courseSplit.lessonId;
   this.course = courseSplit.course;
};

CourseSplit.create = (newCourseSplit, result) => {
   sql.query("INSERT INTO coursesplit SET ?", newCourseSplit, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new courseSplit: ", {
         id: res.insertId,
         ...newCourseSplit,
      });
      result(null, { id: res.insertId, ...newCourseSplit });
   });
};

CourseSplit.createMultiCourseLessons = (lessons, masterId, course, result) => {
   sql.query(
      "INSERT INTO coursesplit (lessonId , masterId ,course) VALUES ?",
      [lessons.map((lesson) => [lesson.idLesson, masterId, course])],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created new courseSplit: ", lessons);
         result(null, lessons);
      }
   );
};

CourseSplit.findById = (courseSplitId, result) => {
   sql.query(
      `SELECT * FROM coursesplit WHERE idCourseSplit = ${courseSplitId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found courseSplit: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

CourseSplit.getByMasterId = (masterId, result) => {
   sql.query(
      `SELECT * FROM coursesplit JOIN lesson ON lesson.idLesson = courseSplit.lessonId WHERE courseSplit.masterId = ${masterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found courseSplit: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

CourseSplit.getAll = (result) => {
   sql.query("SELECT * FROM coursesplit", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("courseSplit: ", res);
      result(null, res);
   });
};

CourseSplit.updateById = (id, courseSplit, result) => {
   sql.query(
      "UPDATE coursesplit SET ?  WHERE idCourseSplit = ?",
      [courseSplit, id],
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

         console.log("updated courseSplit: ", { id: id, ...courseSplit });
         result(null, { id: id, ...courseSplit });
      }
   );
};

CourseSplit.remove = (id, result) => {
   sql.query(
      "DELETE FROM coursesplit WHERE idCourseSplit = ?",
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

         console.log("deleted courseSplit with id: ", id);
         result(null, res);
      }
   );
};

CourseSplit.removeAll = (result) => {
   sql.query("DELETE FROM coursesplit", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} courseSplit`);
      result(null, res);
   });
};

module.exports = CourseSplit;

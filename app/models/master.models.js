const sql = require("./db.js");

const Master = function (master) {
   this.sectionId = master.sectionId;
   this.level = master.level;
   this.studyType = master.studyType;
   this.masterTypeId = master.masterTypeId;
   this.year = master.year;
};

Master.create = (newMaster, result) => {
   sql.query("INSERT INTO master SET ?", newMaster, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new Master: ", {
         id: res.insertId,
         ...newMaster,
      });
      result(null, { id: res.insertId, ...newMaster });
   });
};

Master.findById = (masterId, result) => {
   sql.query(
      `SELECT * FROM master WHERE idMaster = ${masterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found master: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Master.getMasterClassByMasterId = (masterId, result) => {
   sql.query(
      `SELECT * FROM lesson JOIN master on master.idMaster = lesson.masterId WHERE master.idMaster =${masterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         } else if (res.length > 0) {
            console.log("found master: ", res[0]);
            // result(null, res[0]);
            sql.query(
               `SELECT * FROM master JOIN masterclass ON masterclass.masterId = master.idMaster WHERE idMaster = ${masterId}`,
               (err, resClass) => {
                  if (err) {
                     console.log("error: ", err);
                     result(err, null);
                     return;
                  } else if (res.length) {
                     console.log("found master: ", resClass);
                     result(null, { lessons: true, classes: resClass });
                     return;
                  }

                  result(null, { lessons: true, classes: [] });
               }
            );
         } else {
            result(null, { lessons: false, classes: [] });
         }
      }
   );
};

Master.getAllByMasterId = (masterId, result) => {
   sql.query(
      `SELECT * FROM finaldegree JOIN lesson JOIN master on lesson.masterId = master.idMaster AND finaldegree.lessonId = lesson.idLesson WHERE master.idMaster = ${masterId} GROUP BY finaldegree.collageNumber ORDER BY finaldegree.studentName ASC`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("masters: ", res);
         result(null, res);
      }
   );
};

Master.getAll = (sectionId, result) => {
   sql.query(
      `SELECT * FROM master JOIN mastertype WHERE master.masterTypeId = mastertype.idType AND master.sectionId = ${sectionId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("masters: ", res);
         result(null, res);
      }
   );
};

Master.getStudentMaster = (sqlQuery, result) => {
   sql.query(
      `SELECT * FROM master JOIN lesson JOIN finaldegree ON lesson.masterId = master.idMaster AND lesson.idLesson = finaldegree.lessonId WHERE 1=1  ${sqlQuery} GROUP BY finaldegree.collageNumber`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("masters: ", res);
         result(null, res);
      }
   );
};

Master.updateById = (id, master, result) => {
   sql.query(
      "UPDATE master SET ?  WHERE idMaster = ?",
      [master, id],
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

         console.log("updated master: ", { id: id, ...master });
         result(null, { id: id, ...master });
      }
   );
};

Master.remove = (id, result) => {
   sql.query("DELETE FROM master WHERE idMaster = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted master with id: ", id);
      result(null, res);
   });
};

Master.removeByMasterId = (id, result) => {
   sql.query("SELECT * FROM lesson WHERE masterId = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      } else {
         sql.query(
            `DELETE FROM finaldegree WHERE lessonId in (${res.map((lesson) => [
               lesson.idLesson,
            ])})`,
            (err, resFinal) => {
               if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
               }
               if (res.affectedRows == 0) {
                  result({ kind: "not_found" }, null);
                  return;
               } else {
                  console.log(resFinal);
                  sql.query(
                     "DELETE FROM masterclass WHERE masterId = ?",
                     id,
                     (err, res) => {
                        if (err) {
                           console.log("error: ", err);
                           result(null, err);
                           return;
                        } else if (res.affectedRows == 0) {
                           result({ kind: "not_found" }, null);
                           return;
                        } else {
                           sql.query(
                              "DELETE FROM master WHERE idMaster = ?",
                              id,
                              (err, res) => {
                                 if (err) {
                                    console.log("error: ", err);
                                    result(null, err);
                                    return;
                                 } else if (res.affectedRows == 0) {
                                    result({ kind: "not_found" }, null);
                                    return;
                                 } else {
                                    sql.query(
                                       "DELETE FROM  lesson WHERE masterId = ?",
                                       id,
                                       (err, res) => {
                                          if (err) {
                                             console.log("error: ", err);
                                             result(null, err);
                                             return;
                                          } else if (res.affectedRows == 0) {
                                             result(
                                                { kind: "not_found" },
                                                null
                                             );
                                             return;
                                          } else {
                                             console.log(
                                                "deleted master with id: ",
                                                id
                                             );
                                             result(null, res);
                                          }
                                       }
                                    );
                                 }
                              }
                           );
                        }
                     }
                  );
               }
            }
         );
      }
   });
};

Master.removeAll = (result) => {
   sql.query("DELETE FROM master", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} masters`);
      result(null, res);
   });
};

module.exports = Master;

const sql = require("./db.js");

const AppVersion = function (appVersion) {
   this.appName = appVersion.appName;
   this.appVersion = appVersion.appVersion;
};

AppVersion.create = (newAppVersion, result) => {
   sql.query("INSERT INTO appversion SET ?", newAppVersion, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new appVersion: ", {
         id: res.insertId,
         ...newAppVersion,
      });
      result(null, { id: res.insertId, ...newAppVersion });
   });
};

AppVersion.findById = (appVersionId, result) => {
   sql.query(
      `SELECT * FROM appversion WHERE idAppVersion = ${appVersionId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found appVersion: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

AppVersion.findByAppName = (appName, result) => {
   sql.query(
      `SELECT * FROM appversion WHERE appName = '${appName}'`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found appVersion: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

AppVersion.getAll = (result) => {
   sql.query("SELECT * FROM appversion", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("appVersion: ", res);
      result(null, res);
   });
};

AppVersion.updateById = (id, appVersion, result) => {
   sql.query(
      "UPDATE appversion SET ?  WHERE idAppVersion = ?",
      [appVersion, id],
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

         console.log("updated appVersion: ", { id: id, ...appVersion });
         result(null, { id: id, ...appVersion });
      }
   );
};

AppVersion.remove = (id, result) => {
   sql.query(
      "DELETE FROM appversion WHERE idAppVersion = ?",
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

         console.log("deleted appVersion with id: ", id);
         result(null, res);
      }
   );
};

AppVersion.removeAll = (result) => {
   sql.query("DELETE FROM appversion", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} appVersion`);
      result(null, res);
   });
};

module.exports = AppVersion;

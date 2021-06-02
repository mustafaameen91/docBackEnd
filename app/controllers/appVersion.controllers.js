const AppVersion = require("../models/appVersion.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const appVersion = new AppVersion({
      appName: req.body.appName,
      appVersion: req.body.appVersion,
   });

   AppVersion.create(appVersion, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the appVersion.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   AppVersion.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving AppVersion.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   AppVersion.findById(req.params.appVersionId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found AppVersion with id ${req.params.appVersionId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving AppVersion with id " +
                  req.params.appVersionId,
            });
         }
      } else res.send(data);
   });
};

exports.findOneByAppName = (req, res) => {
   AppVersion.findByAppName(req.params.appName, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found AppVersion with id ${req.params.appName}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving AppVersion with id " + req.params.appName,
            });
         }
      } else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   AppVersion.updateById(
      req.params.id,
      new AppVersion(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found AppVersion with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message: "Error updating AppVersion with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   AppVersion.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found AppVersion with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete AppVersion with id " + req.params.id,
            });
         }
      } else res.send({ message: `AppVersion was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   AppVersion.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all AppVersion.",
         });
      else res.send({ message: `All AppVersion were deleted successfully!` });
   });
};

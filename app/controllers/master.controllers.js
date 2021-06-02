const Master = require("../models/master.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const master = new Master({
      sectionId: req.body.sectionId,
      level: req.body.level,
      studyType: req.body.studyType,
      masterTypeId: req.body.masterTypeId,
      year: req.body.year,
   });

   Master.create(master, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the master.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Master.getAll(req.params.sectionId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving master.",
         });
      else res.send(data);
   });
};

exports.findAllByMasterId = (req, res) => {
   Master.getAllByMasterId(req.params.masterId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving master.",
         });
      else res.send(data);
   });
};

exports.findMasterClassByMasterId = (req, res) => {
   Master.getMasterClassByMasterId(req.params.masterId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving master.",
         });
      else res.send(data);
   });
};

exports.findStudentInfo = (req, res) => {
   let sectionId = req.query.sectionId;

   let level = req.query.level;

   let sqlQuery = "";

   if (sectionId) {
      sqlQuery += `AND sectionid = '${sectionId}' `;
   }

   if (level) {
      sqlQuery += `AND level = '${level}' `;
   }

   Master.getStudentMaster(sqlQuery, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student `,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving student",
            });
         }
      } else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Master.findById(req.params.masterId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found master with id ${req.params.masterId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving master with id " + req.params.masterId,
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

   Master.updateById(req.params.id, new Master(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Master with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Master with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Master.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Master with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Master with id " + req.params.id,
            });
         }
      } else res.send({ message: `Master was deleted successfully!` });
   });
};

exports.deleteByMasterId = (req, res) => {
   Master.removeByMasterId(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Master with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Master with id " + req.params.id,
            });
         }
      } else res.send({ message: `Master was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Master.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all Masters.",
         });
      else res.send({ message: `All Masters were deleted successfully!` });
   });
};

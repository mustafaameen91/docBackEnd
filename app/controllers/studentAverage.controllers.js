const StudentAverage = require("../models/studentAverage.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentAverage = new StudentAverage({
      collegeNumber: req.body.collegeNumber,
      average: req.body.average,
      sectionId: req.body.sectionId,
      studyType: req.body.studyType,
   });

   StudentAverage.create(studentAverage, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the studentAverage.",
         });
      else res.send(data);
   });
};

exports.createAverages = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   StudentAverage.createMultiAverage(req.body, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the averages.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   StudentAverage.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving studentAverage.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentAverage.findById(req.params.studentAverageId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studentAverage with id ${req.params.studentAverageId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving studentAverage with id " +
                  req.params.studentAverageId,
            });
         }
      } else res.send(data);
   });
};

exports.findOneBySectionId = (req, res) => {
   StudentAverage.findBySectionId(req.params.sectionId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studentAverage with sectionId ${req.params.sectionId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving studentAverage with sectionId " +
                  req.params.sectionId,
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

   StudentAverage.updateById(
      req.params.id,
      new StudentAverage(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found studentAverage with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating studentAverage with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentAverage.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studentAverage with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete studentAverage with id " + req.params.id,
            });
         }
      } else res.send({ message: `studentAverage was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentAverage.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all studentAverage.",
         });
      else
         res.send({ message: `All studentAverage were deleted successfully!` });
   });
};

const GraduationDocument = require("../models/graduationDocument.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   console.log(req.body);

   const graduationDocument = new GraduationDocument({
      studentName: req.body.studentName,
      studentNameEn: req.body.studentNameEn,
      collegeId: req.body.collegeId,
      studentId: req.body.studentId,
      sectionId: req.body.sectionId,
      sectionName: req.body.sectionName,
      dob: req.body.dob,
      enterYear: req.body.enterYear,
      average: req.body.average,
      sequence: req.body.sequence,
      totalStudents: req.body.totalStudents,
      firstAverage: req.body.firstAverage,
      phase: req.body.phase,
      failYears: req.body.failYears,
      postponementYear: req.body.postponementYear,
   });

   GraduationDocument.create(graduationDocument, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the graduationDocument.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   GraduationDocument.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving graduationDocument.",
         });
      else res.send(data);
   });
};

exports.findBySectionId = (req, res) => {
   GraduationDocument.getBySectionId(req.params.sectionId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found graduationDocument with sectionId ${req.params.sectionId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving graduationDocument with sectionId " +
                  req.params.sectionId,
            });
         }
      } else res.send(data);
   });
};

exports.findOne = (req, res) => {
   GraduationDocument.findById(req.params.graduationDocumentId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found graduationDocument with id ${req.params.graduationDocumentId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving graduationDocument with id " +
                  req.params.graduationDocumentId,
            });
         }
      } else res.send(data);
   });
};

exports.findOneByAppName = (req, res) => {
   GraduationDocument.findByAppName(req.params.appName, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found graduationDocument with id ${req.params.appName}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving graduationDocument with id " +
                  req.params.appName,
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

   GraduationDocument.updateById(
      req.params.id,
      new GraduationDocument(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found graduationDocument with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating graduationDocument with id " +
                     req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   GraduationDocument.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found graduationDocument with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete graduationDocument with id " +
                  req.params.id,
            });
         }
      } else
         res.send({ message: `graduationDocument was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   GraduationDocument.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all graduationDocument.",
         });
      else
         res.send({
            message: `All graduationDocument were deleted successfully!`,
         });
   });
};

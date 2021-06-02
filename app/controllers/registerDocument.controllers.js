const RegisterDocument = require("../models/registerDocument.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const registerDocument = new RegisterDocument({
      studentName: req.body.studentName,
      phase: req.body.phase,
      studyType: req.body.studyType,
      average: req.body.average,
      averageWrite: req.body.averageWrite,
      sectionId: req.body.sectionId,
      gender: req.body.gender,
   });

   RegisterDocument.create(registerDocument, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the registerDocument.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   RegisterDocument.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving RegisterDocument.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   RegisterDocument.findById(req.params.registerDocumentId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found RegisterDocument with id ${req.params.registerDocumentId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving RegisterDocument with id " +
                  req.params.registerDocumentId,
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

   RegisterDocument.updateById(
      req.params.id,
      new RegisterDocument(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found RegisterDocument with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating RegisterDocument with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.findBySectionId = (req, res) => {
   RegisterDocument.getBySectionId(req.params.sectionId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found RegisterDocument with id ${req.params.sectionId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving RegisterDocument with id " +
                  req.params.sectionId,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   RegisterDocument.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found RegisterDocument with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete RegisterDocument with id " + req.params.id,
            });
         }
      } else
         res.send({ message: `RegisterDocument was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   RegisterDocument.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all RegisterDocument.",
         });
      else
         res.send({
            message: `All RegisterDocument were deleted successfully!`,
         });
   });
};

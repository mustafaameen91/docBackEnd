const FinalDegree = require("../models/finalDegree.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const finalDegree = new FinalDegree({
      collageNumber: req.body.collageNumber,
      mark: req.body.mark,
      numberWriting: req.body.numberWriting,
      lessonId: req.body.lessonId,
      phase: req.body.phase,
      rule: req.body.rule,
      studentName: req.body.studentName,
   });

   FinalDegree.create(finalDegree, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the finalDegree.",
         });
      else res.send(data);
   });
};

exports.createDegrees = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   console.log(req.body);

   FinalDegree.createMultiDegree(req.body, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the lesson.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   FinalDegree.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving finalDegree.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   FinalDegree.findById(req.params.finalDegreeId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found finalDegree with id ${req.params.finalDegreeId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving finalDegree with id " +
                  req.params.finalDegreeId,
            });
         }
      } else res.send(data);
   });
};

exports.getAverageForStudents = (req, res) => {
   console.log(req.query.sectionId);
   FinalDegree.findAverageForStudents(
      req.query.sectionId,
      req.query.level,
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found finalDegree with id ${req.query.sectionId}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error retrieving finalDegree with id " +
                     req.query.sectionId,
               });
            }
         } else res.send(data);
      }
   );
};

exports.getAverageForStudent = (req, res) => {
   FinalDegree.findAverageForStudent(
      req.query.sectionId,
      req.query.level,
      req.query.collageNumber,
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found finalDegree with id ${req.query.sectionId}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error retrieving finalDegree with id " +
                     req.query.sectionId,
               });
            }
         } else res.send(data);
      }
   );
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   FinalDegree.updateById(
      req.params.id,
      new FinalDegree(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found finalDegree with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating finalDegree with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   FinalDegree.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found finalDegree with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete finalDegree with id " + req.params.id,
            });
         }
      } else res.send({ message: `finalDegree was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   FinalDegree.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all finalDegrees.",
         });
      else res.send({ message: `All finalDegrees were deleted successfully!` });
   });
};

const Lessons = require("../models/lessons.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const lesson = new Lessons({
      lessonName: req.body.sectionId,
      enName: req.body.level,
      units: req.body.studyType,
      masterId: req.body.masterTypeId,
   });

   Lessons.create(lesson, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the lesson.",
         });
      else res.send(data);
   });
};

exports.createLessons = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Lessons.createMultiLessons(
      req.body.lessons,
      req.body.masterId,
      (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while creating the lesson.",
            });
         else res.send(data);
      }
   );
};

exports.findAll = (req, res) => {
   Lessons.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Lessons.",
         });
      else res.send(data);
   });
};

exports.findAllByMasterId = (req, res) => {
   Lessons.getAllByMasterId(req.params.masterId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Lessons.",
         });
      else res.send(data);
   });
};

exports.findAllByLevel = (req, res) => {
   Lessons.getAllByLevel(req.query.level, req.query.sectionId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Lessons.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Lessons.findById(req.params.lessonId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found lesson with id ${req.params.lessonId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving lesson with id " + req.params.lessonId,
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

   Lessons.updateById(req.params.id, new Lessons(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Lesson with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Lessons.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Lesson with id " + req.params.id,
            });
         }
      } else res.send({ message: `Lesson was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Lessons.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all Lessons.",
         });
      else res.send({ message: `All Lessons were deleted successfully!` });
   });
};

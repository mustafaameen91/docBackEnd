const CourseSplit = require("../models/courseSplit.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const courseSplit = new CourseSplit({
      masterId: req.body.masterId,
      lessonId: req.body.lessonId,
      course: req.body.course,
   });

   CourseSplit.create(courseSplit, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the courseSplit.",
         });
      else res.send(data);
   });
};

exports.createCourseLessons = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   CourseSplit.createMultiCourseLessons(
      req.body.lessons,
      req.body.masterId,
      req.body.course,
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
   CourseSplit.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving courseSplit.",
         });
      else res.send(data);
   });
};

exports.findByMasterId = (req, res) => {
   CourseSplit.getByMasterId(req.params.masterId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found courseSplit with id ${req.params.masterId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving courseSplit with id " + req.params.masterId,
            });
         }
      } else res.send(data);
   });
};

exports.findOne = (req, res) => {
   CourseSplit.findById(req.params.courseSplitId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found courseSplit with id ${req.params.courseSplitId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving courseSplit with id " +
                  req.params.courseSplitId,
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

   CourseSplit.updateById(
      req.params.id,
      new CourseSplit(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found courseSplit with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating courseSplit with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   CourseSplit.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found courseSplit with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete courseSplit with id " + req.params.id,
            });
         }
      } else res.send({ message: `courseSplit was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   CourseSplit.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all courseSplit.",
         });
      else res.send({ message: `All courseSplit were deleted successfully!` });
   });
};

const SummerTraining = require("../models/summerTraining.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const summerTraining = new SummerTraining({
      roleName: req.body.roleName,
   });

   SummerTraining.create(summerTraining, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the SummerTraining.",
         });
      else res.send(data);
   });
};

exports.createMultiSummer = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   console.log(req.body);

   SummerTraining.createMultiTraining(req.body, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the lesson.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   SummerTraining.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving SummerTraining.",
         });
      else res.send(data);
   });
};

exports.findAllBySectionId = (req, res) => {
   SummerTraining.getAllBySectionId(req.params.sectionId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving SummerTraining.",
         });
      else res.send(data);
   });
};

exports.findAllBySectionIdAndStudy = (req, res) => {
   SummerTraining.getAllBySectionIdAndStudy(
      req.query.sectionId,
      req.query.studyType,
      (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while retrieving SummerTraining.",
            });
         else res.send(data);
      }
   );
};

exports.findOne = (req, res) => {
   SummerTraining.findById(req.params.summerTrainingId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found SummerTraining with id ${req.params.summerTrainingId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving SummerTraining with id " +
                  req.params.summerTrainingId,
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

   SummerTraining.updateById(
      req.params.id,
      new SummerTraining(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found SummerTraining with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating SummerTraining with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   SummerTraining.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found SummerTraining with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete SummerTraining with id " + req.params.id,
            });
         }
      } else res.send({ message: `SummerTraining was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SummerTraining.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all SummerTraining.",
         });
      else
         res.send({ message: `All SummerTraining were deleted successfully!` });
   });
};

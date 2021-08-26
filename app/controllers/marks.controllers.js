const Marks = require("../models/marks.models.js");

exports.findAll = (req, res) => {
   Marks.getAll((err, data) => {
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
   Marks.findById(req.params.finalDegreeId, (err, data) => {
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
   Marks.findAverageForStudents(
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

exports.getAverageForStudentsLevels = (req, res) => {
   Marks.findAverageForStudentsLevels(
      req.query.sectionId,
      req.query.searchTerm,
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
         } else {
            Marks.studentsLevelsData(data, (err, dataOne) => {
               let allData = {
                  levelOne: dataOne.levelOne.value,
                  levelTwo: dataOne.levelTwo.value,
                  levelThree: dataOne.levelThree.value,
                  levelFour: dataOne.levelFour.value,
                  levelFifth: dataOne.levelFifth.value,
               };
               res.send(allData);
            });
         }
      }
   );
};

exports.getAverageForStudent = (req, res) => {
   Marks.findAverageForStudent(
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

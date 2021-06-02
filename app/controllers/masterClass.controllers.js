const MasterClass = require("../models/masterClass.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const masterClass = new MasterClass({
      masterId: req.body.masterId,
      className: req.body.className,
   });

   MasterClass.create(masterClass, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the MasterClass.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   MasterClass.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving MasterClass.",
         });
      else res.send(data);
   });
};

exports.findOneByClassName = (req, res) => {
   MasterClass.findByClassName(
      req.query.className,
      req.query.masterId,
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.send([]);
            } else {
               res.status(500).send({
                  message:
                     "Error retrieving masterClass with id " +
                     req.params.masterId,
               });
            }
         } else res.send(data);
      }
   );
};
exports.findOne = (req, res) => {
   MasterClass.findById(req.params.masterClassId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found MasterClass with id ${req.params.masterClassId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving masterClass with id " +
                  req.params.masterClassId,
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

   MasterClass.updateById(
      req.params.id,
      new MasterClass(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found masterClass with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating masterClass with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   MasterClass.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found masterClass with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete masterClass with id " + req.params.id,
            });
         }
      } else res.send({ message: `masterClass was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   MasterClass.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all masterClass.",
         });
      else res.send({ message: `All masterClass were deleted successfully!` });
   });
};

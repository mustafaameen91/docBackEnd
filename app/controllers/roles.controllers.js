const Roles = require("../models/roles.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const role = new Roles({
      roleName: req.body.roleName,
   });

   Roles.create(role, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the Role.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Roles.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Role.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Roles.findById(req.params.roleId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Role with id ${req.params.roleId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving Role with id " + req.params.roleId,
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

   Roles.updateById(req.params.id, new Roles(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Role with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Role with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Roles.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Role with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Role with id " + req.params.id,
            });
         }
      } else res.send({ message: `Role was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Roles.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all Roles.",
         });
      else res.send({ message: `All Roles were deleted successfully!` });
   });
};

const User = require("../models/user.models.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId,
   });

   User.create(user, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the User.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   User.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving users.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   User.findById(req.params.userId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.userId}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving user with id " + req.params.userId,
            });
         }
      } else res.send(data);
   });
};

exports.loginUser = (req, res) => {
   User.login(req.body.userName, req.body.password, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with phone ${req.body.userName}. or password ${req.body.password}`,
            });
         } else {
            res.status(500).send({
               message: `Error retrieving Student with phone ${req.body.userName}. or password ${req.body.password}`,
            });
         }
      } else {
         const token = jwt.sign(
            {
               userName: data.userName,
               password: data.password,
               email: data.email,
               roleId: data.roleId,
            },
            process.env.JWT_KEY,
            {
               expiresIn: "30d",
            }
         );
         res.send({ token });
      }
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   User.updateById(req.params.id, new User(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found User with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating User with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   User.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete user with id " + req.params.id,
            });
         }
      } else res.send({ message: `User was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   User.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all User.",
         });
      else res.send({ message: `All User were deleted successfully!` });
   });
};

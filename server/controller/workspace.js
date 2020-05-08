const users = require('../models/User');
const jwt = require('jsonwebtoken');
// const axios = require('axios');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const db = require("../models");
// const SubDomain = db.subdomain;
const Workspace = db.workspace;
const Op = db.Sequelize.Op;


exports.createWorkspace = (req, res) => {
    const workspace = {
        name: req.body.workspaceName,
        userId: req.body.userId,
        subDomain: null
    }
    Workspace.create(workspace)
    .then(data => {
        res.status(200).send({
            success: true,
            data: data,
            message: ""
          });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
}


exports.deleteWorkspace = (req, res) => {
console.log(req.body.id);
    Workspace.destroy(
        {where: {id: req.body.id}}
        )
        .then(nums => {
            if (nums == 1) {
            
                res.send({ message: `${nums} Workspace were deleted successfully!`, success: true});

              } else {
                res.send({
                  success: false,
                  message: `Cannot delete Workspace with id=${id}. Maybe Workspace was not found!`
                });
              }
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing Workspace"
          });
        });
    // const workspace = {
    //     name: req.body.workspaceName,
    //     userId: req.body.userId,
    //     subDomain: null
    // }
    // Workspace.create(req.body.id)
    // .then(data => {
    //     res.status(200).send({
    //         success: true,
    //         data: data,
    //         message: ""
    //       });
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while creating the User."
    //   });
    // });
}
exports.editWorkspace = (req, res) => {
    


    // Workspace.findAll({where: { id: req.body.id }})
    // .then(data => {
    //     console.log(data);
    //   res.send(data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while retrieving tutorials."
    //   });
    // });
// console.log(userFind);


    Workspace.update(
        {name: req.body.name},
        {where: {id: req.body.id}}
    )
      .then(num => {
        if (num == 1) {
            
          res.send({
            success: true,
            message: "Workspace was updated successfully."
          });
        } else {
          res.send({
            success: false,
            message: `Cannot update Workspace with id=${id}. Maybe Workspace was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Workspace with id=" + id
        });
      });
}




exports.getWorkspaces = (req, res) => {
    Workspace.findAll({ where: { userId: req.body.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}
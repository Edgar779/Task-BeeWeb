
const db = require("../models");
const Workspace = db.workspace;
const Op = db.Sequelize.Op;


const passport = require('passport');


exports.createSubDomain = (req, res) => {
        const {id, subDomain} = req.body;

Workspace.findAll({}).then(data => {
    //
    const dataString = JSON.stringify(data);
    const workspaces = JSON.parse(dataString);
    //
    
    const isUsed = workspaces.some(workspace => workspace.subDomain === subDomain);

        if (isUsed) {
          const random = Math.floor(Math.random() * 100);

          return res.send({success: false, message: `subDomain is not available, please use ${subDomain + random}`});           
        } else{
          // insert
          Workspace.update(
                        {subDomain: subDomain},
                        {where: {id}}
                      )
                      .then(num => {
                        if (num == 1) {
                            
                          res.send({
                            success: true,
                            message: "SubDomain was created successfully."
                          });
                        } else {
                          res.send({
                            success: false,
                            message: `Cannot create subDomain with id=${id}. Maybe Workspaces was not found!`
                          });
                        }
                      })
                      .catch(err => {
                        res.status(500).send({
                          message: "Error creating SubDomain with id=" + id
                        });
                      });
        


          return res.send({
            success: true,
            message: "SubDomain was created successfully."
          });
        }

})
     
    
};


exports.availableSubDomain = (req, res) => {
  const {subDomain} = req.body;

  Workspace.findAll({}).then(data => {
    //
    const dataString = JSON.stringify(data);
    const workspaces = JSON.parse(dataString);
    //
    
    const isUsed = workspaces.some(workspace => workspace.subDomain === subDomain);

        if (isUsed) {
          const random = Math.floor(Math.random() * 100);

          return res.send({success: false, message: `subDomain is not available, please use ${subDomain + random}`});           
        } else{
          // insert


          return res.send({
            success: true,
            message: "SubDomain is available"
          });
        }

})

}
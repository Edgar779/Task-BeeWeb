
module.exports = (sequelize, Sequelize) => {
    const Workspace = sequelize.define("workspace", {
      userId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      subDomain: {
        type: Sequelize.STRING
      }
      // subDomain: {
      //   type: Sequelize.ARRAY(Sequelize.STRING)

      // }
    });
  
    return Workspace;
  };
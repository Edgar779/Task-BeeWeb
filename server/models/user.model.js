
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      fullName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
      // subDomain: {
      //   type: Sequelize.ARRAY(Sequelize.STRING)

      // }
    });
  
    return User;
  };
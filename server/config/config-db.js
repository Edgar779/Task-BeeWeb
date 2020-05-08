module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "123123",
    DB: "postgres",
    dialect: "postgres",
    logging: function () {},

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    // dialectOptions: {
    //     socketPath: "/var/run/mysqld/mysqld.sock"
    // },
    // define: {
    //     paranoid: true
    // }
  };    





  



// module.exports = {
//     HOST: "localhost",
//     USER: "Edgar",
//     PASSWORD: "BeeWeb123",
//     DB: "testdb",
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };    
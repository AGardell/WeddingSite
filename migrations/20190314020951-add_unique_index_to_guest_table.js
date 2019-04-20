"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex("guests", {
      name: "uniqueGuestIndex",
      unique: true,
      fields: [
        Sequelize.fn("lower", Sequelize.col("firstname")),
        Sequelize.fn("lower", Sequelize.col("lastname"))
      ]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex("guests", "uniqueNameConstraint");
  }
};

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.addConstraint("guests",
//       [
//         "firstname",
//         "lastname"
//       ],
//       {
//         type: "unique",
//         name: "uniqueNameConstraint"
//       })
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.removeConstraint("guests","uniqueNameConstraint");
//   }
// };

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tables', [ 
      { roomId:1, createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { roomId:1, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { roomId:1, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { roomId:2, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { roomId:2, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { roomId:3, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { roomId:3, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { roomId:3, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { roomId:2, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tables', null, {});
  }
};

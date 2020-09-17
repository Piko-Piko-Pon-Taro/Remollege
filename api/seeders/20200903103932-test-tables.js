'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tables', [
      { id:1, roomId:1, createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { id:2, roomId:1, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:3, roomId:1, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:4, roomId:2, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:5, roomId:2, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:6, roomId:3, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:7, roomId:3, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:8, roomId:3, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:9, roomId:2, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tables', null, {});
  }
};

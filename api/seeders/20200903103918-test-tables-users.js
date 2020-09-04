'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TablesUsers', [ 
      { tableId:1, userId:1, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { tableId:2, userId:2, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { tableId:3, userId:3, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { tableId:1, userId:4, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { tableId:2, userId:5, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { tableId:3, userId:6, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { tableId:4, userId:7, createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TablesUsers', null, {});
  }
};

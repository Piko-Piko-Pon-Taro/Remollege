'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Chats', [ 
      { tableId:1, userId:1, content:'ぴこぴこポンはおいしいね！', createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { tableId:1, userId:4, content:'ヤサイニンニクアブラ', createdAt:'2020-08-14 13:57:57', updatedAt:'2020-08-14 13:57:57'},
      { tableId:1, userId:1, content:'ヤサイマシマシニンニクマシマシアブラマシマシ', createdAt:'2020-08-14 13:58:51', updatedAt:'2020-08-14 13:58:51'},
      { tableId:1, userId:1, content:'ヤサイマシマシニンニクマシマシアブラマシマシ', createdAt:'2020-08-14 15:21:11', updatedAt:'2020-08-14 15:21:11'},
      { tableId:1, userId:1, content:'ヤサイマシマシニンニクマシマシアブラマシマシ', createdAt:'2020-08-14 17:10:08', updatedAt:'2020-08-14 17:10:08'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chats', null, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Chats', [
      { id:1, tableId:1, userId:1, content:'ぴこぴこポンはおいしいね！', createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { id:2, tableId:1, userId:4, content:'ヤサイニンニクアブラ', createdAt:'2020-08-14 13:57:57', updatedAt:'2020-08-14 13:57:57'},
      { id:3, tableId:1, userId:1, content:'ヤサイマシマシニンニクマシマシアブラマシマシ', createdAt:'2020-08-14 13:58:51', updatedAt:'2020-08-14 13:58:51'},
      { id:4, tableId:1, userId:1, content:'ヤサイマシマシニンニクマシマシアブラマシマシ', createdAt:'2020-08-14 15:21:11', updatedAt:'2020-08-14 15:21:11'},
      { id:5, tableId:1, userId:1, content:'ヤサイマシマシニンニクマシマシアブラマシマシ', createdAt:'2020-08-14 17:10:08', updatedAt:'2020-08-14 17:10:08'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chats', null, {});
  }
};

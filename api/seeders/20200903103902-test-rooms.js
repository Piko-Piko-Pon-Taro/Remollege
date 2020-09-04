'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rooms', [ 
      { buildingId:1, name:'ピコピコポン53号館店', createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { buildingId:2, name:'ピコピコポン54号館店', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { buildingId:3, name:'ピコピコポン55号館店', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { buildingId:1, name:'ラーメン荘 夢を語れ 53号館店', createdAt:'2020-09-02 00:11:32', updatedAt:'2020-09-02 00:11:32'},
      { buildingId:2, name:'ラーメン荘 夢を語れ 54号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:3, name:'ラーメン荘 夢を語れ 55号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:4, name:'ラーメン荘 夢を語れ 56号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:1, name:'ラーメン二郎 53号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:2, name:'ラーメン二郎 54号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:3, name:'ラーメン二郎 55号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:4, name:'ラーメン二郎 56号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:1, name:'天下一品 53号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:2, name:'天下一品 54号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:3, name:'天下一品 55号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:4, name:'天下一品 56号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:1, name:'立ち食いパスタ アッパーカット 53号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:1, name:'立ち食いパスタ アッパーカット 54号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:1, name:'立ち食いパスタ アッパーカット 55号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'},
      { buildingId:1, name:'立ち食いパスタ アッパーカット 56号館店', createdAt:'2020-09-02 00:15:20', updatedAt:'2020-09-02 00:15:20'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
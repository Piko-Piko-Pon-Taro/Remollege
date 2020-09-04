'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Buildings', [ 
      { campusId:1, name:'53号館', createdAt:'2020-09-02 00:03:35', updatedAt:'2020-09-02 00:03:35'},
      { campusId:1, name:'54号館', createdAt:'2020-09-02 00:03:35', updatedAt:'2020-09-02 00:03:35'},
      { campusId:1, name:'55号館', createdAt:'2020-09-02 00:06:54', updatedAt:'2020-09-02 00:06:54'},
      { campusId:1, name:'56号館', createdAt:'2020-09-02 00:06:54', updatedAt:'2020-09-02 00:06:54'},
      { campusId:1, name:'57号館', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { campusId:1, name:'58号館', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { campusId:1, name:'59号館', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { campusId:1, name:'60号館', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { campusId:1, name:'61号館', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { campusId:1, name:'62号館', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { campusId:1, name:'63号館', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Buildings', null, {});
  }
};

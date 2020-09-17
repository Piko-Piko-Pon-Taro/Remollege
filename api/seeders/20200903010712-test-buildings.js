'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Buildings', [
      { id:1, campusId:1, name:'53号館', img: 'https://storage.googleapis.com/remollege-storage/static/building53.png', createdAt:'2020-09-02 00:03:35', updatedAt:'2020-09-02 00:03:35'},
      { id:2, campusId:1, name:'54号館', img: 'https://storage.googleapis.com/remollege-storage/static/building54.png', createdAt:'2020-09-02 00:03:35', updatedAt:'2020-09-02 00:03:35'},
      { id:3, campusId:1, name:'55号館', img: 'https://storage.googleapis.com/remollege-storage/static/building55.png', createdAt:'2020-09-02 00:06:54', updatedAt:'2020-09-02 00:06:54'},
      { id:4, campusId:1, name:'56号館', img: 'https://storage.googleapis.com/remollege-storage/static/building56.png', createdAt:'2020-09-02 00:06:54', updatedAt:'2020-09-02 00:06:54'},
      { id:5, campusId:1, name:'57号館', img: 'https://storage.googleapis.com/remollege-storage/static/building57.png', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { id:6, campusId:1, name:'58号館', img: 'https://storage.googleapis.com/remollege-storage/static/building58.png', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { id:7, campusId:1, name:'59号館', img: 'https://storage.googleapis.com/remollege-storage/static/building59.png', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { id:8, campusId:1, name:'60号館', img: 'https://storage.googleapis.com/remollege-storage/static/building60.png', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { id:9, campusId:1, name:'61号館', img: 'https://storage.googleapis.com/remollege-storage/static/building61.png', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { id:10, campusId:1, name:'62号館', img: 'https://storage.googleapis.com/remollege-storage/static/building62.png', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'},
      { id:11, campusId:1, name:'63号館', img: 'https://storage.googleapis.com/remollege-storage/static/building63.png', createdAt:'2020-09-02 00:07:51', updatedAt:'2020-09-02 00:07:51'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Buildings', null, {});
  }
};

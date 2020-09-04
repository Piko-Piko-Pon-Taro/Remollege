'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [ 
      { name:'user', email:'turunasi@ruri.waseda.jp', password:'userpass', createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { name:'店長', email:'pikopiko@gmail.com', password:'userpass', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { name:'店員', email:'pikopiko@gmail.com', password:'userpass', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { name:'西井', email:'nishii@gmail.com', password:'userpass', img:'sampleIcon4.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { name:'井上', email:'inoue@gmail.com', password:'userpass', img:'sampleIcon2.png', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { name:'平', email:'taira@gmail.com', password:'userpass', img:'sampleIcon5.jpeg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { name:'渡邉', email:'watanabe@gmail.com', password:'userpass', img:'sampleIcon3.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
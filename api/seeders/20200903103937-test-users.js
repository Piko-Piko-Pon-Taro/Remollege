'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [ 
      { id:1, name:'user', email:'turunasi@ruri.waseda.jp', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', profile:'userです.', createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { id:2, name:'店長', email:'pikopiko@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', profile:'店長です.', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:3, name:'店員', email:'pikopiko@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', profile:'店員です.', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:4, name:'西井', email:'nishii@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:5, name:'井上', email:'inoue@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:6, name:'平', email:'taira@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:7, name:'渡邉', email:'watanabe@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

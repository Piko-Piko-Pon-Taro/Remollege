'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { id:1, name:'つるなし', email:'turunasi@ruri.waseda.jp', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', profile:'userです.', createdAt:'2020-08-14 00:00:00', updatedAt:'2020-08-14 00:00:00'},
      { id:2, name:'店長', email:'t_watanabe@suou.waseda.jp', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', profile:'店長です.', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:3, name:'店員', email:'kazuya032@toki.waseda.jp', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', profile:'店員です.', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:4, name:'西井', email:'dubhemerakphecdamegrez@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:5, name:'井上', email:'inoue@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:6, name:'ともちゃん', email:'inouenowasedamail@suou.waseda.jp', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:7, name:'平', email:'peaceee.programming@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
      { id:8, name:'渡邉', email:'tuyosi.628@gmail.com', password:bcrypt.hashSync('userpass', bcrypt.genSaltSync(10)), img:'https://storage.googleapis.com/remollege-storage/1599226056137sampleIcon1.jpg', createdAt:'2020-08-15 00:00:00', updatedAt:'2020-08-15 00:00:00'},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

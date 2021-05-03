const Sequelize = require('sequelize');

const sequelize = new Sequelize('celke', 'root', 'Pitu1234', {
  host: 'localhost',
  dialect: 'mysql'
});

/* sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!')
  })
  .catch((error) => {
    console.log('Erro ao realizar conexão com o banco de dados!')
  }); */

module.exports = sequelize;
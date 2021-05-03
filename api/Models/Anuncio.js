const { DataTypes } = require('sequelize');

const db = require('./db');

const Anuncio = db.define('anuncios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

//Criar a tabela
Anuncio.sync();

module.exports = Anuncio;
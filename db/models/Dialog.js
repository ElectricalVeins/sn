'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dialog extends Model {
    static associate(models) {
      // Dialog.hasMany(models.Message);
      Dialog.hasMany(models.Message);
      Dialog.hasMany(models.Message); //hasMany ?
    }
  }
  Dialog.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interlocutor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Dialog',
      tableName: 'dialogs',
    }
  );
  return Dialog;
};

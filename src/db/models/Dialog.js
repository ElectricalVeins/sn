const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dialog extends Model {
    static associate (models) {
      Dialog.hasMany(models.Message, {
        foreignKey: 'dialogId',
      });
    }
  }
  Dialog.init(
    {
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interlocutorId: {
        field: 'interlocutor_id',
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

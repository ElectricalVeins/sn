const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'user_role',
      });
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: false,
    },
  );
  return Role;
};

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate({ User }) {
      RefreshToken.belongsTo(User, {
        foreignKey: 'id',
      });
    }
  }
  RefreshToken.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fingerprint: DataTypes.STRING,
    ip: DataTypes.CIDR,
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};

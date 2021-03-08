const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const config = require('../../config');

const hashPasswordHook = async (user, options) => {
  const hash = await bcrypt.hash(user.password, Number(config.SALT_ROUND) || 5);
  // eslint-disable-next-line no-param-reassign
  user.password = hash;
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async isCorrectPassword (v) {
      return bcrypt.compare(v, this.getDataValue('password'));
    }

    static associate ({ Role, Post, Dialog, Message, RefreshToken }) {
      User.belongsTo(Role, {
        foreignKey: 'userRole',
      });
      User.hasMany(Post, {
        foreignKey: 'userId',
      });

      User.hasMany(Dialog, {
        foreignKey: 'id',
      });

      User.hasMany(Message, {
        foreignKey: 'id',
      });
      User.hasMany(RefreshToken, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      firstName: {
        field: 'first_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      imageSrc: {
        field: 'image_src',
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        field: 'password_hash',
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRole: {
        field: 'user_role',
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // user
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeCreate: hashPasswordHook,
      },
    }
  );
  return User;
};

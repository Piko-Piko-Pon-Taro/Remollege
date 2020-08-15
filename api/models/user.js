"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
          len: [1, 255],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["email", "password"],
        },
      },
      scopes: {
        auth: () => {
          return {};
        },
        forChat: () => {
          return {
            attributes: [
              ["name", "userName"],
              ["img", "userImg"],
            ],
          };
        },
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Chat, {
      sourceKey: "id",
      foreignKey: "userId",
    });
    User.hasOne(models.TableUser, {
      sourceKey: "id",
      foreignKey: "userId",
    });
  };
  return User;
};
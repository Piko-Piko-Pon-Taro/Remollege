"use strict";

module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 11],
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 11],
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      defaultScope: {},
      scopes: {
        withUsers() {
          return {
            include: [
              {
                model: sequelize.models.User.scope("forChat"),
              },
            ],
          };
        },
      },
    }
  );
  Chat.associate = function (models) {
    Chat.belongsTo(models.User, {
      sourceKey: "userId",
      foreignKey: "id",
    });
  };
  return Chat;
};

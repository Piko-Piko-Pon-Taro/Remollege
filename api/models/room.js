"use strict";

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      buildingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 11],
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
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
                model: sequelize.models.Table.scope("withUsers"),
              },
            ],
          };
        },
        withChats() {
          return {
            include: [
              {
                model: sequelize.models.Table.scope("withChats"),
                limit: 100,
              },
            ],
          };
        },
        withTables() {
          return {
            include: [
              {
                model: sequelize.models.Table,
              },
            ],
          };
        },
      },
    }
  );
  Room.associate = function (models) {
    Room.hasMany(models.Table, {
      sourceKey: "id",
      foreignKey: "roomId",
    });
  };
  return Room;
};

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
      img: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
    },
    {
      paranoid: true,
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
    Room.belongsTo(models.Building, {
      foreignKey: "buildingId",
      targetKey: "id",
    });
    Room.hasMany(models.Table, {
      sourceKey: "id",
      foreignKey: "roomId",
    });
  };
  return Room;
};

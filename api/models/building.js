"use strict";

module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define(
    "Building",
    {
      campusId: {
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
      scopes: {},
    }
  );
  Building.associate = function (models) {
    Building.hasMany(models.Room, {
      sourceKey: "id",
      foreignKey: "buildingId",
    });
  };
  return Building;
};

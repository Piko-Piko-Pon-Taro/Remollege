"use strict";

module.exports = (sequelize, DataTypes) => {
  const TableUser = sequelize.define(
    "TableUser",
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
    },
    {
      freezeTableName: true,
      tableName: "TablesUsers",
      defaultScope: {},
      scopes: {
        withUsers() {
          return {
            include: [
              {
                model: sequelize.models.User,
                attributes: {
                  exclude: ["email", "password"],
                },
              },
            ],
          };
        },
      },
    }
  );
  TableUser.associate = function (models) {
    TableUser.belongsTo(models.Table, {
      foreignKey: "tableId",
      targetKey: "id",
    });
    TableUser.hasOne(models.User, {
      sourceKey: "userId",
      foreignKey: "id",
    });
  };
  return TableUser;
};

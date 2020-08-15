"use strict";

module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define(
    "Table",
    {
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 11],
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
                model: sequelize.models.TableUser.scope("withUsers"),
              },
            ],
          };
        },
        withChats() {
          return {
            include: [
              {
                model: sequelize.models.Chat.scope("withUsers"),
                order: [["createdAt", "ASC"]],
                limit: 100,
              },
            ],
          };
        },
      },
    }
  );
  Table.associate = function (models) {
    Table.belongsTo(models.Room, {
      sourceKey: "roomId",
      foreignKey: "id",
    });
    Table.hasOne(models.TableUser, {
      sourceKey: "id",
      foreignKey: "tableId",
    });
    Table.hasMany(models.Chat, {
      sourceKey: "id",
      foreignKey: "tableId",
    });
  };
  return Table;
};

"use strict";
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface, dataTypes: DataTypes.DataType) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("Games", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: dataTypes.UUID,
            defaultValue: dataTypes.literal("uuid_generate_v4()")
          },
          name: {
            type: dataTypes.STRING,
            allowNull: false
          },
          slug: {
            type: dataTypes.STRING,
            allowNull: false
          },
          board: {
            type: dataTypes.ARRAY(dataTypes.ARRAY(dataTypes.INTEGER))
          },
          createdAt: {
            allowNull: false,
            type: dataTypes.DATE,
            defaultValue: dataTypes.literal("NOW()")
          },
          updatedAt: {
            allowNull: false,
            type: dataTypes.DATE,
            defaultValue: dataTypes.literal("NOW()")
          }
        });
      });
  },
  down: (queryInterface: QueryInterface, dataTypes: DataTypes.DataType) => {
    return queryInterface.dropTable("Games");
  }
};

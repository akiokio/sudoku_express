"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize
            .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
            .then(() => {
            return queryInterface.createTable("Games", {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.literal("uuid_generate_v4()")
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                slug: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                board: {
                    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("NOW()")
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("NOW()")
                }
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Games");
    }
};
//# sourceMappingURL=20190629234422-create-game.js.map
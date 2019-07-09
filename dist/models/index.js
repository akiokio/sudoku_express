"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("sequelize"));
const config_js_1 = __importDefault(require("../config/config.js"));
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = config_js_1.default[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
    sequelize = new sequelize_1.default(process.env[config.use_env_variable], config);
}
else {
    sequelize = new sequelize_1.default(config.database, config.username, config.password, config);
}
fs_1.default.readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        !file.includes(".test.js"));
})
    .forEach(file => {
    const model = require(path_1.default.join(__dirname, file));
    db[model.name] = model.init(sequelize, sequelize_1.default);
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.default;
exports.default = db;
//# sourceMappingURL=index.js.map
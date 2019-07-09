"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const configJson = __importStar(require("../config/config.js"));
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || "development";
// @ts-ignore: :shrug:
const config = configJson[env];
const db = {};
let sequelize;
sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
fs_1.default.readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        !file.includes(".test.js"));
})
    .forEach((file) => __awaiter(this, void 0, void 0, function* () {
    const model = require(path_1.default.join(__dirname, file)).default;
    db[model.name] = model.init(sequelize, sequelize_1.Sequelize);
}));
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map
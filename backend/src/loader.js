"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./config/server"));
require("./config/dataBase");
var routes_1 = __importDefault(require("./config/routes"));
(0, routes_1.default)(server_1.default);

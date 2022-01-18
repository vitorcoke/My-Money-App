"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
exports.default = mongoose_1.default.connect('mongodb://localhost/mymoney');
mongoose_1.default.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio ";
mongoose_1.default.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite minimo de '{MIN}' ";
mongoose_1.default.Error.messages.Number.max = "O '{VALUE}' informado é menor que o limite maximo de '{MAX}";

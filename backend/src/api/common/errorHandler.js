"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var parseErrors = function (nodeRestfulErrors) {
    var errors = [];
    lodash_1.default.forIn(nodeRestfulErrors, function (error) { return errors.push(error.message); });
    return errors;
};
exports.default = (function (req, res, next) {
    var bundle = res.locals.bundle;
    if (bundle.errors) {
        var errors = parseErrors(bundle.errors);
        res.status(500).json({ errors: errors });
    }
    else {
        next();
    }
});

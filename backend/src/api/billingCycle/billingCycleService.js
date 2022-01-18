"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var billingCycle_1 = __importDefault(require("./billingCycle"));
var billingCycle_2 = __importDefault(require("./billingCycle"));
var errorHandler_1 = __importDefault(require("../common/errorHandler"));
billingCycle_1.default.methods(['get', 'post', 'put', 'delete']);
billingCycle_1.default.updateOptions({ new: true, runValidators: true });
billingCycle_1.default.after('post', errorHandler_1.default).after('put', errorHandler_1.default);
billingCycle_1.default.route('count', function (req, res) {
    billingCycle_1.default.count(function (error, value) {
        if (error) {
            res.status(500).json({ errors: [error] });
        }
        else {
            res.json({ value: value });
        }
    });
});
billingCycle_1.default.route('get', function (req, res) {
    billingCycle_1.default.find({}, function (err, docs) {
        if (!err) {
            res.json(docs);
        }
        else {
            res.status(500).json({ errors: [Error] });
        }
    }).skip(req.query.skip).limit(req.query.limit);
});
billingCycle_2.default.route('summary', function (req, res) {
    billingCycle_1.default.aggregate([{
            $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
        }, {
            $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
        }, {
            $project: { _id: 0, credit: 1, debt: 1 }
        }], function (error, result) {
        if (error) {
            res.status(500).json({ errors: [error] });
        }
        else {
            res.json(result[0] || { credit: 0, debt: 0 });
        }
    });
});
exports.default = billingCycle_1.default;

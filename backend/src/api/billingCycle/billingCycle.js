"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restFul = require('node-restful');
var mongoose = restFul.mongoose;
var creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true },
});
var debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do debito'] },
    status: {
        type: String, required: false, upprcase: true,
        enum: ["PAGO", 'PENDENTE', 'AGENDADO']
    }
});
var billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts: [debtSchema]
});
exports.default = restFul.model('BillingCycle', billingCycleSchema);

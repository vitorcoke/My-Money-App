"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var billingCycleService_1 = __importDefault(require("../api/billingCycle/billingCycleService"));
function default_1(server) {
    //definir URL base para todas as rotas
    var router = express_1.default.Router();
    server.use('/api', router);
    //Rotas de ciclo de pagamento
    billingCycleService_1.default.register(router, '/billingCycles');
}
exports.default = default_1;

import express from 'express'
import BillingCycle from '../api/billingCycle/billingCycleService'

export default function(server:any){

    //definir URL base para todas as rotas
    const router = express.Router()
    server.use('/api', router)

    //Rotas de ciclo de pagamento
    BillingCycle.register(router, '/billingCycles')
}
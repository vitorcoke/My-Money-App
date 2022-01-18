import BillingCycle from "./billingCycle";
import { Request, Response } from 'express';
import errorsHandler from '../common/errorHandler'

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })
BillingCycle.after('post', errorsHandler).after('put', errorsHandler)

BillingCycle.route('count', (req: Request, res: Response) => {
    BillingCycle.count((error: any, value: any) => {
        if (error) {
            res.status(500).json({ errors: [error] })

        } else {
            res.json({ value })
        }
    })
})

BillingCycle.route('get', (req: Request, res: Response) => {

    BillingCycle.find({}, (err: any, docs: any) => {

        if (!err) {

            res.json(docs)

        } else {

            res.status(500).json({ errors: [Error] })

        }


    }).skip(req.query.skip).limit(req.query.limit)

})

BillingCycle.route('summary', (req: Request, res: Response) => {
    BillingCycle.aggregate([{
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
    }, {
        $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
    }, {
        $project: { _id: 0, credit: 1, debt: 1 }
    }], (error: any, result: any) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

export default BillingCycle
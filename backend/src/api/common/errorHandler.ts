import _ from 'lodash'
import { Request, Response, NextFunction } from 'express'


const parseErrors = (nodeRestfulErrors: any) => {
    const errors: any[] = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))

    return errors
}

export default (req: Request, res: Response, next: NextFunction) => {
    const bundle = res.locals.bundle

    if (bundle.errors) {
        const errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }
}


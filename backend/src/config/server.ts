import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
const queryParser = require('express-query-int')

const port = 3003
const server = express()

server.use(cors())
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(queryParser())
server.listen(port, function(){
    console.log(`BACKEND is running on port ${port}`)
})

export default server
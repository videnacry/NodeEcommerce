import express from 'express/index.js'
import {EXPRESS} from '.././config/app-config.js'

const route = express()
const port = EXPRESS.PORT

route.get('/', (req, res) => {
    res.send('You are consuming my mind, can\'t you see it ?')
})

route.get('/database/create', (req, res) => {
    import('../database/db.js').then(dbFile => {
        dbFile.Db.createDatabase().then(() => {
            res.send('Database created correctly !')
        }).catch(err => {
            res.send(err)
        })
    })
})

route.listen(port)
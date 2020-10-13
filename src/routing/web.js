import express from 'express/index.js'
import {EXPRESS} from '.././config/app-config.js'
import path from 'path'

const route = express()
route.set('views', EXPRESS.VIEWS_PATH)

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
route.listen(EXPRESS.PORT)
import express from 'express/index.js'
import {EXPRESS} from '.././config/app-config.js'

const route = express()
route.set('views', EXPRESS.VIEWS_PATH)
route.set('view engine', 'ejs')

route.use('/jquery', express.static(EXPRESS.JQUERY_PATH))
route.use('/bootstrap', express.static(EXPRESS.BOOTSTRAP_STYLE_PATH))
route.use('/bootstrap', express.static(EXPRESS.BOOTSTRAP_SCRIPT_PATH))

route.get('/register', (req, res) => {
    const userController = EXPRESS.JOIN(EXPRESS.CONTROLLERS_RELATIVE_ROUTING, 'UserController.js')
    import(EXPRESS.CONTROLLERS_RELATIVE_ROUTING + 'UserController.js').then(({create}) => {
        create(res)
    }).catch(err => {
        res.send(err)
    })
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
route.listen(EXPRESS.PORT, ()=>{
    console.log('http://localhost:' + EXPRESS.PORT)
})
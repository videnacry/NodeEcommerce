import express from 'express'
import session from 'express-session'
import mysqlstore from 'express-mysql-session'
const mysqlStore = mysqlstore(session)
const options = {
    database: 'test',
    user: 'root',
    password: '',
    host: 'localhost'
}
const sessionStore = new mysqlStore(options)
const route = express()
route.use(session({
    secret:'hi',
    resave:false,
    saveUninitialized:false,
    store:sessionStore
}))
route.get('/a/:username',(req,res)=>{
    req.session.username = req.params.username
    res.send('logedin')
})
route.get('/:username',(req,res)=>{
    if(req.session.username){
        res.send(req.session)
    }
    res.send('not logged')
})
route.get('/', (req, res) => {
    res.send(req.sessionID)
})
route.listen(3000)
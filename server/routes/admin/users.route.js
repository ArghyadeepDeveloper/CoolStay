const express = require('express')

const adminUserRoutes = express.Router()

adminUserRoutes.post('/register', ()=>{
    console.log("this is register route")
})

adminUserRoutes.post('/login', ()=>console.log("login toute"))

module.exports = adminUserRoutes
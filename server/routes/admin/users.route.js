const express = require('express');
const { register , login } = require('../../controllers/admin/users.controller');
const verifyToken = require('../../middlewares/verifyToken');


const adminUserRoutes = express.Router()

adminUserRoutes.post('/register', register)

adminUserRoutes.post('/login', login)

module.exports = adminUserRoutes;
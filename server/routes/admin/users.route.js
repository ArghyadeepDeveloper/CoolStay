const express = require('express');
const { register , login, uploadProfilePicture, updateProfilePicture } = require('../../controllers/admin/users.controller');
const verifyToken = require('../../middlewares/verifyToken');
const checkRole = require('../../middlewares/checkRole');
const { singleFileUpload } = require('../../middlewares/uploadHelper');


const adminUserRoutes = express.Router()

adminUserRoutes.post('/register', register)

adminUserRoutes.post('/login', login);

adminUserRoutes.post('/profile-picture', verifyToken, checkRole("0"), singleFileUpload, updateProfilePicture);

module.exports = adminUserRoutes;
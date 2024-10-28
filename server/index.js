const express = require('express');
const adminUserRoutes  = require('./routes/admin/users.route');

const app = express();

app.use("/admin", adminUserRoutes );

app.listen(3000,()=>{
    console.log("Server is running")
})
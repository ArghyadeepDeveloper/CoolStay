const express = require('express');
const cors = require('cors')
const adminUserRoutes  = require('./routes/admin/users.route');
const connectToDatabase = require('./database/connection');

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/admin", adminUserRoutes );

app.listen(3000,()=>{
    console.log("Server is running")
})
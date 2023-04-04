const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

 const port = process.env.PORT || 8000
 connectDB()
 

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/blog',require('./routes/blogRoutes'))



app.listen(port, ()=>console.log(`server listening on port ${port}`))
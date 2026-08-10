const express = require('express');
const app = express();
const connectDB = require('./db.js')
const user = require('./routes/user.js')

const port  = 3000;


// connecting to database//
app.use(express.json());
connectDB();


app.use('/api', user);

app.get('/',(req,res)=>{
    console.log("i am inside home page route" );
    res.send("hello");
})

app.listen(port,()=>{
    console.log("server started")
})
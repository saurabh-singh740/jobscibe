require('dotenv').config()
const app=require('./src/app')
const connecttodb=require('./src/DB/db')

connecttodb()

app.listen(3000,()=>{
    console.log("server is running at port 3000");
    })
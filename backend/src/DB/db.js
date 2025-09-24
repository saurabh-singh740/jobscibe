const mongoose=require('mongoose')
function connecttodb(){
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to db");
    
}).catch(()=>{
    console.log(err);
    
})
}
module.exports=connecttodb;
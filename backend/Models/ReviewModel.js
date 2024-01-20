const mongoose= require("mongoose")
const ordersSchema =new mongoose.Schema(
    {
    rating: {
        type: String
    },
    comment:{
type:String
    },
  customerdata:{
    type:Array
  },  
  
currentdate:{
  type:String
},

  productid:{
    type:String
  } ,
  Sellerid:{
     type:String
  },
    
  
    
    }  
    
)     

module.exports=mongoose.model("reviews",ordersSchema)    
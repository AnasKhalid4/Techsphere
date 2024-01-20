const ordersModel = require("../Models/ReviewModel");


module.exports.getreviews= async(req,res)=>{
    console.log("here")
    console.log(req)
    const response = await ordersModel.find();
    console.log(response)
    res.send(response)
    }


module.exports.reviews = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      rating,
      comment,
      currentdate,
      customerdata,
      productid,
      Sellerid
    } = req.body;
    const user = await ordersModel.create({
      rating,
      comment,
      currentdate,
      customerdata,
      productid,
      Sellerid
    });  
  } catch (err) {
    console.log(err);
  }
};
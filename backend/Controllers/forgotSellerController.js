const sellerModel = require("../Models/sellerModel");
const hashpassword = require("../Utils/authUtils");

const forgotSellerController = async (req, res) => {
  try {
    const { email, phone, newpassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!phone) {
      res.status(400).send({ message: "Phone no is required" });
    }
   
    if (!newpassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check phone number
    const seller = await sellerModel.findOne({ email, phone });
    if (!seller) {
      return res.status(400).send({
        success: false,
        message: "Incooorect email or password ",
      });
    }

    const hashed = await hashpassword(newpassword);
    await sellerModel.findByIdAndUpdate(seller._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password reset successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "There is an error",
      error,
    });
  }
};

module.exports = forgotSellerController;

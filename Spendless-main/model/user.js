var mongoose = require('mongoose');
//var crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
     
      unique: true,
    },
    password:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    Month:[{
        MonthName:{
        type:String,
        default:"2021-01",
        unique: true
    },
    MonthlySavings:{
        type:Number,
        default:2000

   },
   MonthlyIncome:{
       type:Number,
       default:10000
   },
   MonthlyExpenses:{
       type:Number,
       default:8000
   }}]
    

})
module.exports = mongoose.model("usernames",userSchema)

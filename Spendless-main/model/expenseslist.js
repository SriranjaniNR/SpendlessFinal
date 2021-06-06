var mongoose = require('mongoose');
//var crypto = require('crypto');

const ListSchema = new mongoose.Schema({
  MonthName:{
      type:String

  },

    Food:{
      type:Number,
      
     
      unique: true,
    },
    Grocery:{
      type:Number,
      
    },
  Health:{
        type:Number,
        
        unique: true
    },
Miscellanous:{
       type:Number,
        unique: true
    }
   

})
module.exports = mongoose.model("list",ListSchema)

const express = require('express');
const router = express.Router()
const app = express();
var user =require('./model/user');
var list =require('./model/expenseslist');
//var info =require('./model/info');

router.get('/css/login.css',async(req,res)=>{
    res.sendFile(__dirname + '/public/css/login.css');
}) 
var name=""
var pwd=" "

router.get('/',async (req, res) => {
    res.sendFile(__dirname+ '/index.html');
  })
  router.get('/main',async (req, res) => {
    list.find({MonthName:"2021-07"}, function(err, users) {
      
      res.render(__dirname + "/info.ejs", {all:users});
      })
    
    
  })
  router.get('/login',async (req, res) => {
    res.sendFile(__dirname+ '/login.html');
  })
  router.get('/usersList', function(req, res) {
    user.find({}, function(err, users) {
     
  
      res.send(JSON.stringify(users));  
    });
  });
  router.get('/List', function(req, res) {
    list.find({}, function(err, users) {
     
  
      res.send(JSON.stringify(users));  
    });
  });
  
  router.post('/login',function(req,res){
    name= req.body.name;
    pwd =req.body.pwd;
    var query ={};
    query["name"] =name;
    query["password"] =pwd;
  
     query=JSON.stringify(query)
    user.find({"name":name,"password":pwd}, function(err, users) {
       if(users.length==1)
         {var u= JSON.stringify(users)
            res.redirect("/19BCT0165/info")}
      else
      res.redirect("/19BCT0165/login")
     
    });

  })
  
  router.get('/remove',(req,res)=>{
  user.deleteOne({}, function (err) {
      if (err)
        res.send(err);
      else
        res.send("Deleted")
        
    });
  })
  router.get('/info',(req,res)=>{
    user.find({"name":name,"password":pwd}, function(err, users) {
    res.render(__dirname + "/information.ejs", {all:users});
    })
  })
  
  var m="2021-12"
  router.post('/info',async (req, res) => {
    var mi=0
  var t=0
  var s=0
      mi=parseInt(req.body.in)
     var money=req.body.money
      m=req.body.month;
      for (i = 0; i < money.length; i++) {
        
        t += parseInt(money[i]);
      }
      const List = new list({
        MonthName:m,
        Food:parseInt(money[0]),
        Grocery:parseInt(money[1]),
        Health:parseInt(money[2]),
        Miscellanous:parseInt(money[3]),
       
     })
     
     try{
       const newList = await List.save()
     }catch(err) {
       console.log("message:"+err.message)
     }
      s=mi-t;
  

      
      console.log(money+""+t+""+s+""+m)
    user.updateOne({name:name},{"$addToSet":{Month:{MonthName:m,MonthlyIncome:mi,MonthlyExpenses:t, MonthlySavings:s}}}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                res.redirect("/19BCT0165/info")
            }
        })
  })
  var mail=""
  router.post('/signup',async (req, res) => {
    name=req.body.name
    mail=req.body.email
    console.log(name+mail)
    if(req.body.pwd == req.body.cpwd){
    const User = new user({
      name:name,
      password:req.body.pwd,
      email:mail,
     
   })
   
   try{
     const newUser = await User.save()
     res.redirect("/19BCT0165/info")
   }catch(err) {
     res.status(400).json({message:err.message})
   }
  }
  else{
    res.redirect('/')
  }
})

module.exports =router
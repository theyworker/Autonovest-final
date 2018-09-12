module.exports = function(express, app){
  var router = express.Router();
  var bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  // var carDetails = require('../src/other/cars')
  var carDetails = require('../src/other/carsnew')
  const truffle_connect = require('../connection/app.js');
const bgint = require('../connection/backgroundinteractions.js');
  // const multer = require("multer");


  router.get('/', function(req,res,next){

    res.render('index',{title:'Autonovest - Crowdfunding for Autonomous Cars'});
  })

  router.get('/faq', function(req,res,next){
    res.render('faq',{title:'FAQ | Autonovest'});
  })

  router.get('/contact', function(req,res,next){
    res.render('contact',{title:'Contact | Autonovest'});
  })

  router.get('/login', function(req,res,next){
    res.render('login',{title:'Login | Autonovest'});
  })

  router.get('/admin', function(req,res,next){
    res.render('admindashboard',{title:'Dashboard | Autonovest'});
  })

  router.get('/market', function(req,res,next){
var numofcars;
truffle_connect.start(function(answer) {
  console.log(answer);
});
    var carsno = truffle_connect.getnumofcars();

//timing out for 100ms t
    setTimeout(function () {
        var car1 = truffle_connect.getResult();
        console.log(car1+' cars are there');
        numofcars = car1;
    }, 100);

console.log(numofcars+'outside');

    res.render('market',{title:'Market | Autonovest'});
  })

  router.get('/buy/:carID', function(req,res,next){
    var c = parseInt(req.params.carID);

    truffle_connect.start(function(answer) {
      console.log(answer);
    });

    truffle_connect.getAccountBalance();

      var bal = truffle_connect.returnUserAccountBal()+' Ether';

        var Car_Name = carDetails[c].name;

        var carsno = truffle_connect.getCarPricinginfo(c);

        var priceinfo = truffle_connect.returnPriceinfo();

        var ARdata = truffle_connect.returnARinfo();

        var ARinfo = ARdata;

        var availStake = priceinfo - ARinfo;
        var percentageSold = "width:"+(ARinfo/priceinfo).toFixed(2)*100+"%";
    res.render('carbuy',{title:'Car Buy | Autonovest', cname:Car_Name,
     price: priceinfo,
      availSTK: availStake,
      percenSol: percentageSold,
      amountr: ARinfo,
      refno: c,
    blnc : bal})

  })


  router.get('/carinfo/:carID', function(req,res,next){



    var c = parseInt(req.params.carID);
      if (!isNaN(c)){ //handling useless requests


        truffle_connect.start(function(answer) {
          console.log(answer);
        });

            var carsno = truffle_connect.getCarPricinginfo(c);

            var priceinfo = truffle_connect.returnPriceinfo();
            console.log('Prices are'+priceinfo);

var ARdata = truffle_connect.returnARinfo();
console.log(typeof(ARdata));
            var ARinfo = ARdata;
            console.log('Prices are'+ARinfo);

            var availStake = priceinfo - ARinfo;
            var percentageSold = "width:"+(ARinfo/priceinfo).toFixed(2)*100+"%";

console.log(percentageSold);

    var Car_Name = carDetails[c].name;
    var Car_pic = "../"+carDetails[c].picture;
    var Car_yom = carDetails[c].yearofmanu;
    var Car_manu = carDetails[c].Manufacturer;
    var Car_EN = carDetails[c].EngineNumber;
    var Car_des = carDetails[c].description;
    var Car_np = carDetails[c].Numberplate;

    // console.log(Car_Name,Car_pic,Car_yom,Car_manu,Car_EN);
    res.render('carprofile_admin',{title:'Car Profile | Autonovest',
     cname:Car_Name,
     cpic:Car_pic,
     manu:Car_manu,
     yom:Car_yom,
     desc: Car_des,
     np:Car_np,
     price: priceinfo,
     amountr: ARinfo,
     availSTK: availStake,
     percenSol: percentageSold,
     refno: c
   });
  }

  })
  router.get('/car/:carID', function(req,res,next){



    var c = parseInt(req.params.carID);
      if (!isNaN(c)){ //handling useless requests


        truffle_connect.start(function(answer) {
          console.log(answer);
        });

            var carsno = truffle_connect.getCarPricinginfo(c);

            var priceinfo = truffle_connect.returnPriceinfo();
            console.log('Prices are'+priceinfo);

var ARdata = truffle_connect.returnARinfo();
console.log(typeof(ARdata));
            var ARinfo = ARdata;
            console.log('Prices are'+ARinfo);

            var availStake = priceinfo - ARinfo;
            var percentageSold = "width:"+(ARinfo/priceinfo).toFixed(2)*100+"%";

console.log(percentageSold);

    var Car_Name = carDetails[c].name;
    var Car_pic = "../"+carDetails[c].picture;
    var Car_yom = carDetails[c].yearofmanu;
    var Car_manu = carDetails[c].Manufacturer;
    var Car_EN = carDetails[c].EngineNumber;
    var Car_des = carDetails[c].description;
    var Car_np = carDetails[c].Numberplate;

    // console.log(Car_Name,Car_pic,Car_yom,Car_manu,Car_EN);
    res.render('carprofile',{title:'Car Profile | Autonovest',
     cname:Car_Name,
     cpic:Car_pic,
     manu:Car_manu,
     yom:Car_yom,
     desc: Car_des,
     np:Car_np,
     price: priceinfo,
     amountr: ARinfo,
     availSTK: availStake,
     percenSol: percentageSold,
     refno: c
   });
  }

  })

  router.post('/buythecar', function(req,res,next){
var carid = req.body.carid1;
var amount = req.body.buyamount;

console.log('Server here');
console.log(carid);
console.log(amount);


truffle_connect.start(function(answer) {
  console.log(answer);
});

var f= truffle_connect.buycar(carid,amount);
var model = carDetails[carid].name;
var am = amount+' Ether '

bgint.updateForSale(carid);


res.render('purchase_sucesspage',{mdl: model, val : am });
  })

  router.get('/addcar', function(req,res,next){

    res.render('addcar',{title:'Add Car | Autonovest'});
  })

  router.get('/newuser', function(req,res,next){
    res.render('newuser',{title:'Registration | Autonovest'});
  })

  router.get('/user', function(req,res,next){
    truffle_connect.start(function(answer) {
      console.log(answer);
    });

    truffle_connect.getAccountBalance();

      var bal = truffle_connect.returnUserAccountBal()+' Ether';

      var acc = truffle_connect.returnUserAcc();

      truffle_connect.getUserName();
      truffle_connect.getUserPassport();
      truffle_connect.getUserEmail();
      truffle_connect.getUserVerification();


      var name = truffle_connect.returnUserName();
      var passportfull = truffle_connect.returnUserPassport();
      var email = truffle_connect.returnUserEmail();
      if (passportfull) {
        var passport = '********'+passportfull.substring(4);
      }
      var verified = truffle_connect.returnUserVerification();
      var verifiedtxt;
      if(verified == true){
        verifiedtxt = "Verified";
      }
      else {
        verifiedtxt = "Not Verified";
      }

    res.render('userprofile',{title:'User Profile | Autonovest', blnc: bal, uname: acc, nm: name, pp: passport, eml : email, vrfy : verifiedtxt});
  })

  router.get('/newadmin', function(req,res,next){
    res.render('newadmin',{title:'Admin Registration | Autonovest'});
  })

  router.post('/newadminacc', function(req,res,next){
    //console.log(req.body);
    var uname = req.body.usrname;
    var pwd = req.body.pswd;
    var email = req.body.em;

    console.log(uname);

//     var sql = "INSERT INTO `AdminUsers` (AdminUserID,AdminPassword,AdminEmail) VALUES('"+uname+"','"+pwd+"','"+email+"');";
// console.log(sql);
//     con.query(sql, function (err, result) {
//   if (err) throw err
//   console.log('Inserted 1 record')
//
//     res.render('sucesspage',{title:'Autonovest - Crowdfunding for Autonomous Cars',
//     objtype : 'Admin',
//     objname: uname});
//   })

})

  router.post('/newuseracc', function(req,res,next){
    //console.log(req.body);
    var uname = req.body.usrname;
    var uemail = req.body.em;
    var ppNUM = req.body.ppnum;

    truffle_connect.start(function(answer) {
      console.log(answer);
    });

    truffle_connect.userVerification(uname,uemail,ppNUM);



    res.render('sucesspage',{title:'Autonovest - Crowdfunding for Autonomous Cars',
    objtype : 'User',
    objname: uname});
  })

  router.get('/addmanu', function(req,res,next){
    res.render('addmanufacturer',{title:'Add Manufacturer | Autonovest'});
  })

  router.post('/newmanu', function(req,res,next){
    //console.log(req.body);
    var mname = req.body.comname;
    var maddress = req.body.address;
    var memail = req.body.email;
    var mtele = req.body.tel;



//     var sql = "INSERT INTO Manufacturer VALUES ( '"+maddress+"','"+memail+"','"+mtele+"', NULL"+",'"+mname+"');";
// con.query(sql, function (err, result) {
//   if (err) throw err
//   console.log('Inserted 1 record')
//   res.render('sucesspage',{title:'Autonovest - Crowdfunding for Autonomous Cars',
//   objtype : 'Manufacturer',
//   objname: mname});


    // console.log(mname,maddress,memail, mtele);


  // })

  })
router.post('/login-attempt', function(req,res,next){
  var usernm = req.body.usernm;
  var passwd = req.body.passwd;
  console.log(usernm,passwd);
})



  router.post('/newcar', function(req,res,next){
    var cid = carDetails.length;
    var cmanuf = req.body.manuf;
    var cmodel = req.body.model;
    var cyr = req.body.yr;
    var cregnumplt = req.body.RegNumPlate;
    var engnum = req.body.engnum;
    var description = req.body.descrip;
    var cval = req.body.val;




    truffle_connect.start(function(answer) {
    console.log(answer);
    });

    var addy = truffle_connect.addnewcar(cval.valueOf(),cregnumplt,engnum,function(answer){
      console.log(answer);
    })


carDetails.push({"id":cid,
"name":cmodel,
"picture":"lexus.jpg",
"yearofmanu":cyr,
"Manufacturer":cmanuf,
"EngineNumber":engnum,
"description":description,
"Numberplate":cregnumplt,
"ForSale":true,
"CarActive": true});

var fs = require('fs');

var jsonData = JSON.stringify(carDetails);
fs.writeFile("./src/other/carsnew.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});



    res.render('sucesspage',{title:'Autonovest - Crowdfunding for Autonomous Cars',
    objtype : 'Car',
    objname: cid});

})
  app.use('/', router);
}

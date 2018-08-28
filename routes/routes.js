module.exports = function(express, app){
  var router = express.Router();
  var bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  var carDetails = require('../src/other/cars')
  // console.log(carDetails);
  // const mysql = require('mysql');
  //
  // const con = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'avar',
  //   password: 'avar22',
  //   database: 'Autonovest'
  // })

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
    res.render('market',{title:'Market | Autonovest'});
  })


  router.get('/car/:carID', function(req,res,next){
    var c = parseInt(req.params.carID);
      if (!isNaN(c)){ //handling useless requests


    var Car_Name = carDetails[c].name;
    var Car_pic = carDetails[c].picture;
    var Car_yom = carDetails[c].yearofmanu;
    var Car_manu = carDetails[c].Manufacturer;
    var Car_EN = carDetails[c].EngineNumber;

    console.log(Car_Name,Car_pic,Car_yom,Car_manu,Car_EN);
  }
    res.render('carprofile',{title:'Car Profile | Autonovest',
     cname:Car_Name,
     cpic:Car_pic,

   });
  })

  router.get('/addcar', function(req,res,next){

    // var dbmanus = {};
    // var dbmanus = "";
    //
    //   con.query('SELECT distinct CompanyRegName FROM Autonovest.Manufacturer;', (err, rows) => {
    //     if (err) throw err
    //
    //     for (var i = 0; i < rows.length; i++) {
    //       // dbmanus[i + 1] = rows[i].CompanyRegName;
    //       var temp = rows[i].CompanyRegName;
    //       dbmanus = dbmanus + temp+'|';
    //     };
    //   })


    res.render('addcar',{title:'Add Car | Autonovest'});
  })

  router.get('/newuser', function(req,res,next){
    res.render('newuser',{title:'Registration | Autonovest'});
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
    console.log(uname);
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
    var cid = req.body.carid;
    var cmanuf = req.body.manuf;
    var cmodel = req.body.model;
    var cyr = req.body.yr;
    var cregnumplt = req.body.RegNumPlate;
    var engnum = req.body.engnum;
    var description = req.body.descrip;
    var cval = req.body.val;

    //insert into database

    var sql = "INSERT INTO cars(engNum, Numberplate, ManufacturerID, Model, Manufacturedyear, value, description, carid) VALUES ('"+engnum+"', '"+cregnumplt+"', 1 , '"+cmodel+"', '"+cyr+"', '"+cval+"','"+description+"', NULL);";
  con.query(sql, function (err, result) {
  if (err) throw err
  console.log('Inserted 1 record')


    res.render('sucesspage',{title:'Autonovest - Crowdfunding for Autonomous Cars',
    objtype : 'Car',
    objname: cid});
  })

})
  app.use('/', router);
}

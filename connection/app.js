const contract = require('truffle-contract');


const crowdfunding_artifacts = require('../build/contracts/Crowdfunding.json');
var Carfunding = contract(crowdfunding_artifacts);


var carForSale;

var temprResultValue;

var carprice;
var caramountraised;
var userNAME;
var userPASSPORT;
var userEMAIL;
var userVERIFY;
//to store user Balance
var userBal;

var PricePerKM = 20000000000000000;
var PriceperMinute = 10000000000000000;

module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {

      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[0];
      callback(self.account);

      Carfunding.web3.eth.defaultAccount = self.web3.eth.coinbase;
    console.log("This is the coinbase ::::::: " + self.web3.eth.coinbase);
self.web3.eth.defaultAccount = self.web3.eth.accounts[0];
    });
  },
  buycar: function(cid,am) {
    var self = this;

    // // Bootstrap the MetaCoin abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);

    var Carfunding_inst;
    Carfunding.deployed().then(function(instance) {
      Carfunding_inst = instance;
      return Carfunding_inst.buycar(cid,{value:am*1000000000000000000,gas: 3000000});
    }).catch(function(e) {

      callback(true);

    });

  },
  getnumofcars: function() { // this is where im stuck 1
    var self = this;
    // Bootstrap the MetaCoin abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);

    var meta;

    Carfunding.deployed().then(function(instance) {
      meta = instance;

      return meta.getNumofCars.call().then(function(result){
        rsl = result.toNumber();
        temprResultValue = rsl;

      });
    }).catch(function(e) {
      console.log(e);
    });
  },


  addnewcar : function(num,Numberplate, engnum ,callback){
    var self = this;
    var numinwei = num*1000000000000000000;
console.log(numinwei);
    // // Bootstrap the  abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);
    var Carfunding_inst;

    Carfunding.deployed().then(function(instance) {
      Carfunding_inst = instance;
      return Carfunding_inst.newcar(numinwei, Numberplate , engnum, {gas:3000000}).then(function(result){
console.log(result);
      });
    }).catch(function(e) {
      console.log(e);
      callback("Car adding Failed!");
    });
  },

  carincome : function(car,dist, time){
      var self = this;
  var totalamount = (dist*PricePerKM)+(time*PriceperMinute);
console.log('Total Amount'+totalamount);
  Carfunding.setProvider(self.web3.currentProvider);
  var Carfunding_inst;

  Carfunding.deployed().then(function(instance) {
    Carfunding_inst = instance;
    return Carfunding_inst.carincome(car,{value:totalamount}).then(function(){

    })
  })

  },

userVerification : function(name, email, passport){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);
  var Carfunding_inst;

  Carfunding.deployed().then(function(instance){
    Carfunding_inst = instance;
    return Carfunding_inst.userverify(self.account, name, email, passport, {gas:3000000}).then(function(rs){
console.log(rs);
    })
    //address adduser, string nameuser, string emailuser, string passpuser
  }).catch(function(e) {
    console.log(e);
    callback("ERROR 404");
  });
},

getResult : function(){
var tempvar = temprResultValue;
temprResultValue = "";
return tempvar;

},

getCarPricinginfo : function(carid){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

      var Carfunding_inst;

      Carfunding.deployed().then(function(instance){
        Carfunding_inst = instance;

        return Carfunding_inst.getPrice.call(carid).then(function(result){

          carprice = result.toNumber()/1000000000000000000

          return Carfunding_inst.getAmountRaised.call(carid).then(function(ar){
            caramountraised = ar.toNumber()/1000000000000000000;
            console.log(caramountraised);
          })
        });
      })
},

getCarForSale : function(carid){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

      var Carfunding_inst;
      Carfunding.deployed().then(function(instance){
        Carfunding_inst = instance;
        return Carfunding_inst.getForSale.call(carid).then(function(forsale){
          carForSale = forsale;
        })
      })
},
carDistributeIncome : function(cid){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

    var Carfunding_inst;
    Carfunding.deployed().then(function(instance){
      Carfunding_inst = instance;
      return Carfunding_inst.distIncome(cid);
    })


},

claimIncome : function(){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

    var Carfunding_inst;
    Carfunding.deployed().then(function(instance){
      Carfunding_inst = instance;
      return Carfunding_inst.claimEarnings(self.account);
    })


},

returnForSale : function (){
  var tempvar = carForSale;
  carForSale="";
  return tempvar;
},

returnPriceinfo : function (){
  var tempvar = carprice;
  carprice="";
  return tempvar;
},

returnARinfo : function (){
  var tempvar = caramountraised;
  caramountraised = "";
  return tempvar;
},

getAccountBalance : function(){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

      var Carfunding_inst;

      Carfunding.deployed().then(function(instance){
          Carfunding_inst = instance;

          return Carfunding_inst.getUserBalance.call(self.account).then(function(userbal){
              userBal = userbal/1000000000000000000;
          })
      })

},

getUserName : function(){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

      var Carfunding_inst;

      Carfunding.deployed().then(function(instance){
        Carfunding_inst = instance;
        return Carfunding_inst.getUserName.call(self.account).then(function(name){

          userNAME = name;
        })
      })

},
getUserPassport : function(){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

      var Carfunding_inst;

      Carfunding.deployed().then(function(instance){
        Carfunding_inst = instance;
        return Carfunding_inst.getUsePassport.call(self.account).then(function(pp){

          userPASSPORT = pp;
        })
      })

},
getUserEmail : function(){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

      var Carfunding_inst;

      Carfunding.deployed().then(function(instance){
        Carfunding_inst = instance;
        return Carfunding_inst.getUserEmail.call(self.account).then(function(email){

          userEMAIL = email;
        })
      })

},

getUserVerification : function(){
  var self = this;
  Carfunding.setProvider(self.web3.currentProvider);

      var Carfunding_inst;

      Carfunding.deployed().then(function(instance){
        Carfunding_inst = instance;
        return Carfunding_inst.getUserVerified.call(self.account).then(function(vrfy){
          userVERIFY = vrfy;
        })
      })

},

returnUserName : function(){
  var tempvar = userNAME;
  userNAME = "";
  return tempvar;
},
returnUserVerification : function(){
var tempvar = userVERIFY;
userVERIFY = "";
  return tempvar;
},

returnUserPassport : function(){
var tempvar = userPASSPORT;
userPASSPORT = "";
  return tempvar;
},

returnUserEmail : function(){
var tempvar = userEMAIL;
userEMAIL ="";
  return tempvar;
},

returnUserAccountBal : function(){
var tempvar = userBal;
userBal= "";
  return tempvar;
},

returnUserAcc : function () {
  var self = this;
  return self.account;
}


}

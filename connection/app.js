const contract = require('truffle-contract');


// const metacoin_artifact = require('../build/contracts/MetaCoin.json');
// var MetaCoin = contract(metacoin_artifact);

//
// const carfunding_artifact = require('../build/contracts/carfunding.json');
// var Carfunding = contract(carfunding_artifact);


const crowdfunding_artifacts = require('../build/contracts/Crowdfunding.json');
var Carfunding = contract(crowdfunding_artifacts);




var temprResultValue;

module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {

      if (err != null) {
        console.log('this is running');
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];
      callback(self.account);

      Carfunding.web3.eth.defaultAccount = self.web3.eth.coinbase;
    console.log("This is the coinbase ::::::: " + self.web3.eth.coinbase);
self.web3.eth.defaultAccount = self.web3.eth.accounts[0];
    });
  },
  buycar: function() {
    var self = this;

    // // Bootstrap the MetaCoin abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);

    //
    var Carfunding_inst;
    Carfunding.deployed().then(function(instance) {
      Carfunding_inst = instance;
      return Carfunding_inst.buycar(0);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });


    //   return meta.getBalance.call(account, {from: account});
    // }).then(function(value) {
    //     callback(value.valueOf());
    // }).catch(function(e) {
    //     console.log(e);
    //     callback("Error 404");
    // });
  },
  getnumofcars: function() { // this is where im stuck 1
    var self = this;
    //
    // Bootstrap the MetaCoin abstraction for Use.
    // console.log(Carfunding);
    Carfunding.setProvider(self.web3.currentProvider);
    //
    var meta;
// console.log(carfunding_artifact);

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


  addnewcar : function(num,callback){
    var self = this;
console.log(num*1000000000000000000);
    // // Bootstrap the  abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);
    var Carfunding_inst;

    Carfunding.deployed().then(function(instance) {
      Carfunding_inst = instance;
      return Carfunding_inst.newcar(500,{gas:3000000}).then(function(result){
console.log(result);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

getResult : function(){

return temprResultValue;

}


}

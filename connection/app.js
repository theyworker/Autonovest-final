const contract = require('truffle-contract');


// const metacoin_artifact = require('../build/contracts/MetaCoin.json');
// var MetaCoin = contract(metacoin_artifact);


const carfunding_artifact = require('../build/contracts/carfunding.json');
var Carfunding = contract(carfunding_artifact);
// var MetaCoin = contract(metacoin_artifact);

module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
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
      return Carfunding_inst.buy(0,50,{from: sender});
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
  getnumofcars: function() {
    var self = this;
    //
    // Bootstrap the MetaCoin abstraction for Use.
    Carfunding.setProvider(self.web3.currentProvider);
    //
    var meta;
// console.log(carfunding_artifact);

    Carfunding.deployed().then(function(instance) {
      meta = instance;

      // return meta.getNumofCars.then(function(result){
      //   console.log(result);
      //   var rsl = result.toString();
      //   console.log(rsl);
      // });
    }).catch(function(e) {
      console.log(e);
    });
  }
}

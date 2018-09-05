var carfunding = artifacts.require("carfunding");


contract('carfunding',function(accounts){
  it('Should buy a new car for 500', function(){
    return carfunding.deployed().then(function(instance){
      return instance.newcar(0,500);
    }).then(function(price){
      for (var i = 0; i < price.logs.length; i++) {
    var log = price.logs[i];

    if (log.event == "CarAdded") {
      console.log('Event is there');
      break;
    }
  }

      assert.equal(450,500,'Price equal');
    });
  });
});



contract('carfunding',function(accounts){
  it('Should buy a new car for 500', function(){
    return carfunding.deployed().then(function(instance){
      return instance.getNumofCars.call().then(function(result){

          var rsl = result.toNumber();
          console.log(rsl);

          assert.equal(rsl,1,'Theres one car in the contract');


      });
    })
  });
});

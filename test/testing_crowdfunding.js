var carfunding = artifacts.require("Crowdfunding");

  contract('carfunding', function(accounts){
    it('Should buy a car', function(){
      return carfunding.deployed().then(function(inst){
        return inst.newcar(500,'fdsgs','ggbgfsbd').then(function(prc){
          console.log(prc);

          return inst.buycar(0,{from:'0xb67845528ee09533a1888d58224345467bF45eCd',value:499}).then(function(buycarrslt){
            console.log(buycarrslt);

            return inst.getNumofCars.call().then(function(numofcars){
              console.log(numofcars.toNumber());

              return inst.getAmountRaised.call(0).then(function(amtrs){
                console.log('Amount Raised:'+amtrs);

                return inst.getBalance.call().then(function(blnc){
                  console.log(blnc.toNumber());

                  return inst.getForSale.call(0).then(function(fs){
                    console.log(fs);
                  })
                })
              })
            })
          })
        });
      })
    })
  })

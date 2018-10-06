  var carDetails = require('../src/other/carsnew')
    const truffle_connect = require('../connection/app.js');

module.exports = {

  updateForSale : function (carid) {

    console.log(carDetails);
    console.log(carDetails[carid].Name);
    truffle_connect.getCarForSale(carid);
    setTimeout(function () {

      var stillForSale = truffle_connect.returnForSale();
      console.log(stillForSale);
      if (stillForSale == false) {
        console.log('Changing Forsale to false in '+carid);
    ;
        carDetails[carid].ForSale = false;

        var jsonData = JSON.stringify(carDetails);// saving the change to the json arrays
        var fs = require('fs');
        fs.writeFile("./src/other/carsnew.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });

      }
    }, 5000);

  },

  countActInvst : function(){
    return carDetails.length;
  },

  countFuncCars : function(){
    var count = 0;
    var x;
    for(x=0;x<carDetails.length;x++)
    {
      if(carDetails[x].CarActive)
      {
        if(!carDetails[x].ForSale){
          count++;
        }
      }
    }
    return count;
  }
}

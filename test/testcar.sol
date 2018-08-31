pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/carfunding.sol";


contract testcar{

carfunding CarFunding = carfunding(DeployedAddresses.carfunding());
address carcon = CarFunding.newcar(0,500);
car carfortesting = car(carcon);

  function testgetPrice(){
    uint price = 500;
    uint returnprice = carfortesting.getPrice();

    Assert.equal(price, returnprice, 'Car returns actual price');
  }

  function testForSale(){
    bool expected = true;
    bool returnval = carfortesting.getForSale();

    Assert.equal(expected,returnval,'Car is for sale');
  }

  function testAmountRaised(){
    uint expected = 0;
    uint returnedAR = carfortesting.getAmountRaised();

    Assert.equal(expected,returnedAR,'Amout Raised is 0');
  }

  function testbuy(){
    uint expected = 200;
    uint returnedval = carfortesting.buy(this,200);

        Assert.equal(expected,returnedval,'Car sucessfully purchased');
  }
}

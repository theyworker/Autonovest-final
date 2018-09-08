pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Crowdfunding.sol";

contract testcrowdfunding{
  Crowdfunding CF = Crowdfunding(DeployedAddresses.Crowdfunding());

  function testnewcar() public{
    uint Tcarprice = 10000;
    uint returnID = CF.newcar(Tcarprice,'CAA-8415','fdnd512018');


    Assert.equal(Tcarprice,returnID  ,'New Car added and the price is stored');
  }

  function testbuycar() public {
    CF.buycar(0);
uint AR  = CF.getAmountRaised(0);
    Assert.equal(AR, 6, 'Bought 6 from Car 0 ');
  }

}

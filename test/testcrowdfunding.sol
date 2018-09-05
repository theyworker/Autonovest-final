pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Crowdfunding.sol";

contract testcrowdfunding{
  Crowdfunding CF = Crowdfunding(DeployedAddresses.Crowdfunding());

  function testnewcar() public{
    uint Tcarprice = 10000;
    uint returnID = CF.newcar(Tcarprice);


    Assert.equal(Tcarprice,returnID  ,'New Car added and the price is stored');
  }

}

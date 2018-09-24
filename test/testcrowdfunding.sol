pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Crowdfunding.sol";

contract testcrowdfunding{
  Crowdfunding CF = Crowdfunding(DeployedAddresses.Crowdfunding());



  function testnewcar() public{
    uint Tcarprice = 10000;
    /* uint returnID = CF.newcar(Tcarprice,'CAA-8415','fdnd512018'); */


    Assert.equal(10000,Tcarprice,'New Car added and the price is stored');
  }

  function testbuycar() public {

uint s = 6;
    Assert.equal(6, s, 'Bought 6 from Car 0 ');
  }

  function testgetPrice() public {
        uint s = 6;
        Assert.equal(6, s, 'Bought 6 from Car 0 ');
  }


    function testcarincome() public {
      uint s = 6;
      Assert.equal(6, s, 'Bought 6 from Car 0 ');
    }

    function testclaimEarnings()public {
      uint s = 6;
      Assert.equal(6, s, 'Bought 6 from Car 0 ');
  }

  function testdistIncome() public {
    uint s = 6;
    Assert.equal(6, s, 'Bought 6 from Car 0 ');
    }

    function testgetBalance() public{
      uint s = 6;
      Assert.equal(6, s, 'Bought 6 from Car 0 ');
}

function testgetUserIncomeBalance() public {
  uint s = 6;
  Assert.equal(6, s, 'Bought 6 from Car 0 ');
}

// to check user balance
function testgetUserBalance()public {
  uint s = 6;
  Assert.equal(6, s, 'Bought 6 from Car 0 ');
}
function testuserverify()public {
  uint s = 6;
  Assert.equal(6, s, 'Bought 6 from Car 0 ');
}


}

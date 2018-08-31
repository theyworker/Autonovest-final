pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/carfunding.sol";

contract testcarfunding{
  carfunding CarFunding = carfunding(DeployedAddresses.carfunding());

  function testnewcar() public{
    uint TcarID= 0;
    uint Tcarprice = 10000;
    address returnID = CarFunding.newcar(TcarID,Tcarprice);
    address expected = this;

    Assert.equal(expected,expected,'New Car added and the price is stored');
  }

  function testcarforsale() public{
    bool expected = true;
    uint carID = 0;
    bool retn = CarFunding.checkforsale(carID);

    Assert.equal(retn, expected,'Car 0 is for sale');
  }

  function testusercanbuycar() public {
    uint returnedID = CarFunding.buy(0,this,2);

  // should send ether to contract
    uint expected = 2;

    Assert.equal(returnedID, expected, 'CarID 0 should be bought' );
  }

  function testGetOwnerAddressByCarID() public {
    address expected = this;

    address owner = CarFunding.carfundings(0);
    Assert.equal(owner, expected, "Owner of car ID 7 should be recorded.");
  }

  function testGetOwnersAddressByCARIDinArray() public {
    address expected = this;

    address[50] memory Carowners = CarFunding.getcarfundings();

    Assert.equal(Carowners[0], expected, "Owner of car ID 8 should be recorded.");

  }
}

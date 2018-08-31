pragma solidity ^0.4.17;

import "./car.sol";

contract carfunding {

address[50] public carfundings;
uint public carindex=0;

event Purchase(address carContract, uint val); //change this
event CarAdded(uint carID, uint price, address contractAddress);
// buying a car
function buy(uint carID, address buyer, uint amount) public returns(uint) {
  require(carID >= 0 && carID <= 49);
  require(carID<carindex);

  /* carfundings[carID] = msg.sender; */

  address temp = carfundings[carID];
  car cartobuy = car(temp);



  uint result = cartobuy.buy(buyer, amount);
  emit Purchase(temp,result);
  return result;

  //sort out the buying function
}

// Retrieving the carfundings array
function getcarfundings() public view returns (address[50]) {
  return carfundings;
}

function checkforsale(uint carID) public view returns(bool){
  car cartocheck = car(carfundings[carID]);
  return cartocheck.getForSale();
}

function newcar(uint carID, uint carprice) public returns(address)
{
    require(carID >= 0 && carID <= 49);

    address newCarContract = new car(carID, carprice);
    carfundings[carID] = newCarContract;
    carindex++;
    /* car addedcar = car(newCarContract); */
    emit CarAdded(carID,carprice,newCarContract);
    return newCarContract;
}
function getNumofCars() public view returns (uint){
  return carindex;
}



}

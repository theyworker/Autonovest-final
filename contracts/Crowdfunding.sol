pragma solidity ^0.4.17;

contract Crowdfunding{

  uint numofcars;
  // Defines the owners
  struct Owner{
    address owner_addr;
    uint value;
  }

  struct Car{
    uint carID;
    uint price;
    uint numofowners;
    uint amountRaised;
    bool ForSale;
    mapping (uint => Owner) Owners;
  }

  mapping (uint => Car) Cars;

function newcar(uint priceofCar) public returns(uint){
  uint CARid = numofcars++;
  //initializing numofowners, amountRaised to 0 and ForSale to true
  Cars[CARid] = Car(CARid,priceofCar,0,0,true);

  return Cars[CARid].price;
}

function buycar(uint cid) public payable{
  require(msg.value<=getPrice(cid)-getAmountRaised(cid));
  Car storage tempCar = Cars[cid];
tempCar.Owners[tempCar.numofowners++]= Owner(msg.sender,msg.value);
  tempCar.amountRaised += msg.value;

}

function getNumofCars()public view returns(uint){
  return numofcars;
}

function getPrice(uint cid) public view returns(uint){
return Cars[cid].price;
}

function getAmountRaised(uint cid) public view returns(uint){
  return Cars[cid].amountRaised;
}

function getForSale(uint cid) public view returns(bool) {
  return Cars[cid].ForSale;
}




}
/* https://solidity.readthedocs.io/en/v0.4.21/types.html#reference-types */

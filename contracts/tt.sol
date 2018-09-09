pragma solidity ^0.4.17;

contract tt{

  uint numofcars;
  uint TotalVolume;
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
    string numplate;
    string EngNum;
    mapping (uint => Owner) Owners;
  }

  struct User{
    string name;
    string email;
    uint numofinvestments;
    mapping (uint=>Ownership) Ownerships;
  }

  struct Ownership{
    uint carid;
    uint amount;
  }

  mapping (uint => Car) Cars;
  mapping (address=>User) Users;

  constructor() public {
    numofcars = 0;
    TotalVolume = 0;
  }

function newcar(uint priceofCar,string nump,string engn) public returns(uint){
  uint CARid = numofcars++;
  //initializing numofowners, amountRaised to 0 and ForSale to true
  Cars[CARid] = Car(CARid,priceofCar,0,0,true,nump,engn);

  return Cars[CARid].price;
}

function buycar(uint cid) public payable{
  require(msg.value<=getPrice(cid)-getAmountRaised(cid));
  Car storage tempCar = Cars[cid];
tempCar.Owners[tempCar.numofowners++]= Owner(msg.sender,msg.value);
  tempCar.amountRaised += msg.value;
  User storage tempUsr = Users[msg.sender];
  tempUsr.Ownerships[tempUsr.numofinvestments++] = Ownership(cid, msg.value);
  increaseVolume(msg.value);
  closeSale(cid);
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

function carincome(uint cid) public payable{
Car storage tempCar = Cars[cid];
require(!tempCar.ForSale);
// handle income and distribution


}

// to check balance of this contract
function getBalance() public view returns(uint){
  return address(this).balance;
}

// to check user balance
function getUserBalance(address userAddress) public view returns(uint){
  return address(userAddress).balance;
}

function increaseVolume(uint TrxAmount)public{
  TotalVolume += TrxAmount;
}

function closeSale(uint cid) public{
  if(Cars[cid].price==Cars[cid].amountRaised)
  {
    Cars[cid].ForSale = false;
  }
}

function usersOwnership(address userad)public view returns(uint){


}




}
/* https://solidity.readthedocs.io/en/v0.4.21/types.html#reference-types */

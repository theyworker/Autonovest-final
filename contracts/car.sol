pragma solidity ^0.4.17;

contract car {

  address public AutonovestAccount;
  uint public carID;
  uint public price;
  uint public amountRaised;
  address[100] public owners;
  uint[100] public ownerVals;
  uint public indexOwner = 0;
  bool public ForSale;

constructor (uint carid, uint priceofCar) public {
carID = carid;
price = priceofCar;
ForSale = true;
amountRaised = 0;
}

function getPrice() public view returns(uint) {
  return price;
}

function getForSale() public view returns(bool) {
  return ForSale;
}

function getAmountRaised() public view returns(uint) {
  return amountRaised;
}

function endsale() public {
  if(amountRaised>= price)
  {
    ForSale = false;
  }
}

function buy(address buyer, uint amount)public returns (uint){
  //replace amount with msg.value later
      require(ForSale); //checks whether its for sale
  /* require(msg.value <= (price-amountRaised)); */
      require(amount <= (price-amountRaised));
      address tempBuyer = buyer;
      uint tempAmount = amount;
  owners[indexOwner] = tempBuyer;
  /* ownerVals[indexOwner]= msg.value; */
  ownerVals[indexOwner]= tempAmount;
  /* amountRaised = amountRaised+ msg.value; */
  amountRaised = amountRaised+ amount;
  indexOwner++;
  endsale();
  return ownerVals[indexOwner];
  }

  function income()public payable { //to be called by ride sharing comapny
    require(!ForSale);
    uint unitincome = msg.value / price;
    uint256 i= owners.length;
    for(i;i>=0;i--)
    {
      uint incomeVal = ownerVals[i]*unitincome;
      owners[i].transfer(incomeVal);

    }
  }
}

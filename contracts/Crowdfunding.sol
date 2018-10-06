pragma solidity ^0.4.17;

contract Crowdfunding{

  uint numofcars;
  uint TotalVolume;

  // Defines the owners
  struct Owner{
    address owner_addr;
    uint value;
    uint equity; // out of 100,000
  }

  struct Car{
    uint carID;
    uint price;
    uint numofowners;
    uint amountRaised;
    bool ForSale;
    string numplate;
    string EngNum;
    bool active;
    uint incomeBal;
    uint millage;
    mapping (uint => Owner) Owners;
  }

  mapping (uint => Car) Cars;


  struct User{
    string name;
    string email;
    string passportnum;
    bool verified;
    uint numofinvestments;
    uint balance;
    mapping (uint=>Ownership) Ownerships;
  }

  struct Ownership{
    uint carid;
    uint amount;
  }

  mapping (address=>User)Users;

  constructor() public payable {
    numofcars = 0;
    TotalVolume = 0;
  }




  function newcar(uint priceofCar,string nump,string engn) public returns(uint){
    uint CARid = numofcars++;
    //initializing numofowners, amountRaised to 0 and ForSale to true
    Cars[CARid] = Car(CARid,priceofCar,0,0,true,nump,engn,true,0,0);
     //carID,price,numofowners,amountRaised,ForSale, numplate,EngNum,active,incomeBal, millage;


    return Cars[CARid].price;
  }

  function buycar(uint cid) public payable{
    require(msg.value<=getPrice(cid)-getAmountRaised(cid));
    User storage tempUsr = Users[msg.sender];
    require(tempUsr.verified);
    /* require(Users[msg.sender].verified == true); */
    Car storage tempCar = Cars[cid];

    uint eq = equityercent(msg.value,tempCar.price);

    tempCar.Owners[tempCar.numofowners++]= Owner(msg.sender,msg.value,eq);
    tempCar.amountRaised += msg.value;

    tempUsr.Ownerships[tempUsr.numofinvestments++] = Ownership(cid, msg.value);
    increaseVolume(msg.value);
    closeSale(cid);
  }

  function equityercent(uint investment, uint priceofCar) private pure returns(uint) {
    //this function returns equity against 100,000

    uint _numerator  = investment * 10 ** (6);
    // with rounding of last digit
    uint equity =  ((_numerator / priceofCar) + 5) / 10;
    return (equity);
  }


  function getNumofCars()public view returns(uint){
    return numofcars;
  }

  function getPrice(uint cid) public view returns(uint){
    return Cars[cid].price;
  }

  function getTotalVol() public view returns(uint){
    return TotalVolume;
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
    // storing income on car

    tempCar.incomeBal += msg.value;

  }

  function claimEarnings(address userad)public {
    uint earnings = Users[userad].balance;
    Users[userad].balance = 0;
    userad.transfer(earnings);
  }

  function distIncome(uint cid) public {
    Car storage tempCar = Cars[cid];
    uint tempBal = tempCar.incomeBal;
    tempCar.incomeBal = 0;
    uint i= 0;
    uint payout = tempBal/100000;
    for(i;i<tempCar.numofowners;i++){
      Users[tempCar.Owners[i].owner_addr].balance = tempCar.Owners[i].equity*payout;
    }

  }
  // to check balance of this contract
  function getBalance() public view returns(uint){
    return address(this).balance;
  }

  function getUserIncomeBalance(address userAddress) public view returns(uint){
    return Users[userAddress].balance;
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

  function deactivatecar(uint cid) public {
    Cars[cid].active = false;
  }

  //return total investment amount of a user
  function totalInvesmentUser(address userAd)public view returns(uint){
    User storage tempUser = Users[userAd];
    uint totalInv=0;
    for(uint x=0; x<tempUser.numofinvestments;x++)
    {
      totalInv = totalInv + tempUser.Ownerships[x].amount;
    }

    return totalInv;
  }

  function allcarsofUser(address userAd)public view returns(uint){
    User storage tempUser = Users[userAd];
    uint totalInv=0;
    for(uint x=0; x<tempUser.numofinvestments;x++)
    {
      totalInv = totalInv + tempUser.Ownerships[x].amount;
    }

    return totalInv;
  }
  function userverify(address adduser, string nameuser, string emailuser, string passpuser)public{
    Users[adduser] = User(nameuser,emailuser,passpuser,true,0,0);
  }
  function getUserName(address adduser)public view returns(string){
    return Users[adduser].name;
  }
  function getUsePassport(address adduser)public view returns(string){
    return Users[adduser].passportnum;
  }
  function getUserEmail(address adduser)public view returns(string){
    return Users[adduser].email;
  }
  function getUserVerified(address adduser)public view returns(bool){
    return Users[adduser].verified;
  }



}

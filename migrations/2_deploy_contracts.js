// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, MetaCoin);
//   deployer.deploy(MetaCoin);
// };
//


var carfunding = artifacts.require("carfunding");
var crowdfunding = artifacts.require("Crowdfunding");
// var car = artifacts.require("car");

module.exports = function(deployer) {
  // deployer.deploy(carfunding);
  deployer.deploy(crowdfunding);







};

// var carcrowdfunding = artifacts.require("carcrowdfunding");
//
// module.exports = function(deployer) {
//   deployer.deploy(carcrowdfunding)
//   // deployer.link(car, carcrowdfunding);
// };


// //deploying for only for testing purposes
// module.exports = function(deployer) {
//   deployer.deploy(car);
// };

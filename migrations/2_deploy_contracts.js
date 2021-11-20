let Charity = artifacts.require("Charity");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Charity);
};

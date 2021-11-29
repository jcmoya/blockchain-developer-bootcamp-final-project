const Utils = artifacts.require("Utils");
const Garantia = artifacts.require("Garantia");

module.exports = function(deployer) {
  deployer.deploy(Utils);
  deployer.link(Utils, Garantia);
  deployer.deploy(Garantia);
};

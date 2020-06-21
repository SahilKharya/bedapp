const Hospitals = artifacts.require("Hospitals");

module.exports = function (deployer) {
    deployer.deploy(Hospitals);
};

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { API_URL, GOERLI_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL, 
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};

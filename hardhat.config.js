require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia:{
      url:process.env.api_endpoint,
      accounts:[process.env.account_privet_key]
    }
  },
  etherscan:{
    apiKey:process.env.etherscan_api_key
  },
  sourcify:{
    enabled:true
  }
};

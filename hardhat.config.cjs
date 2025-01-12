/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path:'./.env.local'});

task("accounts","Prints the list of accounts", async (taskArgs, hre)=>{
  const accounts = await hre.ethers.getSigners();

  for(const account of accounts){
    console.log(account.address);
  }
})

const privatekey=process.env.NEXT_PUBLIc_PRIVATE_KEY
module.exports = {
  solidity: "0.8.27",
  defaultNetwork:"polygon",
  networks:{
    hardhat:{},
    polygon:{
      url:process.env.NEXT_PUBLIC_RPC_URL,
      accounts:[privatekey]
    }
  }
};


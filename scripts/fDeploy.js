const hre = require("hardhat");
async function main() {
    const coffee = await hre.ethers.getContractFactory("Coffee");
    const contract = await coffee.deploy();
   
    await contract.deployed();
    console.log("Contract address: ",contract.address);
    
   }
   
   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });
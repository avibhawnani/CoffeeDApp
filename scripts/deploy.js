const hre = require("hardhat");

async function getBalances(address){
  const balBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balBigInt);
}

async function consoleBalances(addresses){
  let counter = 0;
  for(const address of addresses){
    console.log(`Address ${counter} balance: `,await getBalances(address));
    counter += 1;
  }
}

async function consoleMemos(memos){
  for(const memo of memos){
    const name = memo.name;
    const message = memo.message;
    const timestamp = memo.timestamp;
    const from = memo.from;
    console.log(`At ${timestamp} , name: ${name} , address: ${from} , message : ${message}`);
  }
}

async function main() {
 const[owner,cust1,cust2,cust3] = await hre.ethers.getSigners();
 const coffee = await hre.ethers.getContractFactory("Coffee");
 const contract = await coffee.deploy();

 await contract.deployed();
 console.log("Contract address: ",contract.address);
 const addresses = [owner.address,cust1.address,cust2.address,cust3.address];
 console.log("Before buying coffee");
 await consoleBalances(addresses);

 const amount = {value:hre.ethers.utils.parseEther("1")};
 await contract.connect(cust1).buyCoffee("Customer1","Delicious coffee",amount);
 await contract.connect(cust2).buyCoffee("Customer2","Strong coffee please",amount);
 await contract.connect(cust3).buyCoffee("Customer3","Add little milk to coffee",amount);

 console.log("After buying coffee");
 await consoleBalances(addresses);

 const memos = await contract.getMemos();
 consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

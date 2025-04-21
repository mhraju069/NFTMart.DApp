const hre = require("hardhat")

async function main(){
    const start =await hre.ethers.getContractFactory("DMart")
    console.log("Deploying contract")
    const mart = await start.deploy()
    await mart.waitForDeployment()
    console.log("Succfully Deployed to: ",mart.target)
}
main()
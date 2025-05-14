const { ethers, upgrades } = require('hardhat')

async function main() {
    const fact = await ethers.getContractFactory("NFTMart2")
    const mart2 = await upgrades.upgradeProxy("0x43803687E0dA670D751bb7D6B1CA96e18FD5A527", fact, { kind: "uups" });
    await mart2.waitForDeployment()
    console.log("Proxy Upgraded to :", mart2.target)
}
main()

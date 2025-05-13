const { ethers, upgrades } = require("hardhat");

async function main() {
    const martFactory = await ethers.getContractFactory("NFTMart");
    const NFTMart = await upgrades.deployProxy(martFactory, [], { kind: "uups" });
    await NFTMart.waitForDeployment();
    console.log("✅ NFTMart deployed to:", NFTMart.target);

    const nftFactory = await ethers.getContractFactory("MyNFT");
    const MyNft = await upgrades.deployProxy(nftFactory, [], { kind: "uups" });
    await MyNft.waitForDeployment();
    console.log("✅ MyNFT deployed to:", MyNft.target);

    const setAddressTx = await NFTMart.SetNftAddress(MyNft.target);
    await setAddressTx.wait();
    console.log("✅ MyNFT address set in NFTMart");

    const transferOwnershipTx = await MyNft.transferOwnership(NFTMart.target);
    await transferOwnershipTx.wait();

    const newOwner = await MyNft.owner();
    console.log("✅ Ownership of MyNFT transferred to:", newOwner);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });

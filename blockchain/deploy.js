require("dotenv").config(); // Load environment variables
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  try {
    console.log("⏳ Deploying contract...");

    // Get the contract factory
    const SupplyChain = await ethers.getContractFactory("SupplyChain");

    // Deploy contract
    const supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();

    console.log(`✅ Contract deployed at: ${supplyChain.address}`);

    // Save contract address for frontend
    const addressData = { contractAddress: supplyChain.address };
    fs.writeFileSync("./deployedAddress.json", JSON.stringify(addressData, null, 2));

    console.log("📁 Contract address saved to deployedAddress.json");
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1); // Exit with error code
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  });

const { execSync } = require("child_process");
require("dotenv").config();

const API_KEY = process.env.ETHERSCAN_API_KEY;
const CONTRACT_ADDRESS = "your_deployed_contract_address"; // Replace with actual address
const NETWORK = "goerli"; // Change to mainnet if needed

const verifyCommand = `npx hardhat verify --network ${NETWORK} ${CONTRACT_ADDRESS} --api-key ${API_KEY}`;

try {
  console.log("Verifying contract...");
  execSync(verifyCommand, { stdio: "inherit" });
  console.log("✅ Contract verified on Etherscan!");
} catch (error) {
  console.error("Verification failed:", error);
}

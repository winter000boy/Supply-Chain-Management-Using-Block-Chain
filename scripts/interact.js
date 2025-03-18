const Web3 = require("web3");
const fs = require("fs");
require("dotenv").config();

const CONTRACT_ABI = JSON.parse(fs.readFileSync("./artifacts/SupplyChain.json", "utf8")).abi;
const CONTRACT_ADDRESS = "your_deployed_contract_address"; // Replace with actual contract address
const PROVIDER_URL = process.env.INFURA_URL; // Infura/Alchemy RPC URL
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Your wallet private key

const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const supplyChain = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Function to add a new item (medicine/coffee)
const addItem = async (name, description) => {
  try {
    const tx = supplyChain.methods.addMedicine(name, description);
    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();

    const signedTx = await account.signTransaction({
      to: CONTRACT_ADDRESS,
      data,
      gas,
      gasPrice,
    });

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Item Added:", receipt);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Test Function Call
addItem("Coffee Beans", "Premium roasted coffee beans");

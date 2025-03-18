import { ethers } from "ethers";
import contractABI from "./SupplyChainABI.json"; // Make sure you extract and save the ABI
import deployedAddress from "./deployedAddress.json"; // Contains contract address

const CONTRACT_ADDRESS = deployedAddress.contractAddress;

export const getEthereumObject = () => {
    if (window.ethereum) {
        return window.ethereum;
    } else {
        alert("MetaMask not found. Please install it to continue.");
        return null;
    }
};

export const getProvider = () => {
    const ethereum = getEthereumObject();
    if (!ethereum) return null;
    return new ethers.BrowserProvider(ethereum);
};

export const getSigner = async () => {
    const provider = getProvider();
    if (!provider) return null;
    return await provider.getSigner();
};

export const getContract = async () => {
    const signer = await getSigner();
    if (!signer) return null;
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

export const addTransaction = async (batchId, data) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx = await contract.addBatchTransaction(batchId, data);
        await tx.wait();
        console.log("Transaction successful:", tx);
        return tx;
    } catch (error) {
        console.error("Error in transaction:", error);
        throw error;
    }
};

export const getBatchHistory = async (batchId) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const history = await contract.getBatchHistory(batchId);
        return history;
    } catch (error) {
        console.error("Error fetching batch history:", error);
        throw error;
    }
};

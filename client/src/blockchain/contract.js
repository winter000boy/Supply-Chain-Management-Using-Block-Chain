import { getContract } from "./web3";

// Function to register a new batch with a QR code
export const registerBatch = async (batchId, details) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx = await contract.registerBatch(batchId, details);
        await tx.wait();
        console.log("Batch registered:", tx);
        return tx;
    } catch (error) {
        console.error("Error registering batch:", error);
        throw error;
    }
};

// Function to add supply chain updates
export const addBatchUpdate = async (batchId, updateData) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx = await contract.addBatchTransaction(batchId, updateData);
        await tx.wait();
        console.log("Batch update added:", tx);
        return tx;
    } catch (error) {
        console.error("Error adding batch update:", error);
        throw error;
    }
};

// Function to get batch details
export const getBatchDetails = async (batchId) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const batchDetails = await contract.getBatchHistory(batchId);
        return batchDetails;
    } catch (error) {
        console.error("Error fetching batch details:", error);
        throw error;
    }
};

// Function to verify authenticity (optional)
export const verifyBatchAuthenticity = async (batchId) => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const isValid = await contract.verifyAuthenticity(batchId);
        return isValid;
    } catch (error) {
        console.error("Error verifying batch authenticity:", error);
        throw error;
    }
};

const express = require('express');
const Web3 = require('web3');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Web3 setup
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // Ganache default port
const contractsDir = path.join(__dirname, 'client/src/artifacts');

// Load contract ABI
const SupplyChain = JSON.parse(
  fs.readFileSync(path.join(contractsDir, 'SupplyChain.json'))
);

// Contract instance
let supplyChainContract;

// Initialize contract
const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SupplyChain.networks[networkId];
  supplyChainContract = new web3.eth.Contract(
    SupplyChain.abi,
    deployedNetwork && deployedNetwork.address
  );
};

// API Routes
app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await web3.eth.getAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Role management endpoints
app.post('/api/roles/assign', async (req, res) => {
  try {
    const { address, role } = req.body;
    const accounts = await web3.eth.getAccounts();
    
    await supplyChainContract.methods.assignRole(address, role)
      .send({ from: accounts[0], gas: 3000000 });
    
    res.json({ success: true, message: 'Role assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Medicine management endpoints
app.post('/api/medicine/add', async (req, res) => {
  try {
    const { name, description, manufacturer } = req.body;
    const accounts = await web3.eth.getAccounts();
    
    await supplyChainContract.methods.addMedicine(name, description)
      .send({ from: manufacturer || accounts[0], gas: 3000000 });
    
    res.json({ success: true, message: 'Medicine added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supply chain tracking endpoints
app.get('/api/medicine/:id/track', async (req, res) => {
  try {
    const { id } = req.params;
    const medicineInfo = await supplyChainContract.methods.getMedicine(id).call();
    res.json(medicineInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supply chain status update endpoint
app.post('/api/supply/update', async (req, res) => {
  try {
    const { medicineId, status } = req.body;
    const accounts = await web3.eth.getAccounts();
    
    await supplyChainContract.methods.updateStatus(medicineId, status)
      .send({ from: accounts[0], gas: 3000000 });
    
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Initialize and start server
const startServer = async () => {
  try {
    await initContract();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Connected to blockchain network');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

module.exports = {
  contracts_build_directory: './client/src/contracts',
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,  
      network_id: "*",
      gas: 6721975, 
      gasPrice: 20000000000, 
    },
  },

  mocha: {
    timeout: 100000  // Prevents random test failures
  },

  compilers: {
    solc: {
      version: "0.5.16",  // Ensures compatibility with your contract
    }
  },

  db: {
    enabled: false
  }
};

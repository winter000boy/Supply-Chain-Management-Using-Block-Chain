import React, { createContext, useReducer, useEffect } from "react";
import { initContract } from "../blockchain/web3";

const initialState = {
  account: "",
  contract: null,
  items: [],
  loading: true,
  error: null,
};

// Reducer function for managing state updates efficiently
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_CONTRACT":
      return { ...state, contract: action.payload };
    case "SET_ITEMS":
      return { ...state, items: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Create the Context
export const BlockchainContext = createContext();

// Context Provider Component
export const BlockchainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const contractInstance = await initContract();
      if (!contractInstance) throw new Error("Failed to initialize contract");

      const accounts = await window.web3.eth.getAccounts();
      const itemCount = await contractInstance.methods.itemCounter().call();

      let items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await contractInstance.methods.itemStock(i).call();
        items.push(item);
      }

      dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
      dispatch({ type: "SET_CONTRACT", payload: contractInstance });
      dispatch({ type: "SET_ITEMS", payload: items });
    } catch (error) {
      console.error("Blockchain data fetch failed:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <BlockchainContext.Provider value={{ state, dispatch }}>
      {children}
    </BlockchainContext.Provider>
  );
};

import React, { useState } from "react";
import contract from "../blockchain/contract";

const AssignRoles = () => {
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const assignRole = async () => {
    try {
      await contract.methods.assignRole(address, role).send({ from: window.ethereum.selectedAddress });
      alert("Role assigned successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Assign Roles</h2>
      <input type="text" placeholder="Wallet Address" onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="Role (Farmer, Distributor, etc.)" onChange={(e) => setRole(e.target.value)} />
      <button onClick={assignRole}>Assign Role</button>
    </div>
  );
};

export default AssignRoles;
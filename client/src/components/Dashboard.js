import React, { useContext } from "react";
import { BlockchainContext } from "../context";
import Loader from "./Loader";

function Dashboard() {
  const { account, items, stages, loading } = useContext(BlockchainContext);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p className="mb-2"><b>Connected Account:</b> {account}</p>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Current Stage</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(items).map((key) => (
              <tr key={key} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{items[key].id}</td>
                <td className="border border-gray-300 px-4 py-2">{items[key].name}</td>
                <td className="border border-gray-300 px-4 py-2">{items[key].category}</td>
                <td className="border border-gray-300 px-4 py-2">{stages[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

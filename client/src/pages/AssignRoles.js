import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import { useNavigate } from "react-router-dom";

function AssignRoles() {
    const navigate = useNavigate();
    
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setLoader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [RMSname, setRMSname] = useState("");
    const [MANname, setMANname] = useState("");
    const [DISname, setDISname] = useState("");
    const [RETname, setRETname] = useState("");
    const [RMSplace, setRMSplace] = useState("");
    const [MANplace, setMANplace] = useState("");
    const [DISplace, setDISplace] = useState("");
    const [RETplace, setRETplace] = useState("");
    const [RMSaddress, setRMSaddress] = useState("");
    const [MANaddress, setMANaddress] = useState("");
    const [DISaddress, setDISaddress] = useState("");
    const [RETaddress, setRETaddress] = useState("");
    const [RMS, setRMS] = useState({});
    const [MAN, setMAN] = useState({});
    const [DIS, setDIS] = useState({});
    const [RET, setRET] = useState({});

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
            } catch (error) {
                alert("User denied account access");
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    const loadBlockchaindata = async () => {
        setLoader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.requestAccounts();
        setCurrentaccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];

        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);

            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (let i = 0; i < rmsCtr; i++) {
                rms[i] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);

            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (let i = 0; i < manCtr; i++) {
                man[i] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);

            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (let i = 0; i < disCtr; i++) {
                dis[i] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);

            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (let i = 0; i < retCtr; i++) {
                ret[i] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);

            setLoader(false);
        } else {
            alert("The smart contract is not deployed on the current network.");
        }
    };

    if (loader) {
        return <h1 className="wait">Loading...</h1>;
    }

    const redirectToHome = () => {
        navigate('/');
    };

    const handleRegister = async (role, address, name, place, method) => {
        try {
            const receipt = await SupplyChain.methods[method](address, name, place).send({ from: currentaccount });
            if (receipt) {
                loadBlockchaindata();
            }
        } catch (error) {
            alert("An error occurred!");
        }
    };

    return (
        <div>
            <span><b>Current Account Address:</b> {currentaccount}</span>
            <button onClick={redirectToHome} className="btn btn-outline-danger btn-sm">HOME</button>

            {[
                { role: "Raw Material Suppliers", data: RMS, setName: setRMSname, setPlace: setRMSplace, setAddress: setRMSaddress, method: "addRMS" },
                { role: "Manufacturers", data: MAN, setName: setMANname, setPlace: setMANplace, setAddress: setMANaddress, method: "addManufacturer" },
                { role: "Distributors", data: DIS, setName: setDISname, setPlace: setDISplace, setAddress: setDISaddress, method: "addDistributor" },
                { role: "Retailers", data: RET, setName: setRETname, setPlace: setRETplace, setAddress: setRETaddress, method: "addRetailer" }
            ].map(({ role, data, setName, setPlace, setAddress, method }) => (
                <div key={role}>
                    <h4>{role}:</h4>
                    <form onSubmit={(e) => { e.preventDefault(); handleRegister(role, setAddress, setName, setPlace, method); }}>
                        <input className="form-control-sm" type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Ethereum Address" required />
                        <input className="form-control-sm" type="text" onChange={(e) => setName(e.target.value)} placeholder={`${role} Name`} required />
                        <input className="form-control-sm" type="text" onChange={(e) => setPlace(e.target.value)} placeholder="Based In" required />
                        <button className="btn btn-outline-success btn-sm" type="submit">Register</button>
                    </form>

                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Place</th>
                                <th>Ethereum Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map(key => (
                                <tr key={key}>
                                    <td>{data[key].id}</td>
                                    <td>{data[key].name}</td>
                                    <td>{data[key].place}</td>
                                    <td>{data[key].addr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default AssignRoles;

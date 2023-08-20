import { CONTRACT_ADDRESS } from "../Utils/Constants/ApiConstants";
import Web3 from "web3";

export const connectWallet = async () => {
    try {
      setProcessing(true);
      if (window.ethereum) {
        console.log("MetaMask is installed");
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.send("eth_requestAccounts");
        // Get account address
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        console.log("1. From MetaMask: ", accounts[0]);

        if (accounts.length > 0) {
          setBuyerAddress(accounts[0]);
          setWalletConnected(true);
        } else {
          setWalletConnected(false);
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        const accounts = await window.web3.eth.getAccounts();
        console.log("2. From MetaMask: ", accounts[0]);
        if (accounts.length > 0) {
          setBuyerAddress(accounts[0]);
          setWalletConnected(true);
        } else {
          setWalletConnected(false);
        }
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
        setWalletConnected(false);
      }
      setProcessing(false);
    } catch (err) {
      console.log(err);
      setProcessing(false);
    }
  };
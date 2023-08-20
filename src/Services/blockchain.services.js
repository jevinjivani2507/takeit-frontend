import { ethers } from "ethers";

export const connectWallet = async () => {
  // const contractAddress = contractAddress;
  // const contractABI = contractABI;
  try {
    let currentaccount = null;

    const { ethereum } = window;

    if (ethereum) {
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // setCurrentAccount(account[0]);
      currentaccount = account[0];
      console.log(currentaccount);
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return { signer, currentaccount };
  } catch (error) {
    console.log(error);
  }
};

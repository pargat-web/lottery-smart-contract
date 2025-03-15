// 🔹 Replace with your contract details
const contractAddress = "0x90219a6d30b9baa91258340efd22403f357d1cdf"; // 🔥 Add your deployed contract address
const contractABI = [
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]; // 🔥 Paste your contract ABI here (in JSON format)

let web3;
let contract;
let userAccount;

// ✅ Connect to MetaMask
async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    let accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];
    document.getElementById(
      "wallet-address"
    ).innerText = `Connected: ${userAccount}`;

    contract = new web3.eth.Contract(contractABI, contractAddress);
    getContractDetails(); // Fetch contract details on connection
  } else {
    alert("Please install MetaMask!");
  }
}

// ✅ Enter Lottery (Send 10 wei)
async function enterLottery() {
  if (!contract) return alert("Connect wallet first!");

  try {
    await contract.methods.enter().send({
      from: userAccount,
      value: "10", // ✅ 10 wei (instead of 0.1 ETH)
    });
    alert("You have successfully entered the lottery!");
    getContractDetails();
  } catch (error) {
    alert("Transaction failed: " + error.message);
  }
}

// ✅ Pick Winner (Only Manager)
async function pickWinner() {
  if (!contract) return alert("Connect wallet first!");

  try {
    await contract.methods.pickWinner().send({ from: userAccount });
    alert("Winner has been picked!");
    getContractDetails();
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ✅ Get Contract Details (Players & Balance)
async function getContractDetails() {
  if (!contract) return;

  try {
    const players = await contract.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(contractAddress);

    document.getElementById("players").innerText = players.length;
    document.getElementById("balance").innerText = `${balance} wei`; // ✅ Display balance in wei
  } catch (error) {
    console.log("Error fetching contract data:", error);
  }
}

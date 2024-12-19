const contractAddress = "0x408277b6eccdb02693013bf30952b7183c6252d6"; // Replace with your deployed contract address
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "meterId",
				"type": "uint256"
			}
		],
		"name": "payBill",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newTariffRate",
				"type": "uint256"
			}
		],
		"name": "setTariffRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "meterId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "realTimeConsumption",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "voltageLevels",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentMeasurements",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "powerFactorData",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "touData",
				"type": "uint256"
			}
		],
		"name": "storeMeterData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "meterId",
				"type": "uint256"
			}
		],
		"name": "calculateBill",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "meterId",
				"type": "uint256"
			}
		],
		"name": "getMeterData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "meterData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "realTimeConsumption",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "voltageLevels",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentMeasurements",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "powerFactorData",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "touData",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "meterOwners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tariffRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider;
let signer;
let contract;

// Connect to MetaMask
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            await provider.send("eth_requestAccounts", []);
            
            // Get and display wallet address
            const address = await signer.getAddress();
            const shortAddress = address.slice(0, 6) + '...' + address.slice(-4);
            document.querySelector('.wallet-info span').textContent = shortAddress;
            
            // Add hover effect to show full address
            const walletInfo = document.querySelector('.wallet-info');
            walletInfo.title = address;
            
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            document.querySelector('.wallet-info span').textContent = "Connection Failed";
        }
    } else {
        alert("MetaMask is not installed!");
        document.querySelector('.wallet-info span').textContent = "MetaMask Not Found";
    }
}

// Store test data in the contract
async function storeTestData() {
    const meterId = 1; 
    const timestamp = Math.floor(Date.now() / 1000);
    const realTimeConsumption = 10000;
    const voltageLevels = 220; 
    const currentMeasurements = 5;
    const powerFactorData = 90;
    const touData = 1; 

    const tx = await contract.storeMeterData(
        meterId,
        timestamp,
        realTimeConsumption,
        voltageLevels,
        currentMeasurements,
        powerFactorData,
        touData
    );
    await tx.wait();
    alert("Test data added successfully!");
}


// Get meter data by meter ID
async function getMeterData() {
    const meterId = document.getElementById("meterId").value;
    
    // Check if meter ID is empty
    if (!meterId.trim()) {
        alert("Please enter a Meter ID");
        return;
    }

    const data = await contract.getMeterData(meterId);
    const [timestamp, realTimeConsumption, voltageLevels, currentMeasurements, powerFactorData, touData] = data;

    // Format timestamp to HH:MM
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    document.getElementById("meterInfo").innerHTML = `
        Time: ${formattedTime}<br>
        Real-time Consumption: ${realTimeConsumption} kWh<br>
        Voltage Levels: ${voltageLevels} V<br>
        Current Measurements: ${currentMeasurements} A<br>
        Power Factor Data: ${powerFactorData / 100}<br>
        TOU Data: ${touData}<br>
    `;

    // Get tariff rate in Wei per kWh and convert to ETH
    const tariffRateWei = await contract.tariffRate();
    const tariffRateEth = ethers.utils.formatEther(tariffRateWei);

    // Calculate bill in ETH
    const billAmountWei = await contract.calculateBill(meterId);
    const billAmountEth = ethers.utils.formatEther(billAmountWei);

    document.getElementById("tariffRate").innerHTML = `Tariff Rate: ${tariffRateEth} ETH /kWh`;
    document.getElementById("billAmount").innerHTML = `Bill Amount: ${billAmountEth} ETH`;

    console.log("Bill Amount ETH:", billAmountEth);
}

async function payBill() {
    const meterId = document.getElementById("meterId").value;

    // Get the calculated bill amount in Wei
    const billAmountWei = await contract.calculateBill(meterId);
    
    // Convert Wei to ETH
    const billAmountEth = ethers.utils.formatEther(billAmountWei);
    
    try {
        // Convert ETH amount back to Wei for the transaction
        const tx = await contract.payBill(meterId, { 
            value: ethers.utils.parseEther(billAmountEth)
        });
        await tx.wait();
        displayTransactionStatus("Bill paid successfully!", "success");
    } catch (error) {
        console.error("Payment error:", error);
        displayTransactionStatus("Transaction failed. Please try again.", "fail");
    }
}

// Display transaction status
function displayTransactionStatus(message, status) {
    const statusElement = document.getElementById("transactionStatus");
    statusElement.innerHTML = message;
    statusElement.className = status; // success or fail class
}

// Call connectWallet when page loads
connectWallet();

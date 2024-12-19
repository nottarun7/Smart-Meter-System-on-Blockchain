import Web3 from "web3";
import fs from "fs";
import csv from "csv-parser";

const web3 = new Web3("http://127.0.0.1:7545");

const contractAddress = "0xfe51fa7099d5ac88da2b7513650a1a191034ce46";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialTariffRate",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "meterId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BillPaid",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "meterId",
				"type": "string"
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
				"name": "_tariffRate",
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
				"internalType": "string",
				"name": "meterId",
				"type": "string"
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
		"name": "updateMeterData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "meterId",
				"type": "string"
			}
		],
		"name": "getMeterData",
		"outputs": [
			{
				"components": [
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
					},
					{
						"internalType": "uint256",
						"name": "currentBill",
						"type": "uint256"
					}
				],
				"internalType": "struct SmartMeter.MeterData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "meterRecords",
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
			},
			{
				"internalType": "uint256",
				"name": "currentBill",
				"type": "uint256"
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

const smartMeter = new web3.eth.Contract(contractABI, contractAddress);

async function updateMeterDataFromCSV(filePath) {
    const accounts = await web3.eth.getAccounts();
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", async (row) => {
            const {
                meter_id,
                real_time_consumption,
                voltage_levels,
                current_measurements,
                power_factor_data,
                tou_data,
            } = row;

            try {
                const powerFactorInt = Math.round(parseFloat(power_factor_data) * 100);
                const touDataInt = isNaN(parseInt(tou_data)) ? 0 : parseInt(tou_data);

                await smartMeter.methods
                    .updateMeterData(
                        meter_id,
                        parseInt(real_time_consumption),
                        parseInt(voltage_levels),
                        parseInt(current_measurements),
                        powerFactorInt,
                        touDataInt
                    )
                    .send({ from: accounts[0] });

                console.log(`Data updated for Meter ID: ${meter_id}`);
            } catch (error) {
                console.error(`Error updating data for Meter ID: ${meter_id}`, error);
            }
        })
        .on("end", () => {
            console.log("CSV file processed successfully.");
        });
}

// Run the function
const filePath = "./final_meter_readings.csv"; // Path to your CSV file
updateMeterDataFromCSV(filePath);

function displayMeterData(data) {
    const meterInfo = document.getElementById('meterInfo');
    meterInfo.innerHTML = `
        <p>Timestamp: ${new Date(data.timestamp * 1000).toLocaleString()}</p>
        <p>Real-time Consumption: ${data.realTimeConsumption} kWh</p>
        <p>Voltage Levels: ${data.voltageLevels} V</p>
        <p>Current Measurements: ${data.currentMeasurements} A</p>
        <p>Power Factor: ${(data.powerFactorData / 100).toFixed(2)}</p>
        <p>Time of Use: ${data.touData}</p>
    `;
}

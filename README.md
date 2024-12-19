# Smart Meter System on Blockchain

## Overview
This project demonstrates a decentralized smart meter system built on a blockchain using Solidity smart contracts and a web interface powered by JavaScript and ethers.js. Users can:

- Store meter data (real-time consumption, voltage, current, etc.)
- Retrieve and view meter data
- Calculate and pay electricity bills in Ethereum

The system leverages the Ethereum blockchain with MetaMask for wallet interaction and Ganache for local Ethereum Virtual Machine (EVM) deployment.

## Features
- **Meter Data Management:** Store and retrieve data for specific meters.
- **Bill Calculation:** Automatically calculates the bill based on consumption.
- **Payment Integration:** Enables users to pay bills in ETH.
- **Admin Functions:** Update the tariff rate using owner privileges.

## Technologies Used
- **Solidity**: Smart contract language for the Ethereum blockchain.
- **JavaScript**: For frontend interaction with the smart contract.
- **ethers.js**: To interact with the Ethereum blockchain.
- **MetaMask**: Wallet for handling transactions.
- **Ganache**: Local Ethereum blockchain for testing.

---

## Installation and Setup

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [MetaMask](https://metamask.io/) browser extension.
3. Install [Ganache](https://trufflesuite.com/ganache/).

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd smart-meter-blockchain
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy the smart contract using Remix or Hardhat:
   - Use the provided `SmartMeter` Solidity contract.
   - Copy the deployed contract address and update it in the JavaScript file.

4. Start Ganache and connect MetaMask to the local blockchain network:
   - Import one of the Ganache accounts into MetaMask using the private key.

5. Run the web interface:
   ```bash
   npm start
   ```

6. Open the web interface in your browser and interact with the smart contract.

---

## Smart Contract Functions

### Public Functions
- **storeMeterData**: Stores meter data for a given `meterId`.
- **getMeterData**: Retrieves data for a specific `meterId`.
- **calculateBill**: Calculates the electricity bill for a given `meterId`.
- **payBill**: Allows users to pay their bill in ETH.

### Admin Functions
- **setTariffRate**: Updates the tariff rate (accessible only by the contract owner).

---

## Usage

1. **Connect Wallet:**
   Click the "Connect Wallet" button to connect MetaMask to the web interface.

2. **Store Test Data:**
   Use the "Store Test Data" button to add sample meter data.

3. **Retrieve Meter Data:**
   Enter a `meterId` and click "Get Meter Data" to view details like consumption and bill amount.

4. **Pay Bill:**
   Use the "Pay Bill" button to pay the calculated amount in ETH.

---

## Project Structure
- `contracts/SmartMeter.sol`: Solidity smart contract code.
- `src/index.html`: HTML interface.
- `src/js/script.js`: JavaScript for contract interaction.
- `src/css/style.css`: Styling for the interface.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- [Ethereum](https://ethereum.org/)
- [MetaMask](https://metamask.io/)
- [Ganache](https://trufflesuite.com/ganache/)
- [ethers.js](https://docs.ethers.org/)

Feel free to contribute to this project by submitting issues or pull requests!


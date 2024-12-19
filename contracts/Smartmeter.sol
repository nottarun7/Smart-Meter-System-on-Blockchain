// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartMeter {
    struct MeterData {
        uint256 timestamp;
        uint256 realTimeConsumption; // kWh
        uint256 voltageLevels; // Volts
        uint256 currentMeasurements; // Amperes
        uint256 powerFactorData; // Stored as integer (e.g., 90 for 0.9)
        uint256 touData; // Time-of-Use Data
    }

    mapping(uint256 => MeterData) public meterData;
    mapping(uint256 => address) public meterOwners;

    uint256 public tariffRate = 0.000024 ether; // Tariff rate in ETH per kWh
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Update the tariff rate (admin only)
    function setTariffRate(uint256 newTariffRate) public onlyOwner {
        require(newTariffRate > 0, "Tariff rate must be greater than 0");
        tariffRate = newTariffRate;
    }

    // Store meter data
    function storeMeterData(
        uint256 meterId,
        uint256 timestamp,
        uint256 realTimeConsumption,
        uint256 voltageLevels,
        uint256 currentMeasurements,
        uint256 powerFactorData, // Power factor as integer (e.g., 90 for 0.9)
        uint256 touData
    ) public {
        MeterData memory newMeterData = MeterData({
            timestamp: timestamp,
            realTimeConsumption: realTimeConsumption,
            voltageLevels: voltageLevels,
            currentMeasurements: currentMeasurements,
            powerFactorData: powerFactorData, // Store as integer
            touData: touData
        });
        meterData[meterId] = newMeterData;
        meterOwners[meterId] = msg.sender;
    }

    // Retrieve meter data by meterId
    function getMeterData(uint256 meterId) public view returns (
        uint256, uint256, uint256, uint256, uint256, uint256
    ) {
        MeterData memory data = meterData[meterId];
        uint256 powerFactor = data.powerFactorData ; // Convert back to decimal
        return (
            data.timestamp,
            data.realTimeConsumption,
            data.voltageLevels,
            data.currentMeasurements,
            powerFactor, // Return power factor as decimal (e.g., 0.9)
            data.touData
        );
    }

    // Calculate the bill based on consumption (in ETH)
    function calculateBill(uint256 meterId) public view returns (uint256) {
        uint256 consumption = meterData[meterId].realTimeConsumption; // kWh
        return consumption * tariffRate;
    }

    // Pay the bill in ETH
    function payBill(uint256 meterId) public payable {
        uint256 billAmount = calculateBill(meterId);
        require(msg.value >= billAmount, "Insufficient payment.");
        payable(meterOwners[meterId]).transfer(msg.value);
    }
}

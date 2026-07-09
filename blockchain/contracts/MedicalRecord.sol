// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedicalRecord {

    struct Record {
        uint256 blockchainRecordId;
        uint256 patientId;
        string recordHash;
        address doctor;
        uint256 timestamp;
    }

    mapping(uint256 => Record) private records;

    mapping(address => mapping(address => bool)) private permissions;

    event RecordStored(
        uint256 indexed blockchainRecordId,
        uint256 indexed patientId,
        string recordHash,
        address doctor,
        uint256 timestamp
    );

    event AccessGranted(address indexed patient,address indexed doctor);

    event AccessRevoked(address indexed patient,address indexed doctor);

    function addRecord(
        uint256 _blockchainRecordId,
        uint256 _patientId,
        string memory _recordHash
    ) public {

        records[_blockchainRecordId] = Record(
            _blockchainRecordId,
            _patientId,
            _recordHash,
            msg.sender,
            block.timestamp
        );

        emit RecordStored(
            _blockchainRecordId,
            _patientId,
            _recordHash,
            msg.sender,
            block.timestamp
        );
    }

    function getRecord(uint256 _blockchainRecordId)
        public
        view
        returns(
            uint256,
            string memory,
            address,
            uint256
        )
    {
        Record memory r = records[_blockchainRecordId];

        return (
            r.patientId,
            r.recordHash,
            r.doctor,
            r.timestamp
        );
    }

    function grantAccess(address doctor) public {
        permissions[msg.sender][doctor]=true;
        emit AccessGranted(msg.sender,doctor);
    }

    function revokeAccess(address doctor) public {
        permissions[msg.sender][doctor]=false;
        emit AccessRevoked(msg.sender,doctor);
    }

    function hasAccess(address patient,address doctor)
        public
        view
        returns(bool)
    {
        return permissions[patient][doctor];
    }
}
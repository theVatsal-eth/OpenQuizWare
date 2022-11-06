// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Contract.sol";


contract OCW is ERC721Base {
    
    struct Levels {
        address Beginner;
        address Moderate;
        address Expert;
    }

    mapping(address => Levels) collegesContracts;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}

    function createCollegeContract(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) public returns (Levels memory _collegeContracts) {

        Contract _beginnerContract = new Contract(_name, _symbol, _royaltyRecipient, _royaltyBps);
        Contract _moderateContract = new Contract(_name, _symbol, _royaltyRecipient, _royaltyBps);
        Contract _expertContract = new Contract(_name, _symbol, _royaltyRecipient, _royaltyBps);
        
        collegesContracts[msg.sender].Beginner = address(_beginnerContract);
        collegesContracts[msg.sender].Moderate = address(_moderateContract);
        collegesContracts[msg.sender].Expert = address(_expertContract);
        
        return collegesContracts[msg.sender];
    }

    function getCollegeContracts(address _address) public view returns(Levels memory ) {
        return collegesContracts[_address];
    }

}
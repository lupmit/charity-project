pragma solidity >=0.7.0 <0.9.0;

import "./CharityProject.sol";

contract Charity {
    mapping(address => address[]) public listCharity;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function addCharityProject(
        string memory _name,
        string memory _description,
        uint256 _target
    ) public returns (bool) {
        CharityProject charity = new CharityProject(
            _name,
            _description,
            _target,
            msg.sender
        );
        listCharity[msg.sender].push(charity.getAddress());
        return true;
    }
}

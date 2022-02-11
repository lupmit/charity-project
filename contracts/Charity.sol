// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.7.0 <0.9.0;

import "./Project.sol";

contract Charity {
    address[] public listProject;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    //event
    event addCharityProjectEvent(
        address owner,
        address projectAddress,
        string name,
        uint256 target
    );

    function addCharityProject(string memory _name, uint256 _target)
        public
        returns (bool)
    {
        require(msg.sender == owner, "No Permission");

        Project charity = new Project(_name, _target, msg.sender);
        listProject.push(address(charity));
        emit addCharityProjectEvent(
            msg.sender,
            charity.getAddress(),
            _name,
            _target
        );
        return true;
    }

    function deleteCharityProject(address _address) public {
        require(msg.sender == owner, "No Permission");

        uint256 i = findProject(_address);
        removeProjectByIndex(i);
    }

    function findProject(address _address) public view returns (uint256) {
        uint256 i = 0;
        while (listProject[i] != _address) {
            i++;
        }
        return i;
    }

    function removeProjectByIndex(uint256 i) public {
        listProject[i] = listProject[listProject.length - 1];
        listProject.pop();
    }

    function getAllProject() public view returns (address[] memory) {
        return listProject;
    }

    function getProjectInfo(address _address)
        public
        view
        returns (Project.ProjectInfo memory)
    {
        Project pi = Project(_address);
        return pi.getProjectInfo();
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getInfoCharity()
        public
        view
        returns (
            uint256 totalDonate,
            uint256 totalDonator,
            uint256 totalBeneficy
        )
    {
        for (uint256 i = 0; i < listProject.length; i++) {
            Project.ProjectInfo memory p = Project(listProject[i])
                .getProjectInfo();
            totalDonate += (p.balance + p.allocated);
            totalDonator += p.numberOfDonator;
            totalBeneficy += p.numberOfBeneficy;
        }
    }
}

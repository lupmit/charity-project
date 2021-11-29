pragma solidity >=0.7.0 <0.9.0;

import "./Project.sol";

contract Charity {
    struct Manager {
        address managerAddress;
        string name;
        string description;
    }

    mapping(address => address[]) public myCharity;
    Manager[] public listManager;
    address[] public listProject;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    //event
    event addCharityProjectEvent(address owner, string name, uint256 target);
    event addManagerEvent(address owner, Manager manager);

    //manager methods
    function addManager(
        address _mangerAddress,
        string memory _name,
        string memory _description
    ) public returns (bool) {
        require(
            msg.sender == owner,
            "Kh%C3%B4ng%20c%C3%B3%20quy%E1%BB%81n%20th%E1%BB%B1c%20thi"
        );
        require(
            indexOfManager(_mangerAddress) == -1,
            "%C4%90%C3%A3%20t%E1%BB%93n%20t%E1%BA%A1i"
        );

        Manager memory manager = Manager(_mangerAddress, _name, _description);
        listManager.push(manager);
        emit addManagerEvent(msg.sender, manager);
        return true;
    }

    //delete manager
    function deleteManager(address _mangerAddress) public returns (bool) {
        require(
            msg.sender == owner,
            "Kh%C3%B4ng%20c%C3%B3%20quy%E1%BB%81n%20th%E1%BB%B1c%20thi"
        );
        require(
            indexOfManager(_mangerAddress) >= 0,
            "Kh%C3%B4ng%20t%E1%BB%93n%20t%E1%BA%A1i"
        );

        int256 index = indexOfManager(_mangerAddress);
        removeManager(index);
        return true;
    }

    //update manager
    function updateManager(
        address _mangerAddress,
        string memory _name,
        string memory _description
    ) public returns (bool) {
        require(
            msg.sender == owner,
            "Kh%C3%B4ng%20c%C3%B3%20quy%E1%BB%81n%20th%E1%BB%B1c%20thi"
        );
        require(
            indexOfManager(_mangerAddress) >= 0,
            "Kh%C3%B4ng%20t%E1%BB%93n%20t%E1%BA%A1i"
        );

        int256 index = indexOfManager(_mangerAddress);
        listManager[uint256(index)].name = _name;
        listManager[uint256(index)].description = _description;
        return true;
    }

    function addCharityProject(
        string memory _name,
        string memory _description,
        uint256 _target
    ) public returns (bool) {
        require(
            msg.sender == owner || indexOfManager(msg.sender) >= 0,
            "Kh%C3%B4ng%20c%C3%B3%20quy%E1%BB%81n%20th%E1%BB%B1c%20thi"
        );

        Project charity = new Project(_name, _description, _target, msg.sender);
        myCharity[msg.sender].push(address(charity));
        listProject.push(address(charity));
        emit addCharityProjectEvent(msg.sender, _name, _target);
        return true;
    }

    function getAllProject() public view returns (address[] memory) {
        return listProject;
    }

    function getProjectInfo(address _address)
        public
        view
        returns (Project.ProjectInfo memory)
    {
        require(
            indexOfArray(_address, listProject) >= 0,
            "Kh%C3%B4ng%20t%E1%BB%93n%20t%E1%BA%A1i"
        );
        return Project(_address).getProjectInfo();
    }

    function getMyProject(address _address)
        public
        view
        returns (address[] memory)
    {
        return myCharity[_address];
    }

    function getAllManager() public view returns (Manager[] memory) {
        return listManager;
    }

    function indexOfManager(address item) internal view returns (int256) {
        for (int256 i = 0; i < int256(listManager.length); i++) {
            if (item == listManager[uint256(i)].managerAddress) return i;
        }
        return -1;
    }

    function indexOfArray(address item, address[] memory array)
        internal
        pure
        returns (int256)
    {
        for (int256 i = 0; i < int256(array.length); i++) {
            if (item == array[uint256(i)]) return i;
        }
        return -1;
    }

    function removeManager(int256 index) internal {
        if (uint256(index) > listManager.length) return;

        listManager[uint256(index)] = listManager[listManager.length - 1];
        listManager.pop();
        return;
    }
}

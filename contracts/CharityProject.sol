pragma solidity >=0.7.0 <0.9.0;

contract CharityProject {
    struct Donator {
        address donatorAddress;
        string name;
        string message;
        uint256 amount;
        uint256 timestamp;
    }

    struct Beneficiary {
        address payable beneficiaryAddress;
        string name;
        string description;
    }

    enum charity_state {
        SETUP,
        START,
        FINISH
    }

    string public name;
    string public description;
    address public owner;
    uint256 public target;
    uint256 public amountRaised;
    mapping(address => Donator[]) public myDonation;
    Donator[] public donators;
    Beneficiary[] public beneficiaries;
    charity_state public state;

    constructor(
        string memory _name,
        string memory _description,
        uint256 _target,
        address _ownerAddess
    ) {
        require(_target > 0);
        name = _name;
        description = _description;
        owner = _ownerAddess;
        target = _target;
        state = charity_state.SETUP;
    }

    //event
    event donateEvent(Donator donator);
    event tranferToBeneficiaryEvent(
        address from,
        address payable to,
        uint256 value
    );

    //manager method
    function startCharity() public returns (bool) {
        require(msg.sender == owner);
        require(state == charity_state.SETUP);
        require(beneficiaries.length > 0);
        state = charity_state.START;
        return true;
    }

    function addBeneficiary(
        address payable _beneficiaryAddress,
        string memory _name,
        string memory _description
    ) public returns (bool) {
        require(msg.sender == owner);
        require(state == charity_state.SETUP);
        Beneficiary memory beneficiary = Beneficiary(
            _beneficiaryAddress,
            _name,
            _description
        );
        beneficiaries.push(beneficiary);
        return true;
    }

    function donate(string memory _name, string memory _message)
        public
        payable
        returns (bool)
    {
        require(state == charity_state.START);
        require(msg.value > 0);
        require(msg.sender.balance > msg.value);

        Donator memory donator = Donator(
            msg.sender,
            _name,
            _message,
            msg.value,
            block.timestamp
        );

        myDonation[msg.sender].push(donator);
        donators.push(donator);

        amountRaised += msg.value;
        emit donateEvent(donator);

        if (checkTarget() == true) {
            state = charity_state.FINISH;
            tranferToBeneficiary();
        }

        return true;
    }

    function checkTarget() public view returns (bool) {
        if (getBalance() >= target) return true;
        return false;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function tranferToBeneficiary() private {
        //the system retains 5% as a transaction fee
        uint256 amount = (address(this).balance * 95) / 100;
        uint256 totalBeneficiary = beneficiaries.length;
        uint256 amountPerPerson = amount / totalBeneficiary;
        for (uint256 i = 0; i < totalBeneficiary; i++) {
            beneficiaries[i].beneficiaryAddress.transfer(amountPerPerson);
            emit tranferToBeneficiaryEvent(
                address(this),
                beneficiaries[i].beneficiaryAddress,
                amountPerPerson
            );
        }
    }
}

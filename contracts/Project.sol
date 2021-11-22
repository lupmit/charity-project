pragma solidity >=0.7.0 <0.9.0;

contract Project {
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

    struct TransactionBeneficiary {
        Beneficiary beneficiary;
        uint256 amount;
        uint256 timestamp;
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
    TransactionBeneficiary[] public transactionBeneficiaries;
    charity_state public state;

    constructor(
        string memory _name,
        string memory _description,
        uint256 _target,
        address _ownerAddess
    ) {
        require(
            _target > 0,
            "M%E1%BB%A5c%20ti%C3%AAu%20c%E1%BB%A7a%20d%E1%BB%B1%20%C3%A1n%20ph%E1%BA%A3i%20l%E1%BB%9Bn%20h%C6%A1n%200"
        );
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

    //manager methods
    function startCharity() public returns (bool) {
        require(
            msg.sender == owner,
            "Kh%C3%B4ng%20c%C3%B3%20quy%E1%BB%81n%20th%E1%BB%B1c%20thi"
        );
        require(
            state == charity_state.SETUP,
            "D%E1%BB%B1%20%C3%A1n%20n%C3%A0y%20%C4%91%C3%A3%20ho%E1%BA%A1t%20%C4%91%E1%BB%99ng"
        );
        require(beneficiaries.length > 0);

        state = charity_state.START;
        return true;
    }

    function addBeneficiary(Beneficiary[] memory _beneficiaries)
        public
        returns (bool)
    {
        require(
            msg.sender == owner,
            "Kh%C3%B4ng%20c%C3%B3%20quy%E1%BB%81n%20th%E1%BB%B1c%20thi"
        );
        require(
            state == charity_state.SETUP,
            "D%E1%BB%B1%20%C3%A1n%20n%C3%A0y%20%C4%91%C3%A3%20ho%E1%BA%A1t%20%C4%91%E1%BB%99ng"
        );

        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            beneficiaries.push(_beneficiaries[i]);
        }
        return true;
    }

    //public methods
    function donate(string memory _name, string memory _message)
        public
        payable
        returns (bool)
    {
        require(
            state == charity_state.START,
            "D%E1%BB%B1%20%C3%A1n%20n%C3%A0y%20ch%C6%B0a%20b%E1%BA%AFt%20%C4%91%E1%BA%A7u%20ho%E1%BA%B7c%20%C4%91%C3%A3%20k%E1%BA%BFt%20th%C3%BAc"
        );
        require(
            msg.value > 0,
            "S%E1%BB%91%20ti%E1%BB%81n%20quy%C3%AAn%20g%C3%B3p%20ph%E1%BA%A3i%20l%E1%BB%9Bn%20h%C6%A1n%200"
        );
        require(
            msg.sender.balance > msg.value,
            "S%E1%BB%91%20d%C6%B0%20kh%C3%B4ng%20%C4%91%E1%BB%A7"
        );

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

    function getAllDonator() public view returns (Donator[] memory) {
        Donator[] memory d = donators;
        return d;
    }

    function getAllBeneficiary() public view returns (Beneficiary[] memory) {
        Beneficiary[] memory b = beneficiaries;
        return b;
    }

    function getAllTransactionBeneficiary()
        public
        view
        returns (TransactionBeneficiary[] memory)
    {
        TransactionBeneficiary[] memory t = transactionBeneficiaries;
        return t;
    }

    // private methods
    function tranferToBeneficiary() private {
        //the system retains 5% as a transaction fee
        uint256 amount = (address(this).balance * 95) / 100;
        uint256 totalBeneficiary = beneficiaries.length;
        uint256 amountPerPerson = amount / totalBeneficiary;
        for (uint256 i = 0; i < totalBeneficiary; i++) {
            beneficiaries[i].beneficiaryAddress.transfer(amountPerPerson);

            //save transaction
            TransactionBeneficiary memory transaction = TransactionBeneficiary(
                beneficiaries[i],
                amountPerPerson,
                block.timestamp
            );
            transactionBeneficiaries.push(transaction);

            emit tranferToBeneficiaryEvent(
                address(this),
                beneficiaries[i].beneficiaryAddress,
                amountPerPerson
            );
        }
    }
}

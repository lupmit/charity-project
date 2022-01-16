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

    struct ProjectInfo {
        address projectAddress;
        string name;
        uint256 target;
        uint256 balance;
        uint256 allocated;
        uint256 numberOfDonator;
        uint256 numberOfBeneficy;
        Beneficiary[] beneficiaries;
        charity_state state;
    }

    enum charity_state {
        SETUP,
        START,
        FINISH
    }

    string public name;
    address public owner;
    uint256 public target;
    uint256 public allocated;
    uint256 public startTime;
    uint256 public endTime;
    mapping(address => Donator[]) public myDonation;
    Donator[] public donators;
    Beneficiary[] public beneficiaries;
    TransactionBeneficiary[] public transactionBeneficiaries;
    charity_state public state;

    constructor(
        string memory _name,
        uint256 _target,
        address _ownerAddress
    ) {
        require(_target > 0, "Target must be greater than zero");
        name = _name;
        owner = _ownerAddress;
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
    function upadateAndStartCharity(
        string memory _name,
        uint256 _target,
        Beneficiary[] memory _beneficiaries
    ) public returns (bool) {
        require(msg.sender == owner, "No permission");
        require(
            state == charity_state.SETUP,
            "Project is running or has ended"
        );
        require(_beneficiaries.length > 0);

        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            beneficiaries.push(_beneficiaries[i]);
        }

        name = _name;
        target = _target;

        state = charity_state.START;
        startTime = block.timestamp;
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
            "Project has not started or has ended"
        );
        require(msg.value > 0, "Amount must be greater than zero");
        require(
            msg.sender.balance > msg.value,
            "Balance of account is not enough"
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

        emit donateEvent(donator);

        if (checkTarget() == true) {
            if (checkEnd() == true) {
                state = charity_state.FINISH;
                endTime = block.timestamp;
            }
            tranferToBeneficiary();
        }

        return true;
    }

    function checkTarget() public view returns (bool) {
        if (getBalance() >= target / 2) return true;
        return false;
    }

    function checkEnd() public view returns (bool) {
        if (address(this).balance + allocated >= target) return true;
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

    function getProjectInfo() public view returns (ProjectInfo memory) {
        return
            ProjectInfo(
                getAddress(),
                name,
                target,
                getBalance(),
                allocated,
                donators.length,
                beneficiaries.length,
                beneficiaries,
                state
            );
    }

    // private methods
    function tranferToBeneficiary() private {
        allocated += address(this).balance;
        uint256 totalBeneficiary = beneficiaries.length;
        uint256 amountPerPerson = address(this).balance / totalBeneficiary;
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

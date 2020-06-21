pragma solidity >=0.5.0 <0.7.0;

contract Hospitals {
    event NewHospital(
        uint256 hospitalId,
        string name,
        string city,
        uint256 noOfBeds,
        bool isPrivate
    );
    event NewBedBooking(uint256 bedId, uint256 hospitalId);

    struct Hospital {
        string name;
        string city;
        uint256 noOfBeds;
        bool isPrivate;
        uint256 bedPrice;
        uint256 bedAvailable;
    }
    struct Bed {
        uint256 bedId;
        uint256 hospitalId;
        address name;
    }

    mapping(uint256 => Hospital) public hospitals;
    uint256 hospitalId;
    uint256 public bedId;

    // Hospital[] public hospitalsList;

    mapping(uint256 => Bed) public bedToHospital;
    mapping(address => uint256) public hospitalBedCount;

    function addHospital(
        string memory _name,
        string memory _city,
        uint256 _noOfBeds,
        bool _isPrivate,
        uint256 _bedPrice
    ) public {
        Hospital memory hosp = Hospital(
            _name,
            _city,
            _noOfBeds,
            _isPrivate,
            _bedPrice,
            _noOfBeds
        );

        hospitals[hospitalId] = hosp;
        emit NewHospital(hospitalId++, _name, _city, _noOfBeds, _isPrivate);
    }

    function getIds() public returns (uint256) {
        return hospitalId;
    }

    function myFunction() public returns (string memory myString) {
        return "Hello!%";
    }

    function bookOneBed(uint256 _hospitalId) public {
        Hospital storage hosp = hospitals[_hospitalId];
        require(
            hosp.bedAvailable > 0 && hosp.bedAvailable <= hosp.noOfBeds,
            "bed not available"
        );
        hosp.bedAvailable--;
        emit NewBedBooking(bedId++, _hospitalId);
    }

    function freeBed(uint256 _hospitalId) public {
        Hospital storage hosp = hospitals[_hospitalId];
        require(hosp.bedAvailable <= hosp.noOfBeds, "All beds are free");
        hosp.bedAvailable++;
    }
}

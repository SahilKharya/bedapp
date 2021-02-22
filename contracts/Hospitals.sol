pragma solidity >=0.4.0 <0.6.0;
pragma experimental ABIEncoderV2;
contract Hospitals {
    event NewHospital(
        uint256 hospitalId,
        string name,
        string city,
        uint256 noOfBeds,
        bool isPrivate
    );
    event NewBedBooking(uint256 bedId);

    struct Hospital {
        string name;
        string city;
        uint256 noOfBeds;
        bool isPrivate;
        uint256 bedPrice;
        uint bedAvailable;
    }
    struct Bed {
        uint256 bedId; uint256 hospitalId; address name;
    }

    mapping(uint256 => Hospital) hospitals;
    mapping(uint256 => Bed) public bookedBeds;

    uint256 hospitalId;
    uint256 bedId;

    Hospital[] private hospitalsList;
    mapping(uint => address) hospitalToOwner;

    function hospitalInfo(uint _key) public view returns(Hospital) {
        return hospitalsList[_key];
    }

    function _addHospital(
        string memory _name,
        string memory _city,
        uint256 _noOfBeds,
        bool _isPrivate,
        uint _bedPrice
    ) public {
        Hospital memory hosp = Hospital(_name, _city, _noOfBeds, _isPrivate, _bedPrice, _noOfBeds);
        hospitalToOwner[hospitalId] = msg.sender;
        hospitals[hospitalId] = hosp;
        hospitalsList.push(hosp);
        emit NewHospital(hospitalId++, _name, _city, _noOfBeds, _isPrivate);
    }
    
    function _bookOneBed(uint _hospitalId) public {
        Hospital storage hosp = hospitals[_hospitalId];
        require(hosp.bedAvailable > 0 && hosp.bedAvailable<=hosp.noOfBeds , "bed not available");
        hosp.bedAvailable--;
        hospitalsList[_hospitalId].bedAvailable--;
        bookedBeds[bedId] = Bed(bedId, _hospitalId, msg.sender);
        emit NewBedBooking(bedId++);
    }

    function _freeBed(uint _hospitalId, uint _bedId ) public {
        Bed storage bed = bookedBeds[_bedId];
        require(bed.name ==msg.sender, "bed not booked by owner");
        Hospital storage hosp = hospitals[_hospitalId];
        require(hosp.bedAvailable<hosp.noOfBeds , "All beds are free");
        hosp.bedAvailable++;
        hospitalsList[_hospitalId].bedAvailable++;

    }
}
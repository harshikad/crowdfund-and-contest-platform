// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContestFactory {
    address[] public deployedContests;

    event contestCreated(
        string title,
        uint prizeAmount,
        address indexed owner,
        address contestAddress,
        string imgURI,
        uint indexed startDate,
        uint indexed endDate,
        string category
    );

    // Function to create a new contest
    function createContest(
        string memory contestTitle,
        uint prizeAmount, 
        string memory imgURI,
        uint startDate,
        uint endDate,
        string memory category
    ) public {
        Contest newContest = new Contest(contestTitle, prizeAmount, imgURI, startDate, endDate);
        deployedContests.push(address(newContest));

        emit contestCreated(
            contestTitle,
            prizeAmount,
            msg.sender,
            address(newContest),
            imgURI,
            startDate,
            endDate,
            category
        );
    }
}

contract Contest {
    string public title;
    uint public prizeAmount;
    string public image;
    uint public startDate;
    uint public endDate;
    address payable public owner;
    address public winner;
    bool public contestEnded;

    event entered(address indexed participant, uint indexed timestamp);
    event contestEndedEvent(address indexed winner, uint indexed prizeAmount, uint indexed timestamp);

    constructor(
        string memory contestTitle, 
        uint prizeAmount_,
        string memory imgURI,
        uint startDate_,
        uint endDate_
    ) {
        title = contestTitle;
        prizeAmount = prizeAmount_;
        image = imgURI;
        startDate = startDate_;
        endDate = endDate_;
        owner = payable(msg.sender);
        contestEnded = false;
    }

    // Function to participate in the contest
    function enterContest() public payable {
        require(block.timestamp >= startDate, "Contest hasn't started yet");
        require(block.timestamp <= endDate, "Contest has ended");
        require(!contestEnded, "Contest has already ended");
        require(msg.value >= 0.1 ether, "Minimum participation fee is 0.1 ETH");

        emit entered(msg.sender, block.timestamp);
    }

    // Function to end the contest
    function endContest(address _winner) public {
        require(msg.sender == owner, "Only owner can end the contest");
        require(!contestEnded, "Contest already ended");
        require(block.timestamp > endDate, "Contest has not ended yet");

        winner = _winner;
        contestEnded = true;
        payable(winner).transfer(prizeAmount);
        emit contestEndedEvent(winner, prizeAmount, block.timestamp);
    }

    // Function to get contract details
    function getContestDetails() public view returns (string memory, uint, uint, uint, address) {
        return (title, prizeAmount, startDate, endDate, winner);
    }
}

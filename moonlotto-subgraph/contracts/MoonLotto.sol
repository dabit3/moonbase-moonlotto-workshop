pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT License

contract MoonLotto {
    /* Attributes */
    address[] public players;
    bool[] public isGift;
    address[] public winners;
    uint256 public lastTime;
    uint256 public ticketPrice;
    uint256 public prizeAmount;
    uint256 public currentRound;
    uint256 private lotteryRoundTime;
    uint256 private minRoundPlayers;
    address public owner;

    /* Events */
    event PlayerJoined(
        uint256 ticketIndex,
        address player,
        uint256 round,
        bool isGifted,
        uint256 prizeAmount
    );
    event LotteryResult(
        uint256 ticketIndex,
        address winner,
        uint256 round,
        bool isGifted,
        uint256 prizeAmount,
        uint256 timestamp
    );

    /** 
        Constructor function only stores the timestamp
    */
    constructor(
        uint256 _ticketPrice,
        uint256 _lotteryRoundTime,
        uint256 _minRoundPlayers
    ) {
        owner = msg.sender;

        lastTime = block.timestamp;
        currentRound = 1;
        ticketPrice = _ticketPrice;
        lotteryRoundTime = _lotteryRoundTime;
        minRoundPlayers = _minRoundPlayers;
    }

    /**
       Join the Lottery and Pick Winner if conditions are met
    */
    function joinLottery() public payable {
        // Mark as not gift
        isGift.push(false);
        // Enter Lottery
        enterLottery(msg.sender);
    }

    /**
       Gift a the Lottery entry
    */
    function giftTicket(address _recipient) public payable {
        // Mark as gift
        isGift.push(true);
        // Enter Lottery
        enterLottery(_recipient);
    }

    /**
        Enter lottery
    */
    function enterLottery(address _entry) internal {
        require(msg.value >= ticketPrice, "Amount sent less than minimum");
        require(msg.value <= ticketPrice, "Amount sent more than minimum");

        // Add the address entry as a player
        players.push(_entry);
        // Update prize Amount
        prizeAmount = address(this).balance;
        // Emit event
        emit PlayerJoined(
            players.length - 1,
            _entry,
            currentRound,
            isGift[isGift.length - 1],
            prizeAmount
        );
        // Pick Winner if conditions are met
        if (
            block.timestamp >= lastTime + lotteryRoundTime &&
            players.length >= minRoundPlayers
        ) {
            pickWinner();
        }
    }

    /**
        Pick winner
    */
    function pickWinner() internal {
        // Pick a pseudo-random winner
        uint256 ticketIndex = random() % players.length;
        address winner = players[ticketIndex];
        // Transfer funds
        payable(winner).transfer(address(this).balance);
        // Emit event
        emit LotteryResult(
            ticketIndex,
            winner,
            currentRound,
            isGift[ticketIndex],
            prizeAmount,
            block.timestamp
        );
        // Update variables
        winners.push(winner);
        currentRound++;
        lastTime = block.timestamp;
        // Reset variables
        delete players;
        delete isGift;
        prizeAmount = 0;
    }

    /**
        Getter for private attribute lotteryRoundTime
    */
    function getLotteryRoundTime() public view returns (uint256) {
        require(
            msg.sender == owner,
            "This method is restricted just for the owner"
        );
        return lotteryRoundTime;
    }

    /** 
        Getter for private attribute minRoundPlayers
    */
    function getMinRoundPlayers() public view returns (uint256) {
        require(
            msg.sender == owner,
            "This method is restricted just for the owner"
        );
        return minRoundPlayers;
    }

    /**
        Generate pseudo-random number ( ONLY FOR TESTING - NOT SAFE)
    */
    function random() internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.number, block.timestamp, players)
                )
            );
    }
}

pragma solidity >=0.4.22 <0.6.0;
contract numberBet {
    struct Bettor{
        uint initialCash;
        uint amountWon;
        uint amountLost;
        bool allowedToBet;
    }

    struct Betting{
        uint BetNumber;
        uint amountofBet;
        address[] bettoraddress;
    }
    
    struct IndividualBets{
        address addr;
        uint bet;
        uint amount;
    }
    
    address[] private winningAddresses;
    uint[] private betNumbers;
    uint private totalBetAmount;
    Betting[] private bets;
    IndividualBets[] private individualBets;
    address public chairperson;
    mapping(address => Bettor) private Bettors;
    uint winningNumber;

    constructor() public{
        chairperson = msg.sender;
    }
    
    function getInitialBalance() public view returns(uint){
        require(msg.sender != chairperson, "Chairperson cannot check his balance");
        address addr = msg.sender;
        return Bettors[addr].initialCash;
    }
    

    function setBetNumberLimit(uint N) public{
        require(
            msg.sender == chairperson,
            "Only chairperson can se the limit"
        );
        for(uint i = 0 ; i < N ; i++){
            betNumbers.push(i);
            bets.push(Betting({
                BetNumber : i,
                amountofBet : 0,
                bettoraddress : new address[](0)
            }));
        }
    }

    function giveRightToBet(address bettor) public{
        require(
            msg.sender == chairperson,
            "Only chairperson can invite bettors"
        );
        require(
            !Bettors[bettor].allowedToBet,
            "bettor already has right to bet"
        );
        require(
            bettor != chairperson,
            "chairperson cant bet"
            );
        Bettors[bettor].allowedToBet = true;
        Bettors[bettor].initialCash = 100;
    }
    
    function Bet(uint number, uint amount) public{
        Bettor storage person = Bettors[msg.sender];
        require(person.allowedToBet, "bettor doesn't have right to bet");
        require(person.initialCash > amount, "Insuffiecient funds");
        require(msg.sender != chairperson,"Chairperson cannot bet");
        require(number >= 0 && number < bets.length,"The number should be between 0 to N-1");
        bets[number].amountofBet += amount;
        totalBetAmount += amount;
        bets[number].bettoraddress.push(msg.sender);
        individualBets.push(IndividualBets({
            addr: msg.sender,
            bet: bets[number].BetNumber,
            amount : amount
        }));
        person.initialCash -= amount;
    }
    
    function generateRand() private view returns (uint) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%bets.length);
    }
    
    function printWinningNumber() public view returns(uint){
        return winningNumber;
    }
    
    function calcul(uint a, uint b,uint precision) private pure returns ( uint) {
        return (a*(10**precision)/b);
    }
    
    function endBet() public {
        require(
            msg.sender == chairperson,
            "Only chairperson can end the bet"
        );
        winningNumber = generateRand();
        Betting storage WinningBet = bets[winningNumber];
        winningAddresses = WinningBet.bettoraddress;
        for(uint i = 0 ; i < individualBets.length ; i++ ){
            if(individualBets[i].bet == winningNumber){
                Bettors[individualBets[i].addr].initialCash += individualBets[i].amount;
                uint win = calcul(individualBets[i].amount, WinningBet.amountofBet, 1)*totalBetAmount;
                win = calcul(win,100,1);
                Bettors[individualBets[i].addr].amountWon += win;
                Bettors[individualBets[i].addr].allowedToBet = false;
            }
            else{
                Bettors[individualBets[i].addr].amountLost += individualBets[i].amount;
                Bettors[individualBets[i].addr].allowedToBet = false;
            }
        }
    }
    
    function getAmountWon(address bettor) public view returns (uint){
        return Bettors[bettor].amountWon;
    }
    
    function getAmountLost(address bettor) public view returns (uint){
        return Bettors[bettor].amountLost;
    }
    
    function getWinners() public view returns(address[]){
        return winningAddresses;
    }
    
    function getBiggestLoser() public view returns(address){
        uint BiggestLoss = 0;
        uint pointer = 0;
        for(uint i = 0 ; i < individualBets.length ; i++){
            if(Bettors[individualBets[i].addr].amountLost > BiggestLoss){
                BiggestLoss = Bettors[individualBets[i].addr].amountLost;
                pointer = i;
            }
        }
        return individualBets[pointer].addr;
    }
    
    function resetBetting() public returns(uint[]) {
        delete betNumbers;
        delete bets;
        delete totalBetAmount;
        for(uint i = 0 ; i < individualBets.length ; i++){
            Bettors[individualBets[i].addr].initialCash += individualBets[i].amount;
        }
        delete individualBets;
    }   
}
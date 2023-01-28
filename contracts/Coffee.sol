//SPDX-License-Identifier:MIT
pragma solidity 0.8.17;
contract Coffee{

    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory nam,string memory message)public  payable {
        require(msg.value > 0.0002 ether,"Please enter amount greater than 0.0002 ETH.");
        owner.transfer(msg.value);
        memos.push(Memo(nam,message,block.timestamp,msg.sender));
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
}

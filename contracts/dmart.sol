// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DMart {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string image;
        address owner;
    }
    address public admin = msg.sender;
    Product[] public products;
    mapping (uint => bool) isSold;

    modifier Admin() {
        require(
            admin == msg.sender,
            "Only admin have permission to do this action"
        );
        _;
    }

    function addItems(string memory name,uint256 price,string memory image) public {
        uint id = productsLength();
        products.push( Product(id, name, price, image, msg.sender));
        isSold[id]=false;
    }

    function productsLength() public view returns (uint256) {
        return products.length;
    }

    function deleteItem(uint256 id) public {
        require(products[id].owner == msg.sender, "You dont have permission");
        products[id] = products[productsLength() - 1];
        products.pop();
    }

    function buyItem(uint id) public payable {
        Product storage item = products[id];

        require(msg.value == item.price ,'invald price');
        require(msg.sender != item.owner,"You already own this item");
        require(isSold[item.id]==false,"Item is already sold");

        address payable exOwner = payable(item.owner) ;
        exOwner.transfer(msg.value * 98/100);
        payable (admin).transfer(msg.value * 2/100);
        item.owner = msg.sender; 
        isSold[item.id] = true;
    }

}

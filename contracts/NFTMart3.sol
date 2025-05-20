// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./NFTMart2.sol";

contract NFTMart3 is NFTMart2 {
    function MyNfts()
        public
        view
        virtual
        override
        returns (NFT[] memory, NFT[] memory)
    {
        uint256 nftCount;
        uint256 purchesCount;

        // First pass: count matching NFTs
        for (uint256 i = 0; i < nftList.length; i++) {
            if (nftList[i].owner == msg.sender) {
                nftCount++;
                if (nftList[i].isSold == true) {
                    purchesCount++;
                }
            }
        }
        // Allocate memory for results
        NFT[] memory sellList = new NFT[](nftCount);
        NFT[] memory Buylist = new NFT[](purchesCount);
        uint256 x = 0;
        uint256 y = 0;

        // Second pass: collect matching NFTs
        for (uint256 i = 0; i < nftList.length; i++) {
            if (nftList[i].owner == msg.sender) {
                sellList[x] = nftList[i];
                x++;
            }
        }
        for (uint256 i = 0; i < nftList.length; i++) {
            if (nftList[i].owner == msg.sender && nftList[i].isSold == true) {
                Buylist[y] = nftList[i];
                y++;
            }
        }
        return (sellList, Buylist);
    }


    function getContractBalance() public view virtual returns (uint256) {
        return address(this).balance;
    }


    function getUserBalance(address user) public view virtual returns (uint256) {
        return user.balance;
    }
}

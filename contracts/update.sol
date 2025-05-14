// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import './NFTMart.sol';

contract NFTMart2 is NFTMart{
    function NftList() public view virtual override returns (NFT[] memory) {
        uint256 total = 0;

        // Step 1: Count number of NFTs for msg.sender
        for (uint256 i = 0; i < nftListLength(); i++) {
            if (nftList[i].owner == msg.sender && nftList[i].isSold == false) {
                total++;
            }
        }

        // Step 2: Create dynamic array of correct size
        NFT[] memory list = new NFT[](total);
        uint256 count = 0;

        for (uint256 i = 0; i < nftListLength(); i++) {
            if (nftList[i].owner == msg.sender && nftList[i].isSold == false) {
                list[count] = nftList[i];
                count++;
            }
        }
        return list;
    }
}


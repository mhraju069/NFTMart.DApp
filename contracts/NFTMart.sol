// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MyNFT is
    Initializable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint256 public tokenId;

    function initialize() public virtual initializer {
        tokenId = 0;
        __ERC721_init("MyNFT", "MNFT");
        __ERC721URIStorage_init();
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function MintNFT(address user, string memory URI) public onlyOwner {
        _safeMint(user, tokenId);
        _setTokenURI(tokenId, URI);
        tokenId++;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}


contract NFTMart is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    MyNFT myNft;
    enum Category {
        ART,
        IMAGE,
        PHOTOGRAPHY,
        VIDEO,
        GAMES,
        OTHERS
    }
    struct NFT {
        string name;
        uint256 price;
        string image;
        string details;
        Category category;
        address owner;
        bool isSold;
        uint256 tokenId;
    }
    NFT[] public nftList;

    mapping(address => uint256) public myNftCount;

    function initialize() public initializer virtual {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function SetNftAddress(address _address) public onlyOwner {
        myNft = MyNFT(_address);
    }

    function AddItems(
        string memory name,
        uint256 price,
        string memory image_url,
        string memory details,
        Category category
    ) public virtual {
        uint tokenId = myNft.tokenId();
        nftList.push(
            NFT(
                name,
                price,
                image_url,
                details,
                category,
                msg.sender,
                false,
                tokenId
            )
        );
        myNft.MintNFT(msg.sender, image_url);
        myNftCount[msg.sender]++;
    }

    function nftListLength() public view returns (uint256) {
        return nftList.length;
    }

    function deleteItem(uint256 id) public virtual {
        require(nftList[id].owner == msg.sender, "You dont have permission");
        uint256 len = nftListLength();
        nftList[id] = nftList[len - 1];
        nftList.pop();
    }

    function buyItem(uint256 id) public payable virtual {
        NFT storage item = nftList[id];
        require(msg.value == item.price, "invald price");
        require(msg.sender != item.owner, "You already own this item");
        require(item.isSold == false, "Item is already sold");

        address payable exOwner = payable(item.owner);
        exOwner.transfer((msg.value * 98) / 100);
        myNft.transferFrom(item.owner, msg.sender, item.tokenId);
        item.owner = msg.sender;
        item.isSold = true;
    }

    function NftList() public view virtual returns (NFT[] memory) {
        NFT[] memory list = new NFT[](myNftCount[msg.sender]);
        uint256 count;
        for (uint256 i; i < nftListLength(); i++) {
            if (nftList[i].isSold == false) {
                list[count] = nftList[i];
                count++;
            }
        }
        return list;
    }

    function NftListByCategry(
        Category category
    ) public view virtual returns (NFT[] memory) {
        uint256 matchCount;

        // First pass: count matching NFTs
        for (uint256 i = 0; i < nftList.length; i++) {
            if (nftList[i].category == category && nftList[i].isSold == false) {
                matchCount++;
            }
        }
        // Allocate memory for results
        NFT[] memory list = new NFT[](matchCount);
        uint256 index = 0;

        // Second pass: collect matching NFTs
        for (uint256 i = 0; i < nftList.length; i++) {
            if (nftList[i].category == category && nftList[i].isSold == false) {
                list[index] = nftList[i];
                index++;
            }
        }

        return list;
    }

    function MyNfts() public view virtual returns (NFT[] memory, NFT[] memory) {
        uint256 nftCount;
        uint256 purchesCount;

        // First pass: count matching NFTs
        for (uint256 i = 0; i < nftList.length; i++) {
            if (nftList[i].owner == msg.sender) {
                nftCount++;
                if (nftList[i].isSold == false) {
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
}

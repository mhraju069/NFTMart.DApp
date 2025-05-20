# 🖼️ NFTMart.DApp

**NFTMart** is a fully upgradeable NFT marketplace built with Solidity, Hardhat, and React.js. It allows users to mint NFTs, list them for sale, and buy NFTs—all with full MetaMask integration. Smart contracts are upgradeable using the UUPS proxy pattern powered by OpenZeppelin.

> 🔗 Live Demo: Coming Soon  
> 💻 GitHub: [mhraju069/NFTMart.DApp](https://github.com/mhraju069/NFTMart.DApp)

---

## 🧰 Tech Stack

- **Smart Contracts:** Solidity, OpenZeppelin Upgradeable Contracts
- **Development Tools:** Hardhat, Ethers.js
- **Frontend:** React.js, Tailwind CSS
- **Wallet Integration:** MetaMask
- **Upgradeable System:** UUPS (Universal Upgradeable Proxy Standard)

---

## 🔑 Core Features

- ✅ **Mint NFTs (ERC721)**
- 🏪 **List NFTs for Sale**
- 💸 **Buy NFTs with ETH**
- 🔄 **Upgradeable Smart Contracts**
- 🔐 **Auto-Approval on Buy**
- 🗂️ **Categories & Filtering (Backend ready)**

---

## 📁 Project Structure

NFTMart.DApp/
│  ├──backend(Django)
├── contracts/ # Smart contracts (MyNFT, NFTMart)
├── scripts/ # Deployment scripts
├── frontend/ # React + Ethers frontend
│ ├── components/
│ ├── pages/
│ └── utils/
├── hardhat.config.js # Hardhat configuration
└── README.md # This file

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js & npm
- MetaMask Extension
- Hardhat (globally or locally)
- Testnet ETH (for Sepolia testnet)

---

### 🔧 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/mhraju069/NFTMart.DApp.git
cd NFTMart.DApp
Install Dependencies

npm install

⚙️ Compile & Deploy Contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

✏️ Set your .env file with:

PRIVATE_KEY

API_URL (e.g., Alchemy or Infura endpoint)

🌐 Frontend Setup
Navigate to frontend/ and install packages:

cd frontend
npm install
npm run dev
Update contract addresses in utils/config.js after deployment.

🧪 Testing
To run Hardhat tests:


npx hardhat test
🛣️ Roadmap
 NFT Minting

 Marketplace Buy/Sell

 Approval Logic

 React Integration

 IPFS Integration

 Filtering by Category

 Admin Panel for Stats

🧑‍💻 Author
Raju Mahmud
GitHub: @mhraju069
Email: mhraju069@gmail.com

📜 License
This project is licensed under the MIT License. See the LICENSE file for more details.

🤝 Contributing
Pull requests and issues are welcome! Feel free to fork this project and build your own version.

---

Let me know if you want to add:
- Screenshots or a banner
- A demo video link
- Instructions for mainnet deployment  
I can enhance it even further.
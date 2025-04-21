import { useEffect, useState } from 'react';
import particles from './components/particles';
import Nfts from './components/nfts';
import Category from './components/category';
import Home from './components/home';
import './App.css';
import { ethers } from 'ethers';
import ABI from './components/ABI.json'
const contractAddress = '0xA973f1AEbAbce47fD6432a3BEEb7813fD6074Ee4'
function App() {
  const [wallet, setWallet] = useState()
  const [contract, setContract] = useState()

  const init = async () => {
    if (!window.ethereum) {
      alert("Please install metamask")
      return
    }
    try {

      const abi = ABI.abi

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const accounts = await provider.send('eth_requestAccounts', [])
      const contracts = new ethers.Contract(contractAddress, abi, signer)

      setWallet(accounts[0])
      setContract(contracts)
    } catch (err) {
      alert(err.message)
    }
  }






  useEffect(() => {
    particles()
  })

  return (
    <body>
      <div id="particles-js"></div>


      <div class="floating-element floating-element-1"></div>
      <div class="floating-element floating-element-2"></div>
      <div class="floating-element floating-element-3"></div>

      <header>
        <div class="container header-container">
          <a href="/" class="logo">
            <i class="fas fa-atom logo-icon"></i>
            <span>NexusNFT</span>
          </a>

          <nav>
            <ul>
              <li><a href="/">Explore</a></li>
              <li><a href="/">Create</a></li>
              <li><a href="/">Community</a></li>
              <li><a href="/">Resources</a></li>
            </ul>
          </nav>

          <div class="header-actions">
            <button type='button' onClick={init} class="connect-wallet"> {wallet?"Connected":"Connect Wallet"}</button>
            <div class="user-profile">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Profile" />
            </div>
          </div>
        </div>
      </header>


      <Home />

      <Nfts />

      <Category />


      <section class="how-it-works">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">How It Works</h2>
          </div>

          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3 class="step-title">Set Up Your Wallet</h3>
              <p class="step-description">Connect your preferred crypto wallet to our platform. We support MetaMask, WalletConnect, and more.</p>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <h3 class="step-title">Create Your Collection</h3>
              <p class="step-description">Upload your work, add a title and description, and customize your NFTs with properties and unlockable content.</p>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <h3 class="step-title">List Them For Sale</h3>
              <p class="step-description">Choose between auctions, fixed-price listings, and declining-price listings to sell your NFTs.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="trending-collections">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Trending Collections</h2>
            <a href="/" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
          </div>

          <div class="nft-grid">
            <div class="collection-card">
              <div class="collection-header">
                <div class="collection-avatar">
                  <img src="https://source.unsplash.com/random/300x300/?ape" alt="Collection Avatar" />
                </div>
                <div class="collection-info">
                  <h3 class="collection-name">Bored Ape Yacht Club</h3>
                  <div class="collection-creator">
                    <div class="creator-avatar-sm">
                      <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Creator" />
                    </div>
                    <span>@yugalabs</span>
                  </div>
                  <div class="collection-stats">
                    <div class="stat">
                      <div class="stat-value">12.4K</div>
                      <div class="stat-label">Items</div>
                    </div>
                    <div class="stat">
                      <div class="stat-value">4.2K</div>
                      <div class="stat-label">Owners</div>
                    </div>
                    <div class="stat">
                      <div class="stat-value">12.5K</div>
                      <div class="stat-label">ETH</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collection-items">
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,1" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,2" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,3" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,4" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,5" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,6" alt="NFT" />
                </div>
              </div>
            </div>
            <div class="collection-card">
              <div class="collection-header">
                <div class="collection-avatar">
                  <img src="https://source.unsplash.com/random/300x300/?punk" alt="Collection Avatar" />
                </div>
                <div class="collection-info">
                  <h3 class="collection-name">CryptoPunks</h3>
                  <div class="collection-creator">
                    <div class="creator-avatar-sm">
                      <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Creator" />
                    </div>
                    <span>@larvalabs</span>
                  </div>
                  <div class="collection-stats">
                    <div class="stat">
                      <div class="stat-value">10K</div>
                      <div class="stat-label">Items</div>
                    </div>
                    <div class="stat">
                      <div class="stat-value">3.5K</div>
                      <div class="stat-label">Owners</div>
                    </div>
                    <div class="stat">
                      <div class="stat-value">8.7K</div>
                      <div class="stat-label">ETH</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="collection-items">
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,1" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,2" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,3" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,4" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,5" alt="NFT" />
                </div>
                <div class="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,6" alt="NFT" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="newsletter">
        <div class="container">
          <div class="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter to get the latest updates on new drops, featured artists, and exclusive offers.</p>

            <form class="newsletter-form">
              <input type="email" class="newsletter-input" placeholder="Enter your email address" />
              <button type="submit" class="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>


      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="footer-col">
              <div class="footer-logo">
                <i class="fas fa-atom footer-logo-icon"></i>
                <span>NexusNFT</span>
              </div>
              <p class="footer-description">The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens.</p>
              <div class="social-links">
                <a href="/" class="social-link"><i class="fab fa-twitter"></i></a>
                <a href="/" class="social-link"><i class="fab fa-discord"></i></a>
                <a href="/" class="social-link"><i class="fab fa-instagram"></i></a>
                <a href="/" class="social-link"><i class="fab fa-telegram"></i></a>
              </div>
            </div>

            <div class="footer-col">
              <h3 class="footer-title">Marketplace</h3>
              <ul class="footer-links">
                <li><a href="/">All NFTs</a></li>
                <li><a href="/">Art</a></li>
                <li><a href="/">Music</a></li>
                <li><a href="/">Domain Names</a></li>
                <li><a href="/">Virtual Worlds</a></li>
                <li><a href="/">Trading Cards</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3 class="footer-title">My Account</h3>
              <ul class="footer-links">
                <li><a href="/">Profile</a></li>
                <li><a href="/">Favorites</a></li>
                <li><a href="/">Watchlist</a></li>
                <li><a href="/">My Collections</a></li>
                <li><a href="/">Settings</a></li>
                <li><a href="/">Connect Wallet</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3 class="footer-title">Resources</h3>
              <ul class="footer-links">
                <li><a href="/">Help Center</a></li>
                <li><a href="/">Platform Status</a></li>
                <li><a href="/">Partners</a></li>
                <li><a href="/">Blog</a></li>
                <li><a href="/">Newsletter</a></li>
                <li><a href="/">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; 2023 NexusNFT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </body>
  );
}

export default App;

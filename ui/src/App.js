import { useEffect, useState } from 'react';
import Particles from './components/particles';
import Nfts from './components/nfts';
import Category from './components/category';
import Home from './components/home';
import AddNft from './components/addNft';
import './App.css';
import { ethers } from 'ethers';
import ABI from './components/ABI.json'
const contractAddress = '0xA973f1AEbAbce47fD6432a3BEEb7813fD6074Ee4'
function App() {
  const [wallet, setWallet] = useState()
  const [contract, setContract] = useState()
  const [create,setCreate] = useState(false)
  const [home,setHome] = useState(true)
  const [nfts,setNfts] = useState(true)
  const [category,setCategory] = useState(true)


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

  const homeView=()=> {
    if (!home){ setHome(true); setCreate(false);setNfts(true) ;setCategory(true)}
  }
  const createView=()=> {
    if (!create){ setCreate(true); setHome(false) ;setNfts(false);setCategory(false)}
  }
  const categoryView=()=> {
    if (!category){ setHome(true); setCreate(false);setNfts(true);setCategory(true)}
  }






  // useEffect(() => {
  //   particles()
  // })

  return (
    <>
      <Particles />

      <header>
        <div className="container header-container">
          <a href="/" className="logo">
            <i className="fas fa-atom logo-icon"></i>
            <span>NexusNFT</span>
          </a>

          <nav>
            <ul>
              <li><button type='button' onClick={homeView}>Explore</button></li>
              <li><button type='button' onClick={createView} >Create</button></li>
              <li><button type='button' >Community</button></li>
              <li><button type='button' >Resources</button></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button type='button' onClick={init} className="connect-wallet"> {wallet?"Connected":"Connect Wallet"}</button>
            <div className="user-profile">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Profile" />
            </div>
          </div>
        </div>
      </header>


      {home && <Home />}

      { create && <AddNft />}

      {nfts && <Nfts />}

      {category && <Category />}


      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Set Up Your Wallet</h3>
              <p className="step-description">Connect your preferred crypto wallet to our platform. We support MetaMask, WalletConnect, and more.</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Create Your Collection</h3>
              <p className="step-description">Upload your work, add a title and description, and customize your NFTs with properties and unlockable content.</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">List Them For Sale</h3>
              <p className="step-description">Choose between auctions, fixed-price listings, and declining-price listings to sell your NFTs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="trending-collections">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Collections</h2>
            <a href="/" className="view-all">View All <i className="fas fa-arrow-right"></i></a>
          </div>

          <div className="nft-grid">
            <div className="collection-card">
              <div className="collection-header">
                <div className="collection-avatar">
                  <img src="https://source.unsplash.com/random/300x300/?ape" alt="Collection Avatar" />
                </div>
                <div className="collection-info">
                  <h3 className="collection-name">Bored Ape Yacht Club</h3>
                  <div className="collection-creator">
                    <div className="creator-avatar-sm">
                      <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Creator" />
                    </div>
                    <span>@yugalabs</span>
                  </div>
                  <div className="collection-stats">
                    <div className="stat">
                      <div className="stat-value">12.4K</div>
                      <div className="stat-label">Items</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">4.2K</div>
                      <div className="stat-label">Owners</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">12.5K</div>
                      <div className="stat-label">ETH</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collection-items">
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,1" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,2" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,3" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,4" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,5" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?ape,6" alt="NFT" />
                </div>
              </div>
            </div>
            <div className="collection-card">
              <div className="collection-header">
                <div className="collection-avatar">
                  <img src="https://source.unsplash.com/random/300x300/?punk" alt="Collection Avatar" />
                </div>
                <div className="collection-info">
                  <h3 className="collection-name">CryptoPunks</h3>
                  <div className="collection-creator">
                    <div className="creator-avatar-sm">
                      <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Creator" />
                    </div>
                    <span>@larvalabs</span>
                  </div>
                  <div className="collection-stats">
                    <div className="stat">
                      <div className="stat-value">10K</div>
                      <div className="stat-label">Items</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">3.5K</div>
                      <div className="stat-label">Owners</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">8.7K</div>
                      <div className="stat-label">ETH</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collection-items">
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,1" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,2" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,3" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,4" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,5" alt="NFT" />
                </div>
                <div className="collection-item">
                  <img src="https://source.unsplash.com/random/300x300/?punk,6" alt="NFT" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter to get the latest updates on new drops, featured artists, and exclusive offers.</p>

            <form className="newsletter-form">
              <input type="email" className="newsletter-input" placeholder="Enter your email address" />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>


      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <div className="footer-logo">
                <i className="fas fa-atom footer-logo-icon"></i>
                <span>NexusNFT</span>
              </div>
              <p className="footer-description">The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens.</p>
              <div className="social-links">
                <a href="/" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="/" className="social-link"><i className="fab fa-discord"></i></a>
                <a href="/" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="/" className="social-link"><i className="fab fa-telegram"></i></a>
              </div>
            </div>

            <div className="footer-col">
              <h3 className="footer-title">Marketplace</h3>
              <ul className="footer-links">
                <li><a href="/">All NFTs</a></li>
                <li><a href="/">Art</a></li>
                <li><a href="/">Music</a></li>
                <li><a href="/">Domain Names</a></li>
                <li><a href="/">Virtual Worlds</a></li>
                <li><a href="/">Trading Cards</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="footer-title">My Account</h3>
              <ul className="footer-links">
                <li><a href="/">Profile</a></li>
                <li><a href="/">Favorites</a></li>
                <li><a href="/">Watchlist</a></li>
                <li><a href="/">My Collections</a></li>
                <li><a href="/">Settings</a></li>
                <li><a href="/">Connect Wallet</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="footer-title">Resources</h3>
              <ul className="footer-links">
                <li><a href="/">Help Center</a></li>
                <li><a href="/">Platform Status</a></li>
                <li><a href="/">Partners</a></li>
                <li><a href="/">Blog</a></li>
                <li><a href="/">Newsletter</a></li>
                <li><a href="/">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2023 NexusNFT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

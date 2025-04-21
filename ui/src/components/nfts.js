import React from 'react'

export default function nfts() {
  return (
    <section className="featured-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Featured NFTs</h2>
        <a href="/" className="view-all">View All <i className="fas fa-arrow-right"></i></a>
      </div>

      <div className="nft-grid">

        <div className="nft-card">
          <div className="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?abstract,art" alt="Abstract Art NFT" />
            <div className="nft-badge">Hot Bid</div>
          </div>
          <div className="nft-info">
            <h3 className="nft-title">Cosmic Harmony /1245</h3>
            <div className="nft-creator">
              <div className="creator-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Creator" />
              </div>
              <span>@digitalartist</span>
            </div>
            <div className="nft-details">
              <div className="nft-price">
                <span className="price-label">Current Bid</span>
                <span className="price-value"><i className="fab fa-ethereum"></i> 0.45 ETH</span>
              </div>
              <div className="nft-actions">
                <button className="action-btn"><i className="far fa-heart"></i></button>
                <button className="action-btn"><i className="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="nft-card">
          <div className="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?digital,art" alt="Digital Art NFT" />
            <div className="nft-badge">New</div>
          </div>
          <div className="nft-info">
            <h3 className="nft-title">Neon Dreams /4592</h3>
            <div className="nft-creator">
              <div className="creator-avatar">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Creator" />
              </div>
              <span>@neoncreator</span>
            </div>
            <div className="nft-details">
              <div className="nft-price">
                <span className="price-label">Current Bid</span>
                <span className="price-value"><i className="fab fa-ethereum"></i> 1.25 ETH</span>
              </div>
              <div className="nft-actions">
                <button className="action-btn"><i className="far fa-heart"></i></button>
                <button className="action-btn"><i className="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="nft-card">
          <div className="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?crypto,art" alt="Crypto Art NFT" />
          </div>
          <div className="nft-info">
            <h3 className="nft-title">Blockchain Warriors /7831</h3>
            <div className="nft-creator">
              <div className="creator-avatar">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Creator" />
              </div>
              <span>@cryptoartist</span>
            </div>
            <div className="nft-details">
              <div className="nft-price">
                <span className="price-label">Current Bid</span>
                <span className="price-value"><i className="fab fa-ethereum"></i> 2.75 ETH</span>
              </div>
              <div className="nft-actions">
                <button className="action-btn"><i className="far fa-heart"></i></button>
                <button className="action-btn"><i className="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div className="nft-card">
          <div className="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?future,art" alt="Future Art NFT" />
            <div className="nft-badge">Auction</div>
          </div>
          <div className="nft-info">
            <h3 className="nft-title">Digital Utopia /3267</h3>
            <div className="nft-creator">
              <div className="creator-avatar">
                <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Creator" />
              </div>
              <span>@futurist</span>
            </div>
            <div className="nft-details">
              <div className="nft-price">
                <span className="price-label">Current Bid</span>
                <span className="price-value"><i className="fab fa-ethereum"></i> 0.89 ETH</span>
              </div>
              <div className="nft-actions">
                <button className="action-btn"><i className="far fa-heart"></i></button>
                <button className="action-btn"><i className="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

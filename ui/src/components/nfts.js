import React from 'react'

export default function nfts() {
  return (
    <section class="featured-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Featured NFTs</h2>
        <a href="/" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
      </div>

      <div class="nft-grid">

        <div class="nft-card">
          <div class="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?abstract,art" alt="Abstract Art NFT" />
            <div class="nft-badge">Hot Bid</div>
          </div>
          <div class="nft-info">
            <h3 class="nft-title">Cosmic Harmony /1245</h3>
            <div class="nft-creator">
              <div class="creator-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Creator" />
              </div>
              <span>@digitalartist</span>
            </div>
            <div class="nft-details">
              <div class="nft-price">
                <span class="price-label">Current Bid</span>
                <span class="price-value"><i class="fab fa-ethereum"></i> 0.45 ETH</span>
              </div>
              <div class="nft-actions">
                <button class="action-btn"><i class="far fa-heart"></i></button>
                <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="nft-card">
          <div class="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?digital,art" alt="Digital Art NFT" />
            <div class="nft-badge">New</div>
          </div>
          <div class="nft-info">
            <h3 class="nft-title">Neon Dreams /4592</h3>
            <div class="nft-creator">
              <div class="creator-avatar">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Creator" />
              </div>
              <span>@neoncreator</span>
            </div>
            <div class="nft-details">
              <div class="nft-price">
                <span class="price-label">Current Bid</span>
                <span class="price-value"><i class="fab fa-ethereum"></i> 1.25 ETH</span>
              </div>
              <div class="nft-actions">
                <button class="action-btn"><i class="far fa-heart"></i></button>
                <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="nft-card">
          <div class="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?crypto,art" alt="Crypto Art NFT" />
          </div>
          <div class="nft-info">
            <h3 class="nft-title">Blockchain Warriors /7831</h3>
            <div class="nft-creator">
              <div class="creator-avatar">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Creator" />
              </div>
              <span>@cryptoartist</span>
            </div>
            <div class="nft-details">
              <div class="nft-price">
                <span class="price-label">Current Bid</span>
                <span class="price-value"><i class="fab fa-ethereum"></i> 2.75 ETH</span>
              </div>
              <div class="nft-actions">
                <button class="action-btn"><i class="far fa-heart"></i></button>
                <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div class="nft-card">
          <div class="nft-image">
            <img src="https://source.unsplash.com/random/600x600/?future,art" alt="Future Art NFT" />
            <div class="nft-badge">Auction</div>
          </div>
          <div class="nft-info">
            <h3 class="nft-title">Digital Utopia /3267</h3>
            <div class="nft-creator">
              <div class="creator-avatar">
                <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Creator" />
              </div>
              <span>@futurist</span>
            </div>
            <div class="nft-details">
              <div class="nft-price">
                <span class="price-label">Current Bid</span>
                <span class="price-value"><i class="fab fa-ethereum"></i> 0.89 ETH</span>
              </div>
              <div class="nft-actions">
                <button class="action-btn"><i class="far fa-heart"></i></button>
                <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

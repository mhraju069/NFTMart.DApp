import React from 'react'

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Discover, Collect & Sell Extraordinary NFTs</h1>
                        <p>Explore the world's first and largest NFT marketplace with over 10,000+ digital assets. Join our community of creators and collectors.</p>

                        <div className="hero-buttons">
                            <a href="/" className="btn btn-primary">Explore Now</a>
                            <a href="/" className="btn btn-secondary">Create NFT</a>
                        </div>

                        <div className="stats">
                            <div className="stat-item">
                                <div className="stat-value">10K+</div>
                                <div className="stat-label">Digital Assets</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">5K+</div>
                                <div className="stat-label">Artists</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">100K+</div>
                                <div className="stat-label">Transactions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


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


            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Browse Categories</h2>
                        <a href="/" className="view-all">View All <i className="fas fa-arrow-right"></i></a>
                    </div>

                    <div className="categories-grid">
                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-paint-brush"></i></div>
                            <h3 className="category-title">Art</h3>
                            <div className="category-count">1,245 Items</div>
                        </div>

                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-music"></i></div>
                            <h3 className="category-title">Music</h3>
                            <div className="category-count">892 Items</div>
                        </div>

                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-gamepad"></i></div>
                            <h3 className="category-title">Games</h3>
                            <div className="category-count">1,567 Items</div>
                        </div>

                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-image"></i></div>
                            <h3 className="category-title">Photography</h3>
                            <div className="category-count">743 Items</div>
                        </div>

                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-film"></i></div>
                            <h3 className="category-title">Video</h3>
                            <div className="category-count">621 Items</div>
                        </div>

                        <div className="category-card">
                            <div className="category-icon"><i className="fas fa-globe"></i></div>
                            <h3 className="category-title">Virtual Worlds</h3>
                            <div className="category-count">432 Items</div>
                        </div>
                    </div>
                </div>
            </section>


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
    )
}

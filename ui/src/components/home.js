import { useEffect, useState } from 'react'
import MediaRenderer from './mediaRender';
import { ethers, parseEther, formatEther } from 'ethers';

export default function Home({ contract, wallet, exploreView , createView}) {
    const [allNfts, setAllNfts] = useState([]);

    const getNfts = async () => {
        try {
            const list = []
            const count = await contract.nftListLength()
            for (let i = 0; i < count; i++) {
                const item = await contract.nftList(i);
                list.push(item)
            }
            setAllNfts(list);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getNfts();
    }, [contract, wallet]);


    const BuyItem = async (tokenId, price) => {
        try {
            const buy = await contract.BuyItem(tokenId, { value: parseEther(price) });
            await buy.wait();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Discover, Collect & Sell Extraordinary NFTs</h1>
                        <p>Explore the world's first and largest NFT marketplace with over 10,000+ digital assets. Join our community of creators and collectors.</p>

                        <div className="hero-buttons">
                            <span onClick={exploreView} type='button' className="btn btn-primary">Explore Now</span>
                            <span onClick={createView} type='button' className="btn btn-secondary">Create NFT</span>
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
                        <span type="button" onClick={() => exploreView(true)} className="view-all" style={{cursor:"pointer"}} >View All <i className="fas fa-arrow-right"></i></span>
                    </div>

                    <div className="nft-grid">
                        {allNfts.map((item, i) => (
                            <div className="nft-card" key={i}>
                                <div className="nft-image">
                                    <MediaRenderer item={item} file={item.image} />
                                    <div className="nft-badge">New</div>
                                </div>
                                <div className="nft-info">
                                    <h3 className="nft-title">{item.name}</h3>
                                    <div className="nft-creator">
                                        <span>Owner: {item.owner.toString().slice(0, 6) + '....' + item.owner.toString().slice(-5)}</span>
                                    </div>
                                    <div className="nft-details">
                                        <div className="nft-price">
                                            <span className="price-label">Price </span>
                                            <span className="price-value"><i className="fab fa-ethereum"></i>{formatEther(item.price)} ETH</span>
                                        </div>
                                        <div className="nft-actions">
                                            <button className="action-btn"><i className="far fa-heart"></i></button>
                                            <button className="action-btn" onClick={() => BuyItem(item.tokenId, item.price)}><i className="fas fa-shopping-cart"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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

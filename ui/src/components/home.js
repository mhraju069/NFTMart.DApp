import { useEffect, useState } from 'react'
import MediaRenderer from './mediaRender';
import { formatEther } from 'ethers';
import Alert from './alert';
import useApprovalCheck from './approve'
import axios from 'axios';
const martAddress = '0x43803687E0dA670D751bb7D6B1CA96e18FD5A527'

export default function Home({ contract, wallet, exploreView, createView, setLoading }) {
    const [allNfts, setAllNfts] = useState([]);



    const getNfts = async () => {
        try {
            setLoading(true)
            const list = []
            const count = await contract.nftListLength()
            for (let i = 0; i < count; i++) {
                const item = await contract.nftList(i);
                const user = await axios.get(`http://127.0.0.1:8000/api/profiledata/${item.owner}/`)
                list.push({
                    owner: item.owner,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    tokenId: item.tokenId,
                    category: item.category,
                    profileName: user.data.name,
                    profileImage: user.data.image ? `http://127.0.0.1:8000${user.data.image}` : null
                });
            }
            setAllNfts(list);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        if (contract) getNfts();
    }, [contract, wallet]);


    const BuyItem = async (tokenId, price) => {
        const approved = await useApprovalCheck(martAddress)
        if (!approved) return
        if (!wallet) { Alert("Please connect your wallet first"); return }
        console.log(formatEther(price))
        setLoading(true)
        try {
            const buy = await contract.buyItem(tokenId, { value: price });
            await buy.wait();
            Alert("Item purchased successfully", "success")

        } catch (e) {
            Alert("Item purchased failed", "error")
            console.log(e);
        }
        setLoading(false)
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
                        <span type="button" onClick={() => exploreView(true)} className="view-all" style={{ cursor: "pointer" }} >View All <i className="fas fa-arrow-right"></i></span>
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
                                        <img src={item.profileImage} alt="Creator" className="creator-avatar" />
                                        <span>{item.profileName} ({item.owner?.toString().slice(0, 5) + '....' + item.owner?.toString().slice(-4)})</span>
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

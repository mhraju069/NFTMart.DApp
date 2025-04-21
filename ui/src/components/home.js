import React from 'react'

export default function Home() {
    return (
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
    )
}

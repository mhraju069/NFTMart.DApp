import { useEffect, useState } from 'react';

export default function Categorywise({ contract, Wallet }) {
    const [allNfts, setAllNfts] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(allNfts.length / itemsPerPage);

    useEffect(() => {
        const getNfts = async () => {
            try {
                const list = await contract.NftList();
                setAllNfts(list);
            } catch (e) {
                console.log(e);
            }
        };
        getNfts();
    }, [contract, Wallet]);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setNfts(allNfts.slice(start, end));
    }, [currentPage, allNfts]);

    const getNftsByCategory = async (category) => {
        try {
            const list = await contract.NftListByCategry(category);
            setAllNfts(list);
            setCurrentPage(1);
        } catch (e) {
            console.log(e);
        }
    };

    const BuyItem = async (id,price) => {
        try {
            const buy = await contract.BuyItem(id,{value:price});
            await buy.wait();
        } catch (e) {
            console.log(e);
        }
    };

    const handlePageClick = (pageNum) => setCurrentPage(pageNum);
    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className='container'>

            {/* Category Filter Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Browse Categories</h2>
                        <a href="/" className="view-all">View All <i className="fas fa-arrow-right"></i></a>
                    </div>

                    <div className="categories-grid">
                        <span type="button" onClick={() => getNftsByCategory(1)} className="category-card">
                            <div className="category-icon"><i className="fas fa-paint-brush"></i></div>
                            <h3 className="category-title">Art</h3>
                            <div className="category-count">1,245 Items</div>
                        </span>

                        <span type="button" onClick={() => getNftsByCategory(2)} className="category-card">
                            <div className="category-icon"><i className="fas fa-image"></i></div>
                            <h3 className="category-title">Photography</h3>
                            <div className="category-count">743 Items</div>
                        </span>

                        <span type="button" onClick={() => getNftsByCategory(3)} className="category-card">
                            <div className="category-icon"><i className="fas fa-music"></i></div>
                            <h3 className="category-title">Music</h3>
                            <div className="category-count">892 Items</div>
                        </span>

                        <span type="button" onClick={() => getNftsByCategory(4)} className="category-card">
                            <div className="category-icon"><i className="fas fa-film"></i></div>
                            <h3 className="category-title">Video</h3>
                            <div className="category-count">621 Items</div>
                        </span>

                        <span type="button" className="category-card">
                            <div className="category-icon"><i className="fas fa-gamepad"></i></div>
                            <h3 className="category-title">Games</h3>
                            <div className="category-count">1,567 Items</div>
                        </span>

                        <span type="button" className="category-card">
                            <div className="category-icon"><i className="fas fa-globe"></i></div>
                            <h3 className="category-title">Virtual Worlds</h3>
                            <div className="category-count">432 Items</div>
                        </span>
                    </div>
                </div>
            </section>

            {/* NFT Grid Section */}
            <section className="nft-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Digital Art NFTs</h2>
                        <div className="sort-options">
                            <span className="sort-label">Sort by:</span>
                            <select className="sort-select">
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="most-viewed">Most Viewed</option>
                            </select>
                        </div>
                    </div>

                    <div className="nft-grid">
                        {nfts.map((item, i) => (
                            <div className="nft-card" key={i}>
                                <div className="nft-image">
                                    <img src="{item.image} " alt="{item.name}" />
                                    <div className="nft-badge">New</div>
                                </div>
                                <div className="nft-info">
                                    <h3 className="nft-title">{item.name}</h3>
                                    <div className="nft-creator">
                                        {/* <div className="creator-avatar">
                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Creator" />
                                        </div> */}
                                        <span>Owner: {item.owner}</span>
                                    </div>
                                    <div className="nft-details">
                                        <div className="nft-price">
                                            <span className="price-label">Price </span>
                                            <span className="price-value"><i className="fab fa-ethereum"></i>{item.price} ETH</span>
                                        </div>
                                        <div className="nft-actions">
                                            <button className="action-btn"><i className="far fa-heart"></i></button>
                                            <button className="action-btn" onClick={() => BuyItem(i,item.price)}><i className="fas fa-shopping-cart"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <button
                            className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={handlePrev}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => handlePageClick(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={handleNext}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
}

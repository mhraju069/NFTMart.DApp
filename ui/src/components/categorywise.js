import { useEffect, useState } from 'react';
import { ethers, parseEther, formatEther } from 'ethers';
import MediaRenderer from './mediaRender';

export default function Categorywise({ contract, wallet }) {
    const [allNfts, setAllNfts] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nftCount, setNftCount] = useState(0);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(allNfts.length / itemsPerPage);

    const getNfts = async () => {
        try {
            const list = []
            const count = await contract.nftListLength()
            for (let i = 0; i < count; i++) {
                const item = await contract.nftList(i);
                list.push(item)
            }
            console.log(list)
            setAllNfts(list);
            setCurrentPage(1);
            setNftCount(count)
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getNfts();
    }, [contract, wallet]);


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

    const BuyItem = async (tokenId, price) => {
        try {
            const buy = await contract.BuyItem(tokenId, { value: parseEther(price) });
            await buy.wait();
        } catch (e) {
            console.log(e);
        }
    };


    // const MediaRenderer = ({ item, file }) => {
    //     if (!item || !file) {
    //         return <p>❌ Invalid media data.</p>;
    //     }
    //     const fileUrl = `https://ipfs.io/ipfs/${file.replace("ipfs://", "")}`;
    //     const category = Number((item.category).toString())
    //     console.log("category: ", category)
    //     if (category == 1 || category == 2) {
    //         return <img src={fileUrl} style={{ maxWidth: '100%', borderRadius: '10px' }} />;
    //     } else if (category == 3) {
    //         return (
    //             <>
    //                 <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGkzbzR1dG5ldm95ZTluNDZ3OHpxNWlmcG9uOWF1MW55MHl2ZHFkeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UUcRUn7c9mKCULj9Eq/giphy.gif" alt="" style={{ maxWidth: '100%', borderRadius: '10px', height: '79%', objectFit: 'cover', }} />
    //                 <audio  controls style={{
    //                     width: '100%',
    //                     backgroundColor: 'var(--gray)',
    //                     borderRadius: '8px', // Optional: if you want rounded corners
    //                     border: 'none', // Removes any default border
    //                 }}>
    //                     <source src={fileUrl} type="audio/mpeg" />
    //                     Your browser does not support the audio element.
    //                 </audio>
    //             </>
    //         );
    //     } else if (category == 4) {
    //         return (
    //             <video width="100%" controls style={{ borderRadius: '10px', height: '100%', objectFit: 'cover' }}>
    //                 <source src={fileUrl} type="video/mp4" />
    //                 Your browser does not support the video tag.
    //             </video>
    //         );
    //     } else {
    //         return <p>📁 Unsupported or unknown file type.</p>;
    //     }
    // };




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
                        <span type="button" onClick={() => getNfts()} className="category-card">
                            <div className="category-icon"><i className="fas fa-image"></i></div>
                            <h3 className="category-title">See All</h3>
                            <div className="category-count">{nftCount} Items</div>
                        </span>


                        <span type="button" onClick={() => getNftsByCategory(1)} className="category-card">
                            <div className="category-icon"><i className="fas fa-paint-brush"></i></div>
                            <h3 className="category-title">Art</h3>
                            <div className="category-count">1,245 Items</div>
                        </span>

                        <span type="button" onClick={() => getNftsByCategory(2)} className="category-card">
                            <div className="category-icon"><i className="fas fa-image"></i></div>
                            <h3 className="category-title">Image</h3>
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

                        <span type="button" onClick={() => getNftsByCategory(5)} className="category-card">
                            <div className="category-icon"><i className="fas fa-gamepad"></i></div>
                            <h3 className="category-title">Others</h3>
                            <div className="category-count">1,567 Items</div>
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

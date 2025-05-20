import { useEffect, useState } from 'react';
import { formatEther } from 'ethers';
import MediaRenderer from './mediaRender';
import Alert from './alert';
import axios from 'axios';
import useApprovalCheck from './approve'
const martAddress = '0x43803687E0dA670D751bb7D6B1CA96e18FD5A527'

export default function Categorywise({ contract, wallet, setLoading }) {
    const [allNfts, setAllNfts] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nftCount, setNftCount] = useState(0);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(allNfts.length / itemsPerPage);

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
            setCurrentPage(1);
            setNftCount(count)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
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
            const list = []
            setLoading(true)
            const items = await contract.NftListByCategry(category);
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
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
            console.log(list)
            setAllNfts(list);
            setCurrentPage(1);
        } catch (e) {
            console.log(e);
            Alert("Something went wrong", "error")
        } finally {
            setLoading(false)
        }
    };

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
                    {/* NFT Cards */}
                    {allNfts.length !== 0 ?
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
                        :
                        <h1>No NFT Found</h1>
                    }
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
            </section >
        </div >
    );
}

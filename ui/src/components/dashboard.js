import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faImage,
  faShoppingBag,
  faCog,
  faWallet,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Alert from "./alert";
import MediaRenderer from "./mediaRender";
import { formatEther } from "ethers";




const NFTDashboard = ({ profile, addrs, wallet, access, contract, setLoading }) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState('my-nfts');
  const [name, setName] = useState()
  const [bio, setBio] = useState()
  const [email, setEmail] = useState()
  const [sellNFT, setSellNFT] = useState()
  const [buyNFT, setBuyNFT] = useState()
  const [balance, setBalance] = useState(0)
  const [contractBalance, setContractBalance] = useState(false)



  useEffect(() => {
    if (profile?.image) {
      setImage(`http://127.0.0.1:8000${profile.image}`);
    }
    if (profile?.name) {
      setName(profile.name);
    }
    if (profile?.bio) {
      setBio(profile.bio);
    }
    if (profile?.email) {
      setEmail(profile.email);
    }

  }, [profile]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('email', email);
    formData.append('image', inputRef.current.files[0]);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/updateprofile/${wallet}/`, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      Alert('Profile updated successfully!', 'success');
    } catch (error) {
      console.error(error);
      Alert('Something went wrong, please try again', 'error');
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleOverlayClick = () => {
    inputRef.current.click();
  };

  const DeleteItem = async (id) => {
  Alert("Delete this NFT?", "delete", async () => {
    try {
      const tx = await contract.deleteItem(id);
      await tx.wait();
      Alert("Item removed successfully", "success");
    } catch (e) {
      Alert("Something went wrong", "error");
      console.error(e);
    }
  });
};


  useEffect(() => {
    const Fetchdata = async () => {
      try {
        setLoading(true)
        const sellNfts = []
        const buyNfts = []
        const [sellList, buyList] = await contract.MyNfts();
        const balance = await contract.getUserBalance(wallet); setBalance(balance);
        const owner = await contract.owner()
        if (await owner.toLowerCase() == wallet.toLowerCase()) { const contractbalance = await contract.getContractBalance(); setContractBalance(contractbalance); }
        const user = await axios.get(`http://127.0.0.1:8000/api/profiledata/${wallet}/`)
        for (let i = 0; i < sellList.length; i++) {
          const item = sellList[i]
          sellNfts.push({
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
        for (let i = 0; i < buyList.length; i++) {
          const item = buyList[i]
          buyNfts.push({
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
        setSellNFT(sellNfts);
        setBuyNFT(buyNfts)
        console.log('sellNfts', sellNfts);
        console.log('buyNfts', buyNfts);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    };
    if (contract) Fetchdata();
  }, [])



  return (
    <div className="dashboard-container">


      {/* Sidebar */}
      <div className="sidebar">

        <div className="sidebar-menu">


          <div
            className={`menu-item ${activeTab === 'my-nfts' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-nfts')}
          >
            <FontAwesomeIcon icon={faImage} className="menu-icon" />
            <span>All NFTs</span>
          </div>

          <div
            className={`menu-item ${activeTab === 'purchased' ? 'active' : ''}`}
            onClick={() => setActiveTab('purchased')}
          >
            <FontAwesomeIcon icon={faShoppingBag} className="menu-icon" />
            <span>Purchased NFTs</span>
          </div>

          <div
            className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
            <span>Edit Profile</span>
          </div>

          <div className={`menu-item ${activeTab === 'wallet' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallet')}>
            <FontAwesomeIcon icon={faWallet} className="menu-icon" />
            <span>Wallet</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="menu-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">


        {activeTab === 'my-nfts' && (
          <div className="nfts-section">
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
                {sellNFT?.length !== 0 ?
                  <div className="nft-grid">
                    {sellNFT?.map((item, i) => (
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
                              <button className="action-btn dlt" onClick={() => DeleteItem(item.tokenId)}><i className="fas fa-trash-alt"></i></button>
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
                {/* <div className="pagination">
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
                </div> */}

              </div>
            </section >
          </div>
        )}

        {activeTab === 'purchased' && (
          <div className="nfts-section">
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
                {buyNFT?.length !== 0 ?
                  <div className="nft-grid">
                    {buyNFT?.map((item, i) => (
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
                            {/* <div className="nft-actions">
                              <button className="action-btn"><i className="far fa-heart"></i></button>
                              <button className="action-btn" onClick={() => BuyItem(item.tokenId, item.price)}><i className="fas fa-shopping-cart"></i></button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  :
                  <h1>No NFT Found</h1>
                }
                {/* Pagination */}
                {/* <div className="pagination">
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
                </div> */}

              </div>
            </section >
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2 className="section-title">Edit Profile</h2>

            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-container">
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

                  <div className="avatar-overlay" onClick={handleOverlayClick}>
                    {image ? (
                      <>
                        <img src={image} alt="Selected" className="profile-avatar" />
                        <span>Change</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-circle" style={{ fontSize: "7rem", color: "#2a2a3a" }} />
                        <span>Change</span>
                      </>
                    )}
                  </div>
                </div>
                <p className="profile-wallet">{addrs}</p>
              </div>

              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Display Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Bio</label>
                  <textarea
                    id="description"
                    name="description"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Tell us about yourself"

                    cols="50"

                  />
                </div>

                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="settings-section">
            <h2 className="section-title">Wallet</h2>
            {contractBalance && <p className="coming-soon">Your Contract balance : {formatEther(contractBalance.toString())} ETH</p>}
            <p className="coming-soon">Your Wallet balance : {formatEther(balance.toString())} ETH</p>
          </div>
        )}
      </div>
    </div>
  );
};

// CSS Styles
const styles = `

  .dashboard-container {
    display: flex;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }



  /* Sidebar Styles */
  .sidebar {
    width: var(--sidebar-width);
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 10;
  }

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.5rem;
    font-weight: 700;
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .logo-icon {
    font-size: 1.8rem;
  }

  .sidebar-menu {
    flex: 1;
    padding: 1.5rem 0;
  }

  .menu-item {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem 0;
    position: relative;
  }

  .menu-item:hover {
    background: rgba(110, 69, 226, 0.2);
    color: var(--secondary);
  }

  .menu-item.active {
    background: rgba(110, 69, 226, 0.3);
    color: var(--secondary);
  }

  .menu-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: var(--gradient);
  }

  .menu-icon {
    width: 20px;
    text-align: center;
  }

  .sidebar-footer {
    padding: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Main Content Styles */
  .main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    position: relative;
    display: inline-block;
  }

  .section-title::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 4px;
    bottom: -10px;
    left: 0;
    background: var(--gradient);
    border-radius: 2px;
  }

  /* Profile Section */
  .profile-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 800px;
    margin: 0 auto;
  }

  .profile-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .avatar-container {
    width: 120px;
    height: 120px;
    margin: 0 auto 1rem;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--secondary);
  }

  .profile-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(110, 69, 226, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.3s ease;
    color: white;
    font-size: 0.9rem;
  }
 .avatar-overlay span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity : 0;
    transition: opacity 0.3s ease;
    background-color: var(--transparent);
    color: var(--light);
    font-size: 1rem;
    cursor: pointer;
  }

  .avatar-container:hover .avatar-overlay span {
    opacity: 1;
 
  }

  .profile-name {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .profile-wallet {
    color: var(--secondary);
    font-size: 0.9rem;
    word-break: break-all;
  }

  /* Form Styles */
  .profile-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    flex-grow: 2;
    margin-top: 2rem;
    
    gap: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--dark);
    box-shadow: 0 0 0 3px rgba(110, 69, 226, 0.3);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 100px;
  }

  .save-btn {
    grid-column: 1 / -1;
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .save-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(110, 69, 226, 0.3);
  }

  /* NFTs Grid */
  .nfts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .coming-soon {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    opacity: 0.7;
    font-style: italic;
  }

  /* Responsive Design */
  @media (max-width: 992px) {
    .profile-form {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 80px;
    }

    .sidebar-header span,
    .menu-item span {
      display: none;
    }

    .logo {
      justify-content: center;
    }

    .menu-item {
      justify-content: center;
    }
  }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
styleSheet.innerHTML = styles; // ✅ পরিবর্তে innerText নয়
document.head.appendChild(styleSheet);


export default NFTDashboard;
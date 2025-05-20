import { useEffect, useState } from 'react';
import Particles from './components/particles';
import Home from './components/home';
import AddNft from './components/addNft';
import Categorywise from './components/categorywise';
import './App.css';
import { JsonRpcProvider, Contract } from 'ethers'
import Loader from './components/loader';
import ConnectWallet from './components/ConnectWallet';
import ABI from './components/ABI.json'
import NFTDashboard from './components/dashboard';


const contractAddress = '0x43803687E0dA670D751bb7D6B1CA96e18FD5A527'


function App() {
  const [contracts, setContracts] = useState(null)
  const [createview, setCreateview] = useState(false)
  const [homeview, setHomeview] = useState(true)
  const [exploreview, setExploreview] = useState(false)
  const [dashboardview, setDashboardview] = useState(false)


  const { Connect, setLoading, wallet, addrs, loading, profile, access,contract } = ConnectWallet()


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/TmhREneR_zfjyZ4i88_rUGBMztgR9UP0")
        const contracts = new Contract(contractAddress, ABI.abi, provider)
        setContracts(contracts)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchdata()
  }, [])


  const homeView = () => {
    if (!homeview) { setHomeview(true); setCreateview(false); setExploreview(false); setDashboardview(false) }
  }
  const exploreView = () => {
    if (!exploreview) { setCreateview(false); setHomeview(false); setExploreview(true); setDashboardview(false) }
  }
  const createView = () => {
    if (!createview) { setCreateview(true); setHomeview(false); setExploreview(false); setDashboardview(false) }
  }
  const dashboardView = () => {
    if (!dashboardview) { setDashboardview(true); setCreateview(false); setHomeview(false); setExploreview(false) }
  }

  return (
    <>
      <Particles />

      <header>
        <div className="container header-container">
          <a href="/" className="logo">
            <i className="fas fa-atom logo-icon"></i>
            <span>NexusNFT</span>
          </a>

          {!homeview && <nav>
            <ul>
              <li><button type='button' onClick={homeView}>Home</button></li>
              <li><button type='button' onClick={exploreView}>Explore</button></li>
              <li><button type='button' onClick={createView} >Create</button></li>
              <li><button type='button' disabled >Community</button></li>
            </ul>
          </nav>}

          <div className="header-actions">
            <button type='button' onClick={Connect} className="connect-wallet"> {wallet ? addrs : "Connect Wallet"}</button>
            {profile && <>
              <label className="event-wrapper">
                <input type="checkbox" className="event-wrapper-inp" />

                <div className="bar">
                  {profile.image ? <img className='profile_picture' src={`http://127.0.0.1:8000${profile.image}`} alt="User Image" />
                    : <i className="fas fa-user-circle" style={{ fontSize: "1.8rem", color: "white" }}></i>
                  }
                </div>

                <section className="menu-container">
                  <button className="menu-list"  type='button' onClick={dashboardView} >Dashboard</button>
                  <button className="menu-list"  type='button' onClick={dashboardView} >Log Out</button>

                </section>
              </label>



            </>
            }
          </div>
        </div>
      </header>


      {homeview && <Home contract={contracts} wallet={wallet} exploreView={exploreView} createView={createView} setLoading={setLoading} />}
      {exploreview && < Categorywise contract={contracts} setLoading={setLoading} wallet={wallet} />}
      {createview && <AddNft contract={contract} wallet={wallet} setLoading={setLoading} profile={profile} />}
      {loading && <Loader />}
      {dashboardview && < NFTDashboard profile={profile} addrs={addrs} wallet={wallet} access={access} contract={contract} setLoading={setLoading} />}

    </>
  );
}

export default App;

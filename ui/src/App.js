import { useEffect, useState } from 'react';
import Particles from './components/particles';
import Home from './components/home';
import AddNft from './components/addNft';
import Categorywise from './components/categorywise';
import './App.css';
import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers';
import ABI from './components/ABI.json'
import Loader from './components/loader';
import Alert from './components/alert';

const contractAddress = '0x43803687E0dA670D751bb7D6B1CA96e18FD5A527'


function App() {
  const [wallet, setWallet] = useState(null)
  const [contract, setContract] = useState(null)
  const [createview, setCreateview] = useState(false)
  const [homeview, setHomeview] = useState(true)
  const [exploreview, setExploreview] = useState(false)
  const [addrs, setAddrs] = useState()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchdata = async () => {
      if (!window.ethereum) {
        alert("Please install metamask")
        return
      }
      try {
        const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/TmhREneR_zfjyZ4i88_rUGBMztgR9UP0")
        const contracts = new Contract(contractAddress, ABI.abi, provider)
        setContract(contracts)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchdata()
  }, [])


  const Connect = async () => {
    try {
      setLoading(true)
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contracts = new Contract(contractAddress, ABI.abi, signer)
      const accounts = await signer.getAddress()
      setContract(contracts)
      setWallet(accounts)
      setAddrs(accounts.toString().slice(0, 6) + '....' + accounts.toString().slice(-5))
      Alert("Wallet Connected", "success")
    } catch (err) {
      Alert("Wallet Connection failed", "error")
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }


  const homeView = () => {
    if (!homeview) { setHomeview(true); setCreateview(false); setExploreview(false) }
  }
  const exploreView = () => {
    if (!exploreview) { setCreateview(false); setHomeview(false); setExploreview(true) }
  }
  const createView = () => {
    if (!createview) { setCreateview(true); setHomeview(false); setExploreview(false) }
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
            <div className="user-profile">
              <i className='fas fa-user-circle' />
            </div>
          </div>
        </div>
      </header>


      {homeview && <Home contract={contract} wallet={wallet} exploreView={exploreView} createView={createView} setLoading={setLoading} />}
      {exploreview && < Categorywise contract={contract} setLoading={setLoading} wallet={wallet}/>}
      {createview && <AddNft contract={contract} wallet={wallet} setLoading={setLoading} />}
      {loading && <Loader />}

    </>
  );
}

export default App;

import { useEffect, useState } from 'react';
import Particles from './components/particles';
import Home from './components/home';
import AddNft from './components/addNft';
import Categorywise from './components/categorywise';
import './App.css';
import { BrowserProvider, Contract } from 'ethers';
import ABI from './components/ABI.json'
const contractAddress = '0xA973f1AEbAbce47fD6432a3BEEb7813fD6074Ee4'
function App() {
  const [wallet, setWallet] = useState('')
  const [contract, setContract] = useState('')
  const [createview, setCreateview] = useState(false)
  const [homeview, setHomeview] = useState(true)
  const [exploreview, setExploreview] = useState(false)
  const [addrs, setAddrs] = useState()
  const [signer, setSigner] = useState()

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        alert("Please install metamask")
        return
      }
      try {
        const provider = new BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contracts = new Contract(contractAddress, ABI.abi, signer)
        setSigner(signer)
        setContract(contracts)
      } catch (err) {
        console.log(err.message)
      }
    }
    init()
  }, [])


  const Connect = async () => {
    try {
      const accounts = await signer.getAddress()
      setWallet(accounts)
      setAddrs(accounts.toString().slice(0, 6) + '....' + accounts.toString().slice(-5))
    } catch (err) {
      console.log(err.message)
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

          <nav>
            <ul>
              <li><button type='button' onClick={homeView}>Home</button></li>
              <li><button type='button' onClick={exploreView}>Explore</button></li>
              <li><button type='button' onClick={createView} >Create</button></li>
              <li><button type='button' disabled >Community</button></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button type='button' onClick={Connect} className="connect-wallet"> {wallet ? addrs : "Connect Wallet"}</button>
            <div className="user-profile">
              <i className='fas fa-user-circle' />
            </div>
          </div>
        </div>
      </header>


      {homeview && <Home />}
      {createview && <AddNft />}
      {exploreview && < Categorywise contract={contract} />}


    </>
  );
}

export default App;

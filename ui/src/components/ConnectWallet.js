import { useState } from 'react'
import axios from 'axios';
import { BrowserProvider, Contract } from 'ethers';
import ABI from './ABI.json'
import Alert from './alert';
const contractAddress = '0x43803687E0dA670D751bb7D6B1CA96e18FD5A527'

export default function ConnectWallet() {
    const [addrs, setAddrs] = useState()
    const [wallet, setWallet] = useState(null)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState()
    const [access,setAccess] = useState()
    const [contract, setContract] = useState()

    const Connect = async () => {
        try {
            if (!window.ethereum) {Alert("Please Install Metamask" , 'error') ; return}
            setLoading(true)
            const provider = new BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const account = await signer.getAddress()
            const contracts =new     Contract(contractAddress, ABI.abi, signer)

            const nonceRes = await axios.post("http://localhost:8000/api/nonce/", {
                wallet: account
            });

            const nonce = nonceRes.data.nonce;

            // Sign nonce
            const signature = await signer.signMessage(nonce);

            // Send signature for verification
            const verifyRes = await axios.post("http://localhost:8000/api/verify/", {
                wallet: account,
                signature
            });

            const { access } = verifyRes.data;
            setAccess(access)
            console.log(access)
            localStorage.setItem("token", access);

            const profileRes = await axios.get("http://localhost:8000/api/profile/", {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });
            Alert("Login Successful", "success")
            setProfile(profileRes.data);
            setWallet(account)
            setContract(contracts)
            setAddrs(account.toString().slice(0, 6) + '....' + account.toString().slice(-5))
        } catch (err) {
            Alert("Wallet Connection failed", "error")
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { Connect, setLoading, wallet, addrs, loading ,profile,access,contract}
}

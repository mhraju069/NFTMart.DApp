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

    const Connect = async () => {
        try {
            setLoading(true)
            const provider = new BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contracts = new Contract(contractAddress, ABI.abi, signer)
            const account = await signer.getAddress()



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

            localStorage.setItem("token", access);

            const profileRes = await axios.get("http://localhost:8000/api/profile/", {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });
            setProfile(profileRes.data);
            console.log(profileRes.data);
            Alert("Login Successful", "success")
            setWallet(account)
            setAddrs(account.toString().slice(0, 6) + '....' + account.toString().slice(-5))
        } catch (err) {
            Alert("Wallet Connection failed", "error")
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { Connect, setLoading, wallet, addrs, loading ,profile}
}

import { ethers, BrowserProvider } from 'ethers';
import MyNFT from './MyNFT.json';

const MyNFT_Address = "0x1Be54670561aaD32f0348a3dAddea7Ed8C955642";

async function useApprovalCheck(martAddress) {

    try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        const nftContract = new ethers.Contract(
            MyNFT_Address,
            MyNFT.abi,
            signer
        );
        const approved = await nftContract.isApprovedForAll(userAddress, martAddress);
        if (!approved) {
            console.log("Approving...");
            const approveTx = await nftContract.setApprovalForAll(martAddress, true);
            await approveTx.wait();
            console.log("Approved!");
        }else{
            console.log("Already approved!");
        }
        return true
    } catch (e) {
        console.log(e);
        return false
    }
} export default useApprovalCheck;


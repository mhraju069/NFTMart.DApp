import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { parseEther } from 'ethers';
import Alert from './alert';

export default function AddNft({ contract, wallet, setLoading }) {
    // Refs for DOM elements
    const fileInputRef = useRef(null);
    const fileUploadAreaRef = useRef(null);
    const filePreviewRef = useRef(null);
    const previewImageRef = useRef(null);
    const nftFormRef = useRef(null);

    // State variables
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState();

    // Main Upload and Mint handler
    const handleUpload = async (e) => {

        e.preventDefault(); // Prevent default form submit
        if (category === 0) { alert("Select a  valid category"); return }
        if (!wallet) { Alert("Please connect your wallet"); return }

        try {
            setLoading(true)

            // 1. Prepare file data for Pinata upload
            const formData = new FormData();
            formData.append("file", file);

            // 2. Upload file to IPFS via Pinata
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    maxContentLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        pinata_api_key: "edad83b75ee53ba9d17f",
                        pinata_secret_api_key: "13eeddc2a429b1a24e9635fa4c319df0ce9b80634a1709abecda6167869466c9",
                    },
                }
            );

            // 3. Get IPFS hash and format the URI
            const ipfsHash = res.data.IpfsHash;
            const ipfsURL = `ipfs://${ipfsHash}`;
            Alert("File Uploaded Successfully! Minting NFT...", "success")

            // 4. Call smart contract AddItems function

            const tx = await contract.AddItems(name, parseEther(price), ipfsURL, description, category);
            await tx.wait();

            Alert("NFT minted successfully", "success")
        } catch (err) {
            console.error(err);
            Alert("Something went wrong", "error")
        } finally {
            setLoading(false)
        }
    };

    // Drag and Drop / Preview Handling
    useEffect(() => {
        const fileInput = fileInputRef.current;
        const fileUploadArea = fileUploadAreaRef.current;
        const filePreview = filePreviewRef.current;
        const previewImage = previewImageRef.current;

        // Show image preview on file change
        const handleFileChange = (e) => {
            const uploadedFile = e.target.files[0];
            if (uploadedFile) {
                setFile(uploadedFile);
                const reader = new FileReader();
                reader.onload = function (event) {
                    if (previewImage && filePreview && fileUploadArea) {
                        previewImage.src = event.target.result;
                        filePreview.style.display = 'block';
                        fileUploadArea.style.borderColor = '#6e45e2';
                    }
                };
                reader.readAsDataURL(uploadedFile);
            }
        };

        // Visual feedback on drag
        const handleDragOver = (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = '#6e45e2';
            fileUploadArea.style.backgroundColor = 'rgba(110, 69, 226, 0.2)';
        };

        const handleDragLeave = () => {
            fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            fileUploadArea.style.backgroundColor = 'transparent';
        };

        const handleDrop = (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            fileUploadArea.style.backgroundColor = 'transparent';

            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
            }
        };

        // Add event listeners
        fileInput.addEventListener('change', handleFileChange);
        fileUploadArea.addEventListener('dragover', handleDragOver);
        fileUploadArea.addEventListener('dragleave', handleDragLeave);
        fileUploadArea.addEventListener('drop', handleDrop);

        // Cleanup
        return () => {
            fileInput.removeEventListener('change', handleFileChange);
            fileUploadArea.removeEventListener('dragover', handleDragOver);
            fileUploadArea.removeEventListener('dragleave', handleDragLeave);
            fileUploadArea.removeEventListener('drop', handleDrop);
        };
    }, []);

    return (
        <section className="create-nft-section">
            <div className="container">
                <div className="section-header2">
                    <h2 className="section-title">Create New NFT</h2>
                    <p className="section-subtitle">Fill out the form below to mint your unique digital asset on the blockchain.</p>
                </div>

                <form className="create-nft-form" ref={nftFormRef} onSubmit={handleUpload}>
                    <div className="form-grid">
                        {/* File Upload */}
                        <div className="form-group full-width">
                            <label className="form-label">Upload your file <span>(Image, Video, Audio, or 3D Model)</span></label>
                            <div className="file-upload" ref={fileUploadAreaRef}>
                                <input ref={fileInputRef} type="file" className="file-upload-input" accept="image/*,video/*,audio/*,.glb,.gltf" required />
                                <div className="file-upload-icon">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="file-upload-text">Drag & drop your file here</div>
                                <div className="file-upload-hint">Supports: JPG, PNG, MP4, MP3, GLB. Max size: 100MB</div>
                                <div className="file-preview" ref={filePreviewRef}>
                                    <img ref={previewImageRef} alt="Preview" />
                                </div>
                            </div>
                        </div>

                        {/* NFT Name */}
                        <div className="form-group">
                            <label className="form-label">NFT Name</label>
                            <input type="text" className="form-control" placeholder="e.g. Cosmic Harmony #1" onChange={(e) => setName(e.target.value)} required />
                        </div>

                        {/* Category */}
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select defaultValue={0} className="form-control bg" onChange={(e) => setCategory(e.target.value)} required>
                                <option disabled value='0' >Choose....</option>
                                <option value="1">Art</option>
                                <option value="2">Image</option>
                                <option value="3">Music</option>
                                <option value="4">Videos</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="form-group full-width">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" placeholder="Tell the story behind your NFT..." onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>

                        {/* Price */}
                        <div className="form-group">
                            <label className="form-label">Price</label>
                            <input type="number" className="form-control" placeholder="0.00" step="0.001" onChange={(e) => setPrice(e.target.value)} required />
                        </div>

                        {/* Currency */}
                        <div className="form-group">
                            <label className="form-label">Currency</label>
                            <select className="form-control" required>
                                <option value="ETH">ETH</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary">
                                <i className="fas fa-times"></i> Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <i className="fas fa-plus-circle"></i> Create NFT
                            </button>
                        </div>

                        {/* Status Message */}
                        {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
                    </div>
                </form>
            </div>
        </section>
    );
}

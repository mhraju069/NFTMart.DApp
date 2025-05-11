import React, { useEffect, useRef } from 'react';

export default function AddNft() {
    const fileInputRef = useRef(null);
    const fileUploadAreaRef = useRef(null);
    const filePreviewRef = useRef(null);
    const previewImageRef = useRef(null);
    const propertiesContainerRef = useRef(null);
    const nftFormRef = useRef(null);

    useEffect(() => {
        const fileInput = fileInputRef.current;
        const fileUploadArea = fileUploadAreaRef.current;
        const filePreview = filePreviewRef.current;
        const previewImage = previewImageRef.current;
        const nftForm = nftFormRef.current;

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    if (previewImage && filePreview && fileUploadArea) {
                        previewImage.src = event.target.result;
                        filePreview.style.display = 'block';
                        fileUploadArea.style.borderColor = '#6e45e2';
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            if (fileUploadArea) {
                fileUploadArea.style.borderColor = '#6e45e2';
                fileUploadArea.style.backgroundColor = 'rgba(110, 69, 226, 0.2)';
            }
        };

        const handleDragLeave = () => {
            if (fileUploadArea) {
                fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                fileUploadArea.style.backgroundColor = 'transparent';
            }
        };

        const handleDrop = (e) => {
            e.preventDefault();
            if (fileUploadArea && fileInput) {
                fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                fileUploadArea.style.backgroundColor = 'transparent';

                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    const event = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(event);
                }
            }
        };

        const handleFormSubmit = (e) => {
            e.preventDefault();
            alert('NFT creation submitted! (Demo)');
            if (nftForm) nftForm.reset();
            if (filePreview) filePreview.style.display = 'none';
            if (propertiesContainerRef.current) {
                propertiesContainerRef.current.innerHTML = '';
            }
        };

        // Safe add event listeners
        fileInput?.addEventListener('change', handleFileChange);
        fileUploadArea?.addEventListener('dragover', handleDragOver);
        fileUploadArea?.addEventListener('dragleave', handleDragLeave);
        fileUploadArea?.addEventListener('drop', handleDrop);
        nftForm?.addEventListener('submit', handleFormSubmit);

        return () => {
            // Safe remove with null checks
            fileInput?.removeEventListener('change', handleFileChange);
            fileUploadArea?.removeEventListener('dragover', handleDragOver);
            fileUploadArea?.removeEventListener('dragleave', handleDragLeave);
            fileUploadArea?.removeEventListener('drop', handleDrop);
            nftForm?.removeEventListener('submit', handleFormSubmit);
        };
    }, []);

    const handleAddProperty = () => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
            <input type="text" class="form-control" placeholder="Property (e.g. Color)" required />
            <input type="text" class="form-control" placeholder="Value (e.g. Blue)" required />
            <button type="button" class="btn-remove-property"><i class="fas fa-times"></i></button>
        `;
        const removeBtn = propertyItem.querySelector('.btn-remove-property');
        removeBtn.addEventListener('click', () => {
            propertyItem.remove();
        });
        propertiesContainerRef.current?.appendChild(propertyItem);
    };
    return (
        <>
            {/* <!-- Create NFT Section --> */}
            <section className="create-nft-section">
                <div className="container">
                    <div className="section-header2">
                        <h2 className="section-title">Create New NFT</h2>
                        <p className="section-subtitle">Fill out the form below to mint your unique digital asset on the blockchain. All fields are required unless marked optional.</p>
                    </div>

                    <form className="create-nft-form" id="nftForm">
                        <div className="form-grid">
                            {/* <!-- Upload Section --> */}
                            <div className="form-group full-width">
                                <label className="form-label">Upload your file <span>(Image, Video, Audio, or 3D Model)</span></label>
                                <div className="file-upload" id="fileUploadArea">
                                    <input type="file" id="fileInput" className="file-upload-input" accept="image/*,video/*,audio/*,.glb,.gltf" required />
                                    <div className="file-upload-icon">
                                        <i className="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    <div className="file-upload-text">Drag & drop your file here</div>
                                    <div className="file-upload-hint">Supports: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, GLB, GLTF. Max size: 100MB</div>
                                </div>
                                <div className="file-preview" id="filePreview">
                                    <img id="previewImage" src="/" alt="Preview" />
                                </div>
                            </div>

                            {/* <!-- Basic Info --> */}
                            <div className="form-group">
                                <label htmlFor="nftName" className="form-label">NFT Name</label>
                                <input type="text" id="nftName" className="form-control" placeholder="e.g. Cosmic Harmony #1" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nftCollection" className="form-label">Category</label>
                                <select id="nftCollection" className="form-control" required>
                                    <option disabled selected >Choose...</option>
                                    <option value="1">Art</option>
                                    <option value="2">Image</option>
                                    <option value="3">Music</option>
                                    <option value="4">Videos</option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="nftDescription" className="form-label">Description</label>
                                <textarea id="nftDescription" className="form-control" placeholder="Tell the story behind your NFT..." required></textarea>
                            </div>

                            {/* <!-- Pricing --> */}
                            <div className="form-group">
                                <label htmlFor="nftPrice" className="form-label">Price</label>
                                <input type="number" id="nftPrice" className="form-control" placeholder="0.00" step="0.01" min="0" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nftCurrency" className="form-label">Currency</label>
                                <select id="nftCurrency" className="form-control" required>
                                    <option value="ETH" selected >ETH</option>
                                </select>
                            </div>
                            {/* <!-- Form Actions --> */}
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary">
                                    <i className="fas fa-times"></i> Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <i className="fas fa-plus-circle"></i> Create NFT
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </>
    )
}

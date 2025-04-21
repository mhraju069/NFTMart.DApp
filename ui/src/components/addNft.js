import React from 'react'

export default function addNft() {

    // File Upload Preview
    // const fileInput = document.getElementById('fileInput');
    // const fileUploadArea = document.getElementById('fileUploadArea');
    // const filePreview = document.getElementById('filePreview');
    // const previewImage = document.getElementById('previewImage');

    // fileInput.addEventListener('change', function (e) {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = function (event) {
    //             previewImage.src = event.target.result;
    //             filePreview.style.display = 'block';
    //             fileUploadArea.style.borderColor = '#6e45e2';
    //         }
    //         reader.readAsDataURL(file);
    //     }
    // });

    // // Drag and Drop
    // fileUploadArea.addEventListener('dragover', (e) => {
    //     e.preventDefault();
    //     fileUploadArea.style.borderColor = '#6e45e2';
    //     fileUploadArea.style.backgroundColor = 'rgba(110, 69, 226, 0.2)';
    // });

    // fileUploadArea.addEventListener('dragleave', () => {
    //     fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    //     fileUploadArea.style.backgroundColor = 'transparent';
    // });

    // fileUploadArea.addEventListener('drop', (e) => {
    //     e.preventDefault();
    //     fileUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    //     fileUploadArea.style.backgroundColor = 'transparent';

    //     if (e.dataTransfer.files.length) {
    //         fileInput.files = e.dataTransfer.files;
    //         const event = new Event('change');
    //         fileInput.dispatchEvent(event);
    //     }
    // });

    // // Add/Remove Properties
    // const propertiesContainer = document.getElementById('propertiesContainer');
    // const addPropertyBtn = document.getElementById('addPropertyBtn');

    // addPropertyBtn.addEventListener('click', function () {
    //     const propertyItem = document.createElement('div');
    //     propertyItem.className = 'property-item';
    //     propertyItem.innerHTML = `
    //                                 <input type="text" className="form-control" placeholder="Property (e.g. Color)" required>
    //                                     <input type="text" className="form-control" placeholder="Value (e.g. Blue)" required>
    //                                         <button type="button" className="btn-remove-property">
    //                                             <i className="fas fa-times"></i>
    //                                         </button>
    //                                         `;
    //     propertiesContainer.appendChild(propertyItem);

    //     // Add event to remove button
    //     const removeBtn = propertyItem.querySelector('.btn-remove-property');
    //     removeBtn.addEventListener('click', function () {
    //         propertiesContainer.removeChild(propertyItem);
    //     });
    // });

    // // Form Submission
    // const nftForm = document.getElementById('nftForm');
    // nftForm.addEventListener('submit', function (e) {
    //     e.preventDefault();

    //     // Here you would typically handle the form submission
    //     // For demo purposes, we'll just show an alert
    //     alert('NFT creation submitted! (This is a demo - in a real app this would mint your NFT)');

    //     // Reset form
    //     nftForm.reset();
    //     filePreview.style.display = 'none';
    //     propertiesContainer.innerHTML = '';
    // });

    // // Add cursor follower effect
    // document.addEventListener('mousemove', function (e) {
    //     const cursorFollower = document.createElement('div');
    //     cursorFollower.className = 'cursor-follower';
    //     cursorFollower.style.left = e.clientX + 'px';
    //     cursorFollower.style.top = e.clientY + 'px';
    //     cursorFollower.style.position = 'fixed';
    //     cursorFollower.style.width = '10px';
    //     cursorFollower.style.height = '10px';
    //     cursorFollower.style.backgroundColor = 'rgba(110, 69, 226, 0.5)';
    //     cursorFollower.style.borderRadius = '50%';
    //     cursorFollower.style.pointerEvents = 'none';
    //     cursorFollower.style.zIndex = '9999';
    //     cursorFollower.style.transform = 'translate(-50%, -50%)';
    //     cursorFollower.style.transition = 'all 0.1s ease-out';

    //     document.body.appendChild(cursorFollower);

    //     setTimeout(() => {
    //         cursorFollower.style.opacity = '0';
    //         cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
    //         setTimeout(() => {
    //             cursorFollower.remove();
    //         }, 100);
    //     }, 50);
    // });
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
                                                        <input type="file" id="fileInput" className="file-upload-input" accept="image/*,video/*,audio/*,.glb,.gltf" required/>
                                                            <div className="file-upload-icon">
                                                                <i className="fas fa-cloud-upload-alt"></i>
                                                            </div>
                                                            <div className="file-upload-text">Drag & drop your file here</div>
                                                            <div className="file-upload-hint">Supports: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, GLB, GLTF. Max size: 100MB</div>
                                                    </div>
                                                    <div className="file-preview" id="filePreview">
                                                        <img id="previewImage" src="" alt="Preview"/>
                                                    </div>
                                                </div>

                                                {/* <!-- Basic Info --> */}
                                                <div className="form-group">
                                                    <label htmlFor="nftName" className="form-label">NFT Name</label>
                                                    <input type="text" id="nftName" className="form-control" placeholder="e.g. Cosmic Harmony #1" required/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="nftCollection" className="form-label">Collection</label>
                                                    <select id="nftCollection" className="form-control" required>
                                                        <option value="">Select a collection</option>
                                                        <option value="new">Create new collection</option>
                                                        <option value="cosmic">Cosmic Harmony</option>
                                                        <option value="neon">Neon Dreams</option>
                                                        <option value="digital">Digital Utopia</option>
                                                    </select>
                                                </div>

                                                <div className="form-group full-width">
                                                    <label htmlFor="nftDescription" className="form-label">Description</label>
                                                    <textarea id="nftDescription" className="form-control" placeholder="Tell the story behind your NFT..." required></textarea>
                                                </div>

                                                {/* <!-- Properties --> */}
                                                <div className="form-group full-width">
                                                    <label className="form-label">Properties <span>(Optional)</span></label>
                                                    <div className="properties-container" id="propertiesContainer">
                                                        {/* <!-- Properties will be added here --> */}
                                                    </div>
                                                    <button type="button" className="btn-add-property" id="addPropertyBtn">
                                                        <i className="fas fa-plus"></i> Add Property
                                                    </button>
                                                </div>

                                                {/* <!-- Pricing --> */}
                                                <div className="form-group">
                                                    <label htmlFor="nftPrice" className="form-label">Price</label>
                                                    <input type="number" id="nftPrice" className="form-control" placeholder="0.00" step="0.01" min="0" required/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="nftCurrency" className="form-label">Currency</label>
                                                    <select id="nftCurrency" className="form-control" required>
                                                        <option value="ETH">ETH</option>
                                                        <option value="SOL">SOL</option>
                                                        <option value="MATIC">MATIC</option>
                                                        <option value="USDC">USDC</option>
                                                    </select>
                                                </div>

                                                {/* <!-- Royalties --> */}
                                                <div className="form-group">
                                                    <label htmlFor="nftRoyalties" className="form-label">Royalties (%)</label>
                                                    <input type="number" id="nftRoyalties" className="form-control" placeholder="10" min="0" max="50" value="10" required/>
                                                        <div className="royalty-info">
                                                            Earn a percentage of future sales. Most marketplaces cap at 10%. Higher royalties may reduce buyer interest.
                                                        </div>
                                                </div>

                                                {/* <!-- Blockchain --> */}
                                                <div className="form-group">
                                                    <label htmlFor="nftBlockchain" className="form-label">Blockchain</label>
                                                    <select id="nftBlockchain" className="form-control" required>
                                                        <option value="ethereum">Ethereum</option>
                                                        <option value="polygon">Polygon</option>
                                                        <option value="solana">Solana</option>
                                                        <option value="flow">Flow</option>
                                                    </select>
                                                </div>

                                                {/* <!-- Supply --> */}
                                                <div className="form-group">
                                                    <label htmlFor="nftSupply" className="form-label">Supply</label>
                                                    <input type="number" id="nftSupply" className="form-control" placeholder="1" min="1" value="1" required/>
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

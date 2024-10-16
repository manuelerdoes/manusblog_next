'use client'

import React, { useState, useRef} from 'react';

function UploadPictures() {
    const [isDragging, setIsDragging] = useState(false);
    const [imageUrlsToUpload, setImageUrlsToUpload] = useState([]); // For new images to upload
    const [filesToUpload, setFilesToUpload] = useState([]); // Track actual files to upload
    const [loading, setLoading] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(null); // Track copied picture URL
    const fileInputRef = useRef(null);

    const currentBlog = null;
    const currentUser = {
        username: "Max Muster",
        email: "mumu@mu.com"
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger the hidden file input
    };

    const handleFiles = (files) => {
        const uploadedFiles = Array.from(files);
        const urls = uploadedFiles.map(file => URL.createObjectURL(file));

        // Store both URLs for preview and file objects for upload
        setImageUrlsToUpload((prev) => [...prev, ...urls]);
        setFilesToUpload((prev) => [...prev, ...uploadedFiles]); // Store actual files
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    const handleUploadClick = async () => {
        if (!currentBlog || !currentUser || filesToUpload.length === 0) return;

        setLoading(true);
        try {
            const uploadPromises = filesToUpload.map(async (file) => {
                // Upload image to Firebase Storage
                //const downloadUrl = await upload(file);

                // Create a unique picture document ID using picture + datetime
                const pictureId = `picture_${new Date().toISOString()}`;

                // TODO: Store image metadata in the 'pictures' database
            
                downloadUrl = "https://nada.ch";
                return downloadUrl;
            });

            const imageDownloadUrls = await Promise.all(uploadPromises);

            // Add the newly uploaded image URLs to the server images
            //miaui: setServerImages((prev) => [...prev, ...imageDownloadUrls]);

            // Clear the selected images for upload and files to upload
            setImageUrlsToUpload([]);
            setFilesToUpload([]);

        } catch (error) {
            console.error("Error uploading images: ", error);
        } finally {
            setLoading(false);
        }
    };

    // Copy URL in Markdown format to clipboard
    const handlePictureClick = (url) => {
        const markdown = `![image](${url})`;
        navigator.clipboard.writeText(markdown)
            .then(() => {
                setCopiedUrl(url); // Track copied URL
                setTimeout(() => setCopiedUrl(null), 2000); // Hide message after 2 seconds
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className='uploadPicturesContainer'>
            <div className="picturetitle">
                <h3>Pictures</h3>
            </div>
            <div
                className={`dropzone ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()} // Prevent default to allow dropping
                onDrop={handleDrop}
                onClick={handleClick} // Open file explorer on click
            >
                {isDragging ? "Drop files here" : "Drag & drop files here or click to upload"}

                {/* Hidden file input */}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />

                {/* Preview images to be uploaded */}
                <div className="preview-container">
                    {imageUrlsToUpload.map((url, index) => (
                        <img key={index} src={url} alt={`upload-${index}`} className="preview-image" />
                    ))}
                </div>
            </div>
            <button onClick={handleUploadClick} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            {/* List of already uploaded images from the server */}
            <div className="uploaded-images-container">
                {/* {serverImages.length > 0 ? (
                    <div className="server-image-list">
                        {serverImages.map((url, index) => (
                            <div key={index} className="server-image-container">
                                <img
                                    src={url}
                                    alt={`server-upload-${index}`}
                                    className="server-image"
                                    onClick={() => handlePictureClick(url)} // Copy image URL to clipboard
                                />
                                {copiedUrl === url && (
                                    <span className="copied-message">Copied to clipboard!</span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images uploaded yet.</p>
                )} */}
            </div>
        </div>
    );
}

export default UploadPictures;
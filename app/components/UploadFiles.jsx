'use client'

import React, { useState, useRef, useEffect } from 'react';
import { apiServer } from '../lib/const';

function UploadFiles({ currentUser, blogid, uploadedFiles, setUploadedFiles }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileUrlsToUpload, setFileUrlsToUpload] = useState([]); // For file previews
  const [filesToUpload, setFilesToUpload] = useState([]); // Track actual files to upload
  const [loading, setLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(null); // Track copied file URL
  const [serverFiles, setServerFiles] = useState([]);
  const [showUserFiles, setShowUserFiles] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch files related to the current blog from the server
  useEffect(() => {
    if (blogid) {
      const fetchFiles = async () => {
        try {
          const res = await fetch(`${apiServer}/api/file/${blogid}`, {
            next: { revalidate: 0 }
          });
          if (!res.ok) {
            console.error("Could not fetch files");
            return;
          }
          const data = await res.json();
          const files = data.map(item => item.fileName);
          setServerFiles(files);
          setUploadedFiles(files);
        } catch (error) {
          console.error("Error fetching files: ", error);
        }
      };
      fetchFiles();
    }
  }, [blogid]);

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
    setFileUrlsToUpload((prev) => [...prev, ...urls]);
    setFilesToUpload((prev) => [...prev, ...uploadedFiles]); // Store actual files
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const connectFileToBlog = async (fileName) => {
    try {
      const res = await fetch(`${apiServer}/api/file/${blogid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });
      if (!res.ok) {
        console.error("Could not connect blog to file");
      }
    } catch (error) {
      console.error("Error connecting blog to file: ", error);
    }
  };

  const handleUploadClick = async () => {
    if (!currentUser || filesToUpload.length === 0) return;

    setLoading(true);
    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', currentUser.email);

        const response = await fetch(`${apiServer}/api/file`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        if (blogid) {
          await connectFileToBlog(file.name);
        }

        const data = await response.json();
        const downloadUrl = data.fileUrl;
        return downloadUrl;
      });

      const fileDownloadUrls = await Promise.all(uploadPromises);

      // Update server files and reset local states
      const newServerFiles = [...serverFiles, ...fileDownloadUrls];
      setServerFiles(newServerFiles);
      setUploadedFiles(newServerFiles);
      setFileUrlsToUpload([]);
      setFilesToUpload([]);
    } catch (error) {
      console.error("Error uploading files: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedUrl(url); // Track copied URL
        setTimeout(() => setCopiedUrl(null), 2000); // Hide message after 2 seconds
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  const handleUserFileToggle = async () => {
    const newVal = !showUserFiles;
    if (newVal) {
      try {
        const res = await fetch(`${apiServer}/api/file`);
        if (!res.ok) {
          console.error("Could not fetch files");
          return;
        }
        const data = await res.json();
        const files = data.map(item => item.name);
        setServerFiles(files);
      } catch (error) {
        console.error("Error fetching user files: ", error);
      }
    } else {
      setServerFiles(uploadedFiles);
    }
    setShowUserFiles(newVal);
  };

  return (
    <div className='uploadPicturesContainer'>
      <div className="uploader-title">
        <h3>Files</h3>
      </div>
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()} // Prevent default to allow dropping
        onDrop={handleDrop}
        onClick={handleClick} // Open file explorer on click
      >
        {/* Show text only if there are no files */}
        {filesToUpload.length === 0 && (isDragging ? "Drop files here" : "Drag & drop files here or click to upload")}

        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />

        {/* Preview selected files */}
        <div className="file-preview-container">
          {filesToUpload.map((file, index) => (
            <div key={index} className="preview-item">
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleUploadClick} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      <button onClick={handleUserFileToggle}>
        {showUserFiles ? 'Hide user files' : 'Show user files'}
      </button>

      {/* List of uploaded files */}
      <div className="uploaded-files-container">
        {serverFiles?.length > 0 ? (
          <div className="server-file-list">
            {serverFiles.map((fileName, index) => (
              <div key={index} className="server-file-item">
                <span onClick={() => handleFileClick(fileName)}>{fileName.split('/').pop()}</span>
                {copiedUrl === fileName && <span className="copied-message">Copied to clipboard!</span>}
              </div>
            ))}
          </div>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default UploadFiles;
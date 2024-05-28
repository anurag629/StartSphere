// src/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [imageId, setImageId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setErrorMessage('');
        } else {
            setFile(null);
            setErrorMessage('Please select a valid image file');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setErrorMessage('No file selected or file type is not an image');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'auenhckk');
        formData.append('cloud_name', 'dnjis096o');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dnjis096o/image/upload', formData);
            setUploadedFile(response.data.secure_url);
            setImageId(response.data.public_id);
            setErrorMessage('');
            console.log("response", response)
            console.log("response url", response.data.secure_url)
            console.log("response public id", response.data.public_id)
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrorMessage('Error uploading file');
        }
    };


    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {uploadedFile && (
                <img src={uploadedFile} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
            )}
        </div>
    );
};

export default Test;

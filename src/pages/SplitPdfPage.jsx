import React, { useState } from 'react';
import axios from 'axios';

export const SplitPdfPage = () => {
  const [splitFile, setSplitFile] = useState(null);
  const [splitError, setSplitError] = useState('');

  const handleFileChange = (event) => {
    setSplitFile(event.target.files[0]);
    setSplitError('');
  };

  const handleSplitSubmit = async (event) => {
    event.preventDefault();
    if (!splitFile) {
      setSplitError('Please select a PDF file to split.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', splitFile);

    try {
      const response = await axios.post('http://localhost:5000/api/pdf/split-pdf', formData, {
        responseType: 'blob',
        timeout: 30000, // 30 seconds

      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'split.zip'); // Assuming server returns a zip file
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error splitting PDF:', err);
      setSplitError('Error splitting PDF');
    }
  };

  return (
    <div className="pdf-page-container">
      <h1>Upload and Split PDF</h1>
      <form onSubmit={handleSplitSubmit}>
        <div>
          <label htmlFor="pdf">Select PDF:</label>
          <input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload and Split</button>
      </form>
      {splitError && <p className="error-message">{splitError}</p>}
      <div className="selected-files">
        {splitFile && (
          <div>
            <h2>Selected File:</h2>
            <p>{splitFile.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "./FileDisplay.css";

const FileDisplay = () => {
  const [files, setFiles] = useState([]);

  const fileIcons = {
    pdf: "path/to/pdf-icon.png",
    doc: "path/to/doc-icon.png",
    mp3: "path/to/mp3-icon.png",
    mp4: "path/to/mp4-icon.png",
    rar: "path/to/rar-icon.png",
    other: "path/to/default-icon.png",
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileData = selectedFiles.map((file) => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type.split("/")[1] || "other",
    }));
    setFiles(fileData);
  };

  const getIcon = (type) => {
    return fileIcons[type] || fileIcons.other;
  };

  return (
    <div className="file-display">
      <input
        type="file"
        webkitdirectory="true"
        onChange={handleFileChange}
        className="file-input"
      />
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <div className="file-icon">
              <img src={getIcon(file.type)} alt={file.type} />
            </div>
            <div className="file-info">
              <p className="file-name">{file.name}</p>
              <p className="file-details">{file.size} - From 192.168.1.1</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDisplay;

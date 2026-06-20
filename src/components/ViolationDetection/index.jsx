import React, { useState, useCallback, useEffect } from 'react';
import { Upload, AlertTriangle, Shield, ShieldOff, Camera, Eye, FileVideo, RefreshCw, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { analyzeForViolations, checkApiHealth } from '../../utils/violationAPI';
import './styles.css';

const StatusBadge = ({ value, trueLabel, falseLabel, nullLabel = "N/A" }) => {
  if (value === null || value === undefined) {
    return (
      <span className="status-badge badge-null">
        <HelpCircle className="badge-icon-sm" /> {nullLabel}
      </span>
    );
  }
  if (value) {
    return (
      <span className="status-badge badge-true">
        <CheckCircle className="badge-icon-sm" /> {trueLabel}
      </span>
    );
  }
  return (
    <span className="status-badge badge-false">
      <XCircle className="badge-icon-sm" /> {falseLabel}
    </span>
  );
};

const ViolationCard = ({ detection }) => {
  const isViolation = detection.violation;

  return (
    <div className={`violation-card ${isViolation ? 'is-violation' : 'is-safe'}`}>
      <div className="vcard-header">
        <div className="vcard-title">
          {isViolation ? <ShieldOff className="vcard-icon" /> : <Shield className="vcard-icon" />}
          <span>{detection.vehicle_type}</span>
        </div>
        <span className="vcard-track">Track #{detection.track_id}</span>
      </div>

      <div className="vcard-body">
        {isViolation && (
          <div className="vcard-alert">
            <AlertTriangle className="vcard-alert-icon" />
            <span>{detection.violation_type}</span>
          </div>
        )}

        <div className="vcard-details">
          {detection.vehicle_type === 'motorcycle' && (
            <div className="detail-row">
              <span className="detail-label">Helmet</span>
              <StatusBadge value={detection.helmet} trueLabel="Wearing" falseLabel="Not Wearing" />
            </div>
          )}

          {['car', 'bus', 'truck'].includes(detection.vehicle_type) && (
            <div className="detail-row">
              <span className="detail-label">Seatbelt</span>
              <StatusBadge value={detection.seatbelt} trueLabel="Wearing" falseLabel="Not Wearing" />
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">License Plate</span>
            <span className={`detail-plate ${detection.license_plate ? 'has-plate' : 'no-plate'}`}>
              {detection.license_plate || "Not Detected"}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Confidence</span>
            <div className="confidence-wrapper">
              <div className="confidence-bar-bg">
                <div 
                  className="confidence-bar-fill"
                  style={{ width: `${(detection.confidence * 100).toFixed(0)}%` }}
                />
              </div>
              <span className="confidence-text">
                {(detection.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViolationDetection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [apiHealthy, setApiHealthy] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    checkApiHealth().then(status => {
      setApiHealthy(status.healthy);
    });
  }, []);

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setResult(null);
    setError(null);

    const isVideo = selectedFile.type.startsWith('video/');
    setPreviewType(isVideo ? 'video' : 'image');

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  }, []);

  const handleInputChange = (e) => {
    handleFileSelect(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeForViolations(file);
      setResult(analysisResult);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setPreviewType(null);
    setResult(null);
    setError(null);
    if (preview) URL.revokeObjectURL(preview);
  };

  return (
    <div className="violation-detection-container fade-in">
      {apiHealthy === false && (
        <div className="api-error-banner">
          <AlertTriangle className="api-error-icon" />
          <div>
            <p className="api-error-title">Backend Not Connected</p>
            <p className="api-error-desc">
              Make sure the FastAPI backend is running at <code>http://localhost:8000</code>
            </p>
          </div>
        </div>
      )}

      <div className="vd-card">
        <div className="vd-card-header">
          <Eye className="vd-card-icon" />
          <h2 className="vd-card-title">AI Violation Detection</h2>
        </div>
        
        <div className="vd-card-content">
          <div
            className={`drop-zone ${dragOver ? 'drag-over' : ''} ${preview ? 'has-preview' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!preview ? (
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleInputChange}
                  className="hidden-input"
                />
                <div className="upload-icon-wrapper">
                  <Upload className="upload-icon" />
                </div>
                <p className="upload-title">Upload Image or Video</p>
                <p className="upload-subtitle">Drag & drop or click to browse • JPG, PNG, MP4, AVI</p>
                <div className="upload-badges">
                  <span className="upload-badge badge-image"><Camera className="badge-icon-sm" /> Images</span>
                  <span className="upload-badge badge-video"><FileVideo className="badge-icon-sm" /> Videos</span>
                </div>
              </label>
            ) : (
              <div className="preview-container">
                <div className="media-preview">
                  {previewType === 'image' ? (
                    <img src={preview} alt="Upload preview" />
                  ) : (
                    <video src={preview} controls />
                  )}
                </div>
                <div className="preview-actions">
                  <div className="file-info">
                    <span className="file-name">{file?.name}</span>
                    <span className="file-size">({(file?.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <div className="action-buttons">
                    <button onClick={handleReset} className="btn-secondary">
                      <RefreshCw className="btn-icon" /> Clear
                    </button>
                    <button onClick={handleAnalyze} disabled={isAnalyzing} className="btn-primary">
                      {isAnalyzing ? (
                        <>
                          <div className="spinner" /> Analyzing...
                        </>
                      ) : (
                        <>
                          <Eye className="btn-icon" /> Detect Violations
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAnalyzing && (
        <div className="loading-state">
          <div className="loading-spinner-wrapper">
            <div className="spinner-outer" />
            <div className="spinner-inner" />
          </div>
          <h3>Running AI Analysis Pipeline</h3>
          <p>YOLO11 → ByteTrack → Helmet → Seatbelt → Plate → OCR</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <AlertTriangle className="error-icon" />
          <div className="error-content">
            <h3>Analysis Failed</h3>
            <p>{error}</p>
            <button onClick={handleAnalyze} className="btn-danger">
              <RefreshCw className="btn-icon" /> Retry
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="results-container fade-in">
          <div className="summary-grid">
            <div className="summary-card">
              <p className="summary-value gradient-text">{result.vehicles_detected}</p>
              <p className="summary-label">Vehicles Detected</p>
            </div>
            <div className="summary-card border-red">
              <p className="summary-value text-red">{result.violations_count}</p>
              <p className="summary-label">Violations Found</p>
            </div>
            <div className="summary-card border-green">
              <p className="summary-value text-green">{result.processed_frames}</p>
              <p className="summary-label">Frames Processed</p>
            </div>
          </div>

          {result.violations_count > 0 && (
            <div className="result-section">
              <h3 className="section-title text-red">
                <AlertTriangle className="section-icon" /> Violations Detected
              </h3>
              <div className="cards-grid">
                {result.violations.map((v, i) => (
                  <ViolationCard key={`violation-${i}`} detection={v} />
                ))}
              </div>
            </div>
          )}

          {result.all_detections && result.all_detections.length > 0 && (
            <div className="result-section mt-8">
              <h3 className="section-title text-blue">
                <Shield className="section-icon" /> All Detected Vehicles
              </h3>
              <div className="cards-grid">
                {result.all_detections.filter(d => !d.violation).map((d, i) => (
                  <ViolationCard key={`detection-${i}`} detection={d} />
                ))}
              </div>
            </div>
          )}

          {result.vehicles_detected === 0 && (
            <div className="no-results">
              <Camera className="no-results-icon" />
              <h3>No Vehicles Detected</h3>
              <p>Try uploading a clearer image with vehicles visible.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViolationDetection;

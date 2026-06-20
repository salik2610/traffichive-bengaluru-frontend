import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import ViolationDetection from '../components/ViolationDetection';
import TrafficAnalysisDisplay from '../components/TrafficAnalysisDisplay';
import { analyzeTrafficImage } from '../utils/geminiAPI';
import { Activity, Eye, Upload, Camera, AlertTriangle, Clock, Car, BarChart } from 'lucide-react';
import './DetectionPage.css';

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loading-modal">
      <div className="spinner-lg"></div>
      <h3>Analyzing Traffic Scene</h3>
      <p>Our AI is processing the image to provide intelligent insights...</p>
    </div>
  </div>
);

const DetectionPage = () => {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' or 'violations'
  const [cameraFeed, setCameraFeed] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const toolSectionRef = useRef(null);

  const scrollToTool = () => {
    toolSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const imageData = reader.result;
        setCameraFeed(imageData);
        setImageLoading(false);
        setIsAnalyzing(true);

        try {
          const result = await analyzeTrafficImage(imageData);
          setAnalysis(result);
        } catch (error) {
          console.error("Error analyzing traffic:", error);
          alert('Error analyzing the image. Please try again.');
          setCameraFeed(null);
        } finally {
          setIsAnalyzing(false);
        }
      } catch (error) {
        setImageLoading(false);
        console.error("Error loading image:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const renderImageSection = () => (
    <div className={`analysis-upload-zone ${cameraFeed ? 'has-feed' : ''}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden-input"
        id="analysis-upload"
      />
      <label htmlFor="analysis-upload" className="analysis-upload-label">
        {imageLoading ? (
          <div className="spinner-md"></div>
        ) : cameraFeed ? (
          <img src={cameraFeed} alt="Traffic Feed" className="camera-feed-img" />
        ) : (
          <div className="upload-prompt">
            <Upload className="upload-icon-lg" />
            <p>Click or drag image to upload for AI Analysis</p>
          </div>
        )}
      </label>
    </div>
  );

  return (
    <div className="detection-page">
      <Navbar />
      <AmbientSpheres />
      {isAnalyzing && <LoadingOverlay />}

      <main className="detection-main">

        {/* HERO SECTION */}
        <section className="detection-hero">
          <div className="detection-hero-content">
            <h1 className="hero-title">TrafficHive <br /> <span className="hero-title-highlight">Management System</span></h1>
            <p className="hero-subtitle">
              Revolutionizing Bengaluru's urban mobility with AI-powered detection of helmetless riders, seatbelt violations, and real-time traffic analysis to build a safer Namma Bengaluru.
            </p>
            <button className="launch-btn" onClick={scrollToTool}>
              Launch Monitoring System <span>→</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <h3 className="stat-value text-blue">30%</h3>
              <p className="stat-label">Reduced Traffic Congestion</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value text-purple">24/7</h3>
              <p className="stat-label">Real-time Monitoring</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value text-pink">50+</h3>
              <p className="stat-label">Cities Powered</p>
            </div>
          </div>

          <div className="hero-capabilities">
            <div className="capabilities-header">
              <h2>Advanced Capabilities</h2>
              <p>Our cutting-edge technology combines AI-powered analysis with real-time monitoring to deliver comprehensive traffic solutions.</p>
            </div>

            <div className="capabilities-grid">
              <div className="capability-card">
                <div className="cap-icon-wrapper blue-bg">
                  <Activity className="cap-icon text-blue" />
                </div>
                <h4>Real-time Analytics</h4>
                <p>Advanced algorithms process traffic density instantly from Bengaluru's busy corridors, providing immediate insights.</p>
              </div>
              <div className="capability-card">
                <div className="cap-icon-wrapper purple-bg">
                  <Camera className="cap-icon text-purple" />
                </div>
                <h4>Violation Detection</h4>
                <p>AI-powered detection of common offenses like riding without helmets and driving without seatbelts to ensure road safety.</p>
              </div>
              <div className="capability-card">
                <div className="cap-icon-wrapper pink-bg">
                  <AlertTriangle className="cap-icon text-pink" />
                </div>
                <h4>License Plate Recognition</h4>
                <p>Automatic detection and OCR reading of vehicle license plates to quickly identify and report traffic offenders.</p>
              </div>
              <div className="capability-card">
                <div className="cap-icon-wrapper blue-bg">
                  <Clock className="cap-icon text-blue" />
                </div>
                <h4>Congestion Management</h4>
                <p>Smart identification of severe bottlenecks like Silk Board and KR Puram, analyzing traffic status in real-time.</p>
              </div>
              <div className="capability-card">
                <div className="cap-icon-wrapper purple-bg">
                  <Car className="cap-icon text-purple" />
                </div>
                <h4>Vehicle Classification</h4>
                <p>Accurate identification of Bengaluru's diverse traffic including motorcycles, auto rickshaws, cars, and BMTC buses.</p>
              </div>
              <div className="capability-card">
                <div className="cap-icon-wrapper pink-bg">
                  <BarChart className="cap-icon text-pink" />
                </div>
                <h4>Data-Driven Insights</h4>
                <p>Actionable insights for the Bengaluru Traffic Police to deploy personnel and manage predictive traffic flow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TOOL SECTION */}
        <section className="detection-tool-section" ref={toolSectionRef}>
          <div className="tabs-container">
            <div className="tabs-wrapper">
              <button
                onClick={() => setActiveTab('analysis')}
                className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
              >
                <Activity className="tab-icon" />
                Traffic Analysis
              </button>
              <button
                onClick={() => setActiveTab('violations')}
                className={`tab-btn ${activeTab === 'violations' ? 'active' : ''}`}
              >
                <Eye className="tab-icon" />
                Violation Detection
              </button>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === 'analysis' ? (
              <div className="analysis-tab-content fade-in">
                <div className="analysis-card-wrapper">
                  <div className="analysis-card-header">
                    <h3>TrafficHive Live Monitoring</h3>
                  </div>
                  <div className="analysis-card-body">
                    {renderImageSection()}
                  </div>
                </div>

                {cameraFeed && !isAnalyzing && analysis && (
                  <TrafficAnalysisDisplay analysis={analysis} />
                )}
              </div>
            ) : (
              <div className="fade-in">
                <ViolationDetection />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DetectionPage;

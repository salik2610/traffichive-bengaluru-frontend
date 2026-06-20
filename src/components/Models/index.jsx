import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import smartTrafficLight from '../../assets/smarttrafficlight.png';
import smartParking from '../../assets/smartparking.png';
import trafficChatbot from '../../assets/trafficchatbot.png';
import dataDrivenInsights from '../../assets/datadriveninsights.png';
import realTimeRoute from '../../assets/realtimeroute.png';

const models = [
  {
    id: 'vehicle-person-detector',
    title: 'Vehicle & Person Detector',
    description:
      'YOLOv8-powered detection identifies cars, motorcycles, buses, trucks, and pedestrians in real time across Bengaluru junctions — the foundation for all downstream violation checks.',
    image: smartTrafficLight
  },
  {
    id: 'helmet-seatbelt-check',
    title: 'Helmet & Seatbelt Check',
    description:
      'Pretrained Roboflow models scan every rider and driver bounding box to flag helmet non-compliance and missing seatbelts — covering Bengaluru\'s most common two-wheeler violations.',
    image: trafficChatbot
  },
  {
    id: 'license-plate-ocr',
    title: 'License Plate + OCR',
    description:
      'Automatic number plate detection followed by EasyOCR extraction reads Karnataka registration numbers even in low light, rain, or partial occlusion.',
    image: realTimeRoute
  },
  {
    id: 'multi-object-tracker',
    title: 'Multi-Object Tracker',
    description:
      'ByteTrack via the Supervision library assigns persistent IDs across frames, enabling stop-line violations, red-light running, wrong-side movement, and illegal parking detection.',
    image: smartParking
  },
  {
    id: 'violation-analytics',
    title: 'Violation Analytics',
    description:
      'Aggregated violation counts, hotspot heatmaps, and trend charts across Bengaluru corridors — from Silk Board to KR Puram — to guide enforcement prioritisation.',
    image: dataDrivenInsights
  }
];

const Models = ({ isVisible = true }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="models-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Our Models</h1>
      <div className="models-grid">
        {models.map((model, index) => (
          <motion.div
            key={model.id}
            className="model-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="card-image">
              {model.image && <img src={model.image} alt={model.title} />}
            </div>
            <div className="card-content">
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <button
                className="show-more-btn"
                onClick={() => navigate(`/model/${model.id}`)}
              >
                Show More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Models;

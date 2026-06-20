import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import smartTrafficLight from '../../assets/smarttrafficlight.png';
import dataDrivenInsights from '../../assets/datadriveninsights.png';

const models = [
  {
    id: 'violation-detection',
    title: 'Traffic Violation Detection',
    description: 'AI-powered computer vision that scans Bengaluru junction camera feeds to detect helmet and seatbelt non-compliance, triple riding, signal jumping, wrong-side driving, and illegal parking - with automatic number plate recognition for evidence.',
    image: smartTrafficLight
  },
  {
    id: 'traffic-analytics',
    title: 'Traffic Analytics',
    description: 'Real-time dashboards showing violation hotspots, congestion trends, and enforcement priorities across Bengaluru, helping traffic police target the right junctions at the right times.',
    image: dataDrivenInsights
  }
];

const Models = ({ isVisible = true }) => {
  const navigate = useNavigate();

  const handleShowMore = (modelId) => {
    navigate(`/model/${modelId}`);
  };

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
            key={model.title}
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
                onClick={() => handleShowMore(model.id)}
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

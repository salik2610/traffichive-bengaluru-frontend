import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import './ModelDetail.css';
import smartTrafficLight from '../assets/smarttrafficlight.png';
import dataDrivenInsights from '../assets/datadriveninsights.png';

const modelDetails = {
  'violation-detection': {
    title: 'Traffic Violation Detection',
    description: 'Traffic Hive\'s AI-powered Violation Detection system automatically scans camera footage from Bengaluru junctions to spot helmet and seatbelt non-compliance, triple riding, signal jumping, wrong-side driving, and illegal parking. Every detected violation is paired with an automatically read number plate and a timestamped, annotated image for evidence.',
    subtitle: 'From raw camera footage to actionable violation evidence - automatically.',
    buttonText: 'OPEN DETECTION',
    // Internal route - replace with a hosted URL (and update the
    // condition in handleButtonClick below) if you deploy this as a
    // separate app.
    tryNowLink: '/detection',
    image: smartTrafficLight
  },
  'traffic-analytics': {
    title: 'Traffic Analytics',
    description: 'Traffic Hive\'s Analytics dashboard turns raw violation and congestion data into clear, actionable insights for Bengaluru - violation hotspots by junction, trends over time, and breakdowns by violation type, helping traffic police prioritize enforcement where it matters most.',
    subtitle: 'Analyze. Prioritize. Enforce smarter across Bengaluru.',
    buttonText: 'SEE STATS',
    tryNowLink: '/statistics',
    image: dataDrivenInsights
  }
};

const ModelDetail = () => {
  const { modelId } = useParams();
  const model = modelDetails[modelId];
  const navigate = useNavigate();

  if (!model) {
    return <div>Model not found</div>;
  }

  const handleButtonClick = () => {
    if (model.tryNowLink.startsWith('/')) {
      navigate(model.tryNowLink);
    } else {
      window.open(model.tryNowLink, '_blank');
    }
  };

  return (
    <div className="model-detail-page">
      <Navbar />
      <AmbientSpheres />
      <div className="model-detail-content">
        <div className="model-detail-grid">
          <div className="model-detail-text">
            <h1>{model.title}</h1>
            <p className="main-description">{model.description}</p>
            {model.additionalText && (
              <p className="additional-description">{model.additionalText}</p>
            )}
            <p className="subtitle">{model.subtitle}</p>
            <button 
              className="try-now-btn" 
              onClick={handleButtonClick}
            >
              {model.buttonText}
            </button>
          </div>
          <div className="model-detail-image">
            {model.image ? (
              <img 
                src={model.image} 
                alt={model.title} 
                className="detail-image"
              />
            ) : (
              <div className="image-placeholder"></div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ModelDetail; 

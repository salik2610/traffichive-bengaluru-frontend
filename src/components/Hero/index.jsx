import { useNavigate } from 'react-router-dom';
import './styles.css';
import collage from '../../assets/collage.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-main">
        <div className="hero-content">
          <div className="hero-image">
            <img src={collage} alt="Traffic Hive Features Collage" />
          </div>
          <div className="hero-text">
            <h1>Smarter Traffic, Safer Bengaluru</h1>
            <p>
              Welcome to Traffic Hive — bringing AI-powered traffic intelligence to one of
              India's fastest-growing cities. Our platform automatically detects violations,
              identifies illegal parking hotspots, and delivers real-time analytics across
              Bengaluru's busiest corridors — from Silk Board and KR Puram to Hebbal and
              Marathahalli. By pairing computer vision with actionable enforcement data,
              we help traffic police prioritise smarter, respond faster, and make Bengaluru's
              roads safer for everyone.
            </p>
            <button
              className="get-started-btn"
              onClick={() => navigate('/second-page')}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="slider-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Hero;

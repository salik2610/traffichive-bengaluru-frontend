import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/traffic-hive-logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="Traffic Hive" className="footer-logo" />
          <p className="footer-tagline">Smart Urban Mobility Solutions</p>
        </div>

        <div className="footer-links">
          <div className="links-group">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/detection">Traffic Detection</Link>
            <Link to="/analytics">Analytics</Link>
          </div>

          <div className="links-group">
            <h4>Detection Models</h4>
            <Link to="/model/vehicle-person-detector">Vehicle & Person Detector</Link>
            <Link to="/model/helmet-seatbelt-check">Helmet & Seatbelt Check</Link>
            <Link to="/model/license-plate-ocr">License Plate + OCR</Link>
            <Link to="/model/multi-object-tracker">Multi-Object Tracker</Link>
          </div>

          <div className="links-group">
            <h4>Contact</h4>
            <a href="mailto:contact@traffichive.com">contact@traffichive.com</a>
            <p>Bengaluru, Karnataka, India</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Traffic Hive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import './ModelDetail.css';
import smartTrafficLight from '../assets/smarttrafficlight.png';
import smartParking from '../assets/smartparking.png';
import trafficChatbot from '../assets/trafficchatbot.png';
import realTimeRoute from '../assets/realtimeroute.png';
import dataDrivenInsights from '../assets/datadriveninsights.png';

const modelDetails = {
  'vehicle-person-detector': {
    title: 'Vehicle & Person Detector',
    description:
      'The backbone of the entire pipeline. Using YOLOv8 pretrained on the COCO dataset, this model detects and localises cars, motorcycles, buses, trucks, bicycles, and pedestrians in every frame — covering the full range of road users seen at Bengaluru junctions like Silk Board, KR Puram, and Tin Factory.',
    subtitle:
      'No custom training required — COCO classes already cover all vehicle categories on Bengaluru roads.',
    buttonText: 'TRY DETECTION',
    tryNowLink: '/detection',
    image: smartTrafficLight,
    isInternal: true
  },
  'helmet-seatbelt-check': {
    title: 'Helmet & Seatbelt Check',
    description:
      'Overlays Roboflow Universe pretrained models on top of YOLOv8 person-boxes to check helmet compliance on riders and seatbelt compliance on drivers. For triple riding, the rule engine counts person-boxes overlapping a single motorcycle-box — if ≥ 3, it flags the violation automatically.',
    subtitle:
      'Bengaluru sees among the highest two-wheeler fatality rates in India — this module directly targets the root cause.',
    buttonText: 'TRY DETECTION',
    tryNowLink: '/detection',
    image: trafficChatbot,
    isInternal: true
  },
  'license-plate-ocr': {
    title: 'License Plate + OCR',
    description:
      'A dedicated license plate detection model from Roboflow Universe crops and isolates number plates from each vehicle bounding box. EasyOCR then reads the Karnataka registration text — handling low light, rain, partial occlusion, and the varied font styles found on plates across the city.',
    subtitle:
      'Extracted plate numbers are stored with every violation record, enabling instant vehicle lookup and challan generation.',
    buttonText: 'TRY DETECTION',
    tryNowLink: '/detection',
    image: realTimeRoute,
    isInternal: true
  },
  'multi-object-tracker': {
    title: 'Multi-Object Tracker',
    description:
      'ByteTrack via the Supervision library assigns persistent IDs to every detected vehicle across video frames. This enables four violation types that require temporal reasoning: stop-line crossing (virtual line defined per camera), red-light running (signal-region HSV colour check), wrong-side movement (lane-direction vector), and illegal parking (stationary bounding box across N frames inside a no-parking polygon).',
    subtitle:
      'One-time per-camera setup — draw the virtual lines and zones once on a sample frame and the tracker handles the rest.',
    buttonText: 'TRY DETECTION',
    tryNowLink: '/detection',
    image: smartParking,
    isInternal: true
  },
  'violation-analytics': {
    title: 'Violation Analytics',
    description:
      'Aggregates all logged violations into searchable, filterable dashboards. View violation counts by type, junction, time of day, or date range. Hotspot heatmaps highlight which Bengaluru corridors — Silk Board, Hebbal, Indiranagar 100ft Road, MG Road metro exits — need the most enforcement attention.',
    subtitle:
      'Analyse. Prioritise. Deploy. Turn raw violation data into actionable enforcement intelligence.',
    buttonText: 'SEE ANALYTICS',
    tryNowLink: '/analytics',
    image: dataDrivenInsights,
    isInternal: true
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
    if (model.isInternal) {
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
            <p className="subtitle">{model.subtitle}</p>
            <button className="try-now-btn" onClick={handleButtonClick}>
              {model.buttonText}
            </button>
          </div>
          <div className="model-detail-image">
            {model.image ? (
              <img src={model.image} alt={model.title} className="detail-image" />
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

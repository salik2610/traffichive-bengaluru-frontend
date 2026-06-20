import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import './DetectionPage.css';

/*
  This page is linked from:
    - Navbar -> "DETECTION"
    - Home page -> "Our Models" -> "Traffic Violation Detection" card -> model detail page -> "OPEN DETECTION" button

  Build your own UI here for:
    - Uploading an image / video frame
    - Calling your detection APIs (vehicle/person detector, helmet & seatbelt
      check, plate detector + OCR, tracker, rule engine)
    - Displaying the annotated image with bounding boxes
    - Showing the list of detected violations with confidence scores and
      the recognized plate number

  Everything below is just placeholder markup so the route renders something
  sensible - replace the contents of <div className="detection-workspace">
  with your own components.
*/

const DetectionPage = () => {
  return (
    <div className="detection-page">
      <Navbar />
      <AmbientSpheres />
      <div className="detection-content">
        <h1>TRAFFIC VIOLATION DETECTION</h1>
        <p className="detection-subtitle">
          Upload a traffic camera image or video clip from a Bengaluru junction to detect
          helmet violations, triple riding, signal jumping, wrong-side driving, and illegal
          parking.
        </p>

        <div className="detection-workspace">
          <div className="detection-placeholder">
            <p>Detection workspace placeholder</p>
            <p className="detection-placeholder-sub">
              Build your upload form, model results, and annotated image viewer here.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetectionPage;

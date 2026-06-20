import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import './StatisticsPage.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const StatisticsPage = () => {
  const [timeFilter, setTimeFilter] = useState('Daily');

  // Congestion levels — Bengaluru peak-hour pattern (ORR, Silk Board, KR Puram)
  const congestionData = {
    labels: ['6–9 AM', '9–12 PM', '12–3 PM', '3–6 PM', '6–9 PM'],
    datasets: [
      {
        label: 'Bengaluru Average',
        data: [35, 55, 45, 50, 70],
        borderColor: '#4361EE',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'High-Congestion Corridors',
        data: [55, 75, 60, 72, 85],
        borderColor: '#F72585',
        backgroundColor: 'rgba(247, 37, 133, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const congestionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { color: 'white' } } },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } },
      x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } }
    }
  };

  // Violation counts by type per day
  const violationByTypeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Helmet violations',
        data: [210, 195, 230, 215, 240, 180],
        backgroundColor: 'rgba(247, 37, 133, 0.7)'
      },
      {
        label: 'Signal / stop-line',
        data: [145, 130, 160, 140, 175, 120],
        backgroundColor: 'rgba(67, 97, 238, 0.7)'
      }
    ]
  };

  const violationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { color: 'white' } } },
    scales: {
      y: { stacked: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } },
      x: { stacked: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } }
    }
  };

  // Model usage breakdown
  const usageData = {
    labels: ['Vehicle Detector', 'Helmet & Seatbelt', 'Plate OCR', 'Tracker'],
    datasets: [{
      data: [35, 28, 20, 17],
      backgroundColor: [
        'rgba(67, 97, 238, 0.8)',
        'rgba(247, 37, 133, 0.8)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(255, 152, 0, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const usageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: 'white' } } },
    cutout: '60%'
  };

  // Bengaluru violation hotspots
  const violationHotspots = [
    { area: 'Silk Board Junction',      count: 6214, change: 1.42, trend: 'up' },
    { area: 'KR Puram Bridge',          count: 5381, change: 0.87, trend: 'up' },
    { area: 'Hebbal Flyover',           count: 4927, change: -0.63, trend: 'down' },
    { area: 'Marathahalli Bridge',      count: 4502, change: 1.15, trend: 'up' },
    { area: 'Tin Factory Junction',     count: 3874, change: -0.38, trend: 'down' }
  ];

  return (
    <div className="statistics-page">
      <Navbar />
      <AmbientSpheres />
      <div className="stats-content">
        <h1>STATISTICAL ANALYSIS</h1>

        <div className="stats-grid">
          <div className="chart-card congestion-chart">
            <div className="card-header">
              <h3>Congestion Levels</h3>
              <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="chart-area">
              <Line data={congestionData} options={congestionOptions} />
            </div>
          </div>

          <div className="chart-card aqi-chart">
            <h3>Violations by Type</h3>
            <div className="chart-area">
              <Bar data={violationByTypeData} options={violationOptions} />
            </div>
          </div>

          <div className="chart-card usage-chart">
            <div className="card-header">
              <h3>Model Usage</h3>
              <button className="more-options">•••</button>
            </div>
            <div className="chart-area">
              <Doughnut data={usageData} options={usageOptions} />
            </div>
          </div>
        </div>

        <div className="violations-section">
          <h3>Violations Hotspots — Bengaluru</h3>
          <div className="hotspots-grid">
            {violationHotspots.map((spot, index) => (
              <div key={index} className="hotspot-card">
                <h2>{spot.count.toLocaleString()}</h2>
                <h4>{spot.area}</h4>
                <div className={`trend ${spot.trend}`}>
                  <span className="trend-arrow">{spot.trend === 'up' ? '↑' : '↓'}</span>
                  <span>{spot.change.toFixed(2)} this week</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatisticsPage;

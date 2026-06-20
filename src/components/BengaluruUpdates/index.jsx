import React, { useState, useEffect } from 'react';
import '../DelhiNotifications/styles.css';

const BengaluruUpdates = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [aqiData, setAqiData] = useState({
    overall: null,
    locations: {
      'Silk Board': null,
      'Hebbal': null,
      'BTM Layout': null
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAQIData = async () => {
    try {
      const token = import.meta.env.VITE_WAQI_TOKEN;

      // Bengaluru station IDs — replace with real WAQI station IDs for your pilot zones
      const stations = [
        { id: 'silk-board', name: 'Silk Board' },
        { id: 'hebbal', name: 'Hebbal' },
        { id: 'btm', name: 'BTM Layout' }
      ];

      const responses = await Promise.all(
        stations.map(async station => {
          try {
            const response = await fetch(
              `https://api.waqi.info/feed/${station.id}/?token=${token}`
            );
            const data = await response.json();
            return data;
          } catch {
            return null;
          }
        })
      );

      const validData = responses.filter(
        data => data && data.status === 'ok' && data.data && typeof data.data.aqi === 'number'
      );

      if (validData.length > 0) {
        const overall = Math.round(
          validData.reduce((sum, data) => sum + (data.data.aqi || 0), 0) / validData.length
        );
        const locations = {};
        validData.forEach((data, index) => {
          locations[stations[index].name] =
            data && data.data && typeof data.data.aqi === 'number' ? data.data.aqi : null;
        });
        setAqiData({ overall: isNaN(overall) ? null : overall, locations });
      }
    } catch (error) {
      console.error('Error fetching AQI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAQIData();
    const interval = setInterval(fetchAQIData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getAQILevel = (aqi) => {
    if (isLoading) return 'Loading...';
    if (!aqi) return 'No Data';
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="notifications-wrapper">
      <button
        onClick={() => setShowNotification(true)}
        className="delhi-updates-btn"
      >
        City Updates
      </button>

      {showNotification && (
        <div className="notification-panel">
          <div className="notification-content">
            <div className="notification-header">
              <h2>Bengaluru Updates — {formattedDate}</h2>
              <button
                onClick={() => setShowNotification(false)}
                className="close-btn"
              >✕</button>
            </div>

            <div className="updates-container">
              {/* AQI Section */}
              <div className="update-card">
                <div className="aqi-header">
                  <span className="wind-icon">💨</span>
                  Overall Air Quality Index:{' '}
                  <span className="aqi-value">
                    {aqiData.overall} ({getAQILevel(aqiData.overall)})
                  </span>
                </div>
                <div className="local-aqi">
                  <p>Local AQI Readings:</p>
                  <div className="aqi-grid">
                    {Object.entries(aqiData.locations).map(([location, value]) => (
                      <div key={location} className="aqi-location">
                        <span className="location-icon">📍</span>
                        {location}: <span className="aqi-number">{value ?? '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* High-Congestion Zones */}
              <div className="update-card">
                <div className="vehicle-rule">
                  <span className="car-icon">🚦</span>
                  High-congestion zones today: Silk Board flyover, KR Puram bridge,
                  Tin Factory junction
                </div>
              </div>

              {/* Road Works */}
              <div className="update-card">
                <div className="roadworks">
                  <span className="construction-icon">🚧</span>
                  Ongoing Road Works:
                  <div className="roadworks-list">
                    <p>Hebbal flyover expansion (Duration: 7 days)</p>
                    <p>Outer Ring Road — Marathahalli stretch (Duration: 3 days)</p>
                    <p>NICE Road interchange, Bommasandra (Duration: 2 days)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BengaluruUpdates;

import React from 'react';
import { Activity, Car, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import './styles.css';

const AnalysisCard = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`analysis-card ${className}`}>
    <div className="analysis-card-header">
      <div className="analysis-card-icon-wrapper">
        <Icon className="analysis-card-icon" />
      </div>
      <h3>{title}</h3>
    </div>
    {children}
  </div>
);

const SignalIndicator = ({ signal, nextSignal, trafficStatus }) => {
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [currentSignal, setCurrentSignal] = React.useState(signal);
  const [isFirstChange, setIsFirstChange] = React.useState(true);
  const [lastSignal, setLastSignal] = React.useState(null);

  const getNextSignalColor = (currentSignal) => {
    if (currentSignal.toLowerCase() === 'red') return 'yellow';
    if (currentSignal.toLowerCase() === 'green') return 'yellow';
    if (currentSignal.toLowerCase() === 'yellow') {
      return lastSignal?.toLowerCase() === 'red' ? 'green' : 'red';
    }
    return currentSignal;
  };

  const calculateDuration = (currentColor, isFirst) => {
    if (isFirst) return 20;
    if (currentColor.toLowerCase() === 'yellow') return 5;
    return 90;
  };

  React.useEffect(() => {
    setCurrentSignal(signal);
    if (nextSignal) {
      const nextColor = getNextSignalColor(signal);
      const duration = calculateDuration(nextColor, isFirstChange);
      setTimeLeft(duration);
    }
  }, [signal, nextSignal, trafficStatus]);

  React.useEffect(() => {
    if (!nextSignal || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (currentSignal.toLowerCase() !== 'yellow') setLastSignal(currentSignal);
          const nextColor = getNextSignalColor(currentSignal);
          setCurrentSignal(nextColor);
          if (isFirstChange) setIsFirstChange(false);
          return calculateDuration(nextColor, false);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, nextSignal, currentSignal, trafficStatus]);

  const validatedNextSignal = nextSignal ? {
    ...nextSignal,
    color: getNextSignalColor(currentSignal),
    timeUntilChange: timeLeft
  } : nextSignal;

  const congestionClass = trafficStatus.toLowerCase() === 'congested' ? 'pulse-fast' :
    trafficStatus.toLowerCase() === 'moderate' ? 'pulse-normal' : 'pulse-slow';

  return (
    <div className="signal-indicator-container">
      <div className="signal-indicator-relative">
        <div className={`signal-main-circle signal-${currentSignal.toLowerCase()} ${congestionClass}`}>
          <div className="signal-inner-glass" />
        </div>
        {validatedNextSignal && (
          <div className={`signal-next-circle signal-${validatedNextSignal.color.toLowerCase()}`}>
            <div className="signal-inner-glass" />
          </div>
        )}
      </div>
      <p className="signal-current-text">{currentSignal}</p>
      {validatedNextSignal && (
        <div className="signal-next-info">
          <span className={`signal-next-label color-${validatedNextSignal.color.toLowerCase()}`}>
            Next: {validatedNextSignal.color.toUpperCase()}
          </span>
          <span className={`signal-next-time color-${validatedNextSignal.color.toLowerCase()}`}>
            {timeLeft}s
          </span>
        </div>
      )}
    </div>
  );
};

const TrafficAnalysisDisplay = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="traffic-analysis-display">
      <div className="main-status-display">
        <div className="status-header">
          <h2>Real-Time Traffic Analysis</h2>
          <p>Powered by TrafficHive AI</p>
        </div>

        <div className="status-grid">
          <div className="status-card">
            <TrendingUp className="status-icon" />
            <h3>Traffic Density Level</h3>
            <p className="status-value">{analysis.trafficFlow.status}</p>
          </div>

          <div className="status-card signal-card">
            <SignalIndicator
              signal={analysis.trafficFlow.suggestedSignal}
              nextSignal={analysis.trafficFlow.nextSignal}
              trafficStatus={analysis.trafficFlow.status}
            />
          </div>

          <div className="status-card">
            <Clock className="status-icon" />
            <h3>Wait Time</h3>
            <p className="status-value">{analysis.trafficFlow.waitTime}</p>
          </div>
        </div>
      </div>

      <div className="detailed-analysis-grid">
        <AnalysisCard title="Traffic Density Analysis" icon={Activity}>
          <div className="analysis-row">
            <span>Density Level</span>
            <span className={`density-badge density-${analysis.trafficDensity.level.toLowerCase()}`}>
              {analysis.trafficDensity.level.toUpperCase()}
            </span>
          </div>
          <p className="analysis-description">{analysis.trafficDensity.description}</p>
        </AnalysisCard>

        <AnalysisCard title="Vehicle Analysis" icon={Car}>
          <div className="analysis-row">
            <span>Total Vehicles:</span>
            <span className="vehicle-count">{analysis.vehicleAnalysis.totalCount}</span>
          </div>
          <p className="analysis-description">{analysis.vehicleAnalysis.composition}</p>
        </AnalysisCard>

        <AnalysisCard title="Safety Assessment" icon={AlertTriangle} className="full-width">
          <div className="safety-grid">
            <div className="safety-card">
              <h4>Risk Level</h4>
              <AlertTriangle className={`safety-icon risk-${analysis.safetyAssessment.riskLevel.toLowerCase()}`} />
              <span className={`density-badge density-${analysis.safetyAssessment.riskLevel.toLowerCase()}`}>
                {analysis.safetyAssessment.riskLevel.toUpperCase()}
              </span>
            </div>

            <div className="safety-card text-left">
              <h4>Concerns</h4>
              <p>{analysis.safetyAssessment.concerns}</p>
            </div>

            <div className="safety-card text-left">
              <h4>Recommendations</h4>
              <p>{analysis.safetyAssessment.recommendations}</p>
            </div>
          </div>
        </AnalysisCard>
      </div>
    </div>
  );
};

export default TrafficAnalysisDisplay;

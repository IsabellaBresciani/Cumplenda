import React, { useState, useEffect } from 'react'; 
import healthcheck from '../services/healthCheck'; 

function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState('Checking health...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        setLoading(true);
        const response = await healthcheck({}); 
        setHealthStatus(response);
      } catch (err) {
        setError(err.message);
        setHealthStatus('Failed to check health.');
      } finally {
        setLoading(false); 
      }
    };

    fetchHealthStatus(); 
  }, []); 

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 style={{ color: 'red' }}>Error: {error}</h1>;
  }

  return <h1>Health Status: {healthStatus}</h1>;
}

export default HealthCheck;
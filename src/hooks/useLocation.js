import { useState, useEffect } from "react";

const useLocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Success handler
    const handleSuccess = (position) => {
      if (mounted) {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setLoading(false);
        setError(null);
      }
    };

    // Error handler
    const handleError = (error) => {
      if (mounted) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );

    // Optional: Set up continuous watching of position
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    // Cleanup
    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // Empty dependency array since we only want to set this up once

  return { location, error, loading };
};

export default useLocation;

import { useEffect, useState } from 'react';
import module from './geolocation.module.scss';

interface Position {
  latitude: number;
  longitude: number;
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
  }, []);

  return { location, error };
};

const App = () => {
  const { location, error } = useCurrentLocation();
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
      const token = "46f9c319c7748bfab59844084dabc8e89ecd9ccc";
      const query = { lat: location.latitude, lon: location.longitude };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + token
        },
        body: JSON.stringify(query),
        mode: 'cors' as RequestMode
      };
      
      fetch(url, options)
        .then(response => response.json())
        .then(result => {
          const city = result.suggestions[0].value;
          setCity(city);
        })
        .catch(error => console.log('error', error));
    }
  }, [location]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className={module.container}>
      <div className={module.location}>
        <p>Широта: {location.latitude}</p>
        <p>Долгота: {location.longitude}</p>
      </div>
      <div className={module.city}>
        <p>Ваш город: </p>
        <h2>{city}</h2>
      </div>
    </div>
  );
};

export default App;
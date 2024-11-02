import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

const SuggestedPlaces: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [places, setPlaces] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!city) {
        setPlaces([]);
        setLoading(false);
        return;
      }

      try {
        const suggestions =
          await API.getPlacesAndActivitiesSuggestionsByCity(city);
        setPlaces(suggestions);
      } catch {
        setError('Failed to fetch suggestions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const handleSelectPlace = (place: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(place) ? prev.filter((p) => p !== place) : [...prev, place]
    );
  };

  return (
    <div>
      <h2>Suggested Places in {city}</h2>
      {loading ? (
        <div>
          <p>We are planning your trip, give us a few minutes...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div>
          {places.map((place) => (
            <div key={place}>
              <input
                type="checkbox"
                id={place}
                value={place}
                onChange={() => handleSelectPlace(place)}
              />
              <label htmlFor={place}>{place}</label>
            </div>
          ))}
        </div>
      )}
      <button disabled={selectedPlaces.length === 0}>Continue</button>
    </div>
  );
};

export default SuggestedPlaces;

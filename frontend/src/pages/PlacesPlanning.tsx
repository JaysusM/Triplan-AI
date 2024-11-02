import React, { useState, useEffect } from 'react';
import PlaceActivitySelector from '../components/PlaceActivitySelector';
import API from '../utils/api';
import { useParams } from 'react-router-dom';

const PlacesPlanning: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [places, setPlaces] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const [dailyPlannings, setDailyPlannings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSelectedPlaces = (places: string[]) => {
    setSelectedPlaces(places);
  };

  const handleNumberOfDaysChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumberOfDays(Number(event.target.value));
  };

  const handlePlanTrip = async () => {
    setLoading(true);
    setError(null);

    try {
      const plannings = await API.getDailyPlanningsWithPlacesAndActivities(
        selectedPlaces,
        numberOfDays
      );
      setDailyPlannings(plannings);
    } catch {
      setError('Failed to plan the trip. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Plan Your Trip</h1>
      {loading ? (
        <div>
          <p>We are planning your trip, give us a few minutes...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <PlaceActivitySelector
            places={places}
            onSelected={handleSelectedPlaces}
          />
          <div>
            <label htmlFor="numberOfDays">Number of Days:</label>
            <select
              id="numberOfDays"
              value={numberOfDays}
              onChange={handleNumberOfDaysChange}
            >
              {[...Array(10).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handlePlanTrip}
            disabled={selectedPlaces.length === 0 || loading}
          >
            {loading ? 'Planning...' : 'Plan Trip'}
          </button>
          {dailyPlannings && (
            <div>
              <h2>Daily Plannings</h2>
              <pre>{JSON.stringify(dailyPlannings, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlacesPlanning;

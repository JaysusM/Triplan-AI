const TRIP_API_URL = `${import.meta.env.VITE_API_URL}/api/trip`;

const getPlacesAndActivitiesSuggestionsByCity = async (city: string) => {
  const response = await fetch(
    `${TRIP_API_URL}/getPlacesAndActivitiesSuggestionsByCity?city=${city}`
  );
  const data = await response.json();
  return data.suggestions;
};

const getDailyPlanningsWithPlacesAndActivities = async (placesAndActivities: string[], numberOfDays: number) => {
  const response = await fetch(
    `${TRIP_API_URL}/getDailyPlanningsWithPlacesAndActivities`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placesAndActivities, numberOfDays }),
    }
  );
  const data = await response.json();
  return data.dailyPlannings;
};

const Api = {
  getPlacesAndActivitiesSuggestionsByCity,
  getDailyPlanningsWithPlacesAndActivities,
};

export default Api;

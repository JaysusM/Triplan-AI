const getPlacesAndActivitiesSuggestionsByCity = async (city: string) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trip/getPlacesAndActivitiesSuggestionsByCity?city=${city}`
    );
    const data = await response.json();
    return data.suggestions;
};

const Api = {
    getPlacesAndActivitiesSuggestionsByCity,
};

export default Api;
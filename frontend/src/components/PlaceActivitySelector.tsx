import React, { useState } from 'react';

interface PlaceActivitySelectorProps {
  places: string[];
  onSelected: (selectedPlaces: string[]) => void;
}

const PlaceActivitySelector: React.FC<PlaceActivitySelectorProps> = ({
  places,
  onSelected,
}) => {
  const [, setSelectedPlaces] = useState<string[]>([]);

  const handleSelectPlace = (place: string) => {
    setSelectedPlaces((prev) => {
      const newSelectedPlaces = prev.includes(place)
        ? prev.filter((p) => p !== place)
        : [...prev, place];
      onSelected(newSelectedPlaces);
      return newSelectedPlaces;
    });
  };

  return (
    <div>
      <h2>Suggested Places</h2>
      {places.length === 0 ? (
        <div>
          <p>No places available.</p>
        </div>
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
    </div>
  );
};

export default PlaceActivitySelector;

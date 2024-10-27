import React, { useState } from "react";
import Select from "react-select";

interface CityOption {
  value: string;
  label: string;
}

interface CitySelectorProps {
  onChange: (city: string | null) => void;
}

const topCities: CityOption[] = [
  { value: "Bangkok", label: "Bangkok" },
  { value: "Paris", label: "Paris" },
  { value: "London", label: "London" },
  { value: "Dubai", label: "Dubai" },
  { value: "Singapore", label: "Singapore" },
  { value: "Kuala Lumpur", label: "Kuala Lumpur" },
  { value: "New York", label: "New York" },
  { value: "Istanbul", label: "Istanbul" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Antalya", label: "Antalya" },
];

const CitySelector: React.FC<CitySelectorProps> = ({ onChange }) => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const handleChange = (city: CityOption | null) => {
    setSelectedCity(city);
    onChange(city?.value ? city.value : null);
  };

  return (
    <Select
      options={topCities}
      value={selectedCity}
      onChange={handleChange}
      placeholder="Select a city..."
    />
  );
};

export default CitySelector;

import { useNavigate } from 'react-router-dom';
import CitySelector from '../components/CitySelector';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCityChange = (city: string | null) => {
    if (city) {
      navigate(`/suggested-places/${city}`);
    }
  };

  return (
    <div>
      <h1>Trip AI</h1>
      <CitySelector onChange={handleCityChange} />
    </div>
  );
};

export default Home;

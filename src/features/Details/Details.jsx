import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import africaImg from '../../images/africa.png';
import './Details.css';
import { fetchCountryWeather, selectSelectedCountry } from '../Home/countriesSlice';

const Details = () => {
  const navigate = useNavigate();
  const country = useSelector(selectSelectedCountry);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountryWeather(country));
    if (!country) {
      navigate('/');
    }
  }, [dispatch, country, navigate]);

  return (
    <>
      <div className="Details">
        <img src={africaImg} alt="africa" />
        <div className="Home-text">
          <h2>{country.name}</h2>
          <p>
            Population:
            &nbsp;
            {Number(country.population).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="divider">Country Info</div>
      <div className="details-grid">
        <div className="details-info">
          <h2>Temperature:</h2>
          <h2>{country.main ? `${(country.main.temp - 273.15).toFixed()}°C` : 'loading...'}</h2>
        </div>
        <div className="details-info" style={{ backgroundColor: '#d04379' }}>
          <h2>Feels like:</h2>
          <h2>{country.main ? `${(country.main.feels_like - 273.15).toFixed()}°C` : 'loading...'}</h2>
        </div>
        <div className="details-info">
          <h2>Description:</h2>
          <h2>
            {country.weather ? country.weather[0].description : 'loading...'}
          </h2>
        </div>
        <div className="details-info" style={{ backgroundColor: '#d04379' }}>
          <h2>Humidity:</h2>
          <h2>{country.main ? `${country.main.humidity}%` : 'loading...'}</h2>
        </div>
      </div>
    </>
  );
};

export default Details;

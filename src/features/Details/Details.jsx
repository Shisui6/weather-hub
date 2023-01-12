import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import thunderImg from '../../images/thunderstorm.jpg';
import clearImg from '../../images/clear.jpg';
import cloudsImg from '../../images/clouds.jpg';
import drizzleImg from '../../images/drizzle.jpg';
import rainImg from '../../images/rain.jpg';
import snowImg from '../../images/snow.jpg';
import './Details.css';
import {
  fetchCountryWeather, selectCountryWeather, selectIsLoading, selectSelectedCountry,
} from '../Home/countriesSlice';

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selected = useSelector(selectSelectedCountry);
  const country = useSelector(selectCountryWeather);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!selected) {
      navigate('/');
    } else {
      dispatch(fetchCountryWeather(selected));
    }
  }, [dispatch, selected, navigate]);

  const background = () => {
    const desc = country.weather[0].description;
    if (desc.includes('clear')) {
      return { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${clearImg})` };
    }
    if (desc.includes('thunder')) {
      return { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${thunderImg})` };
    }
    if (desc.includes('snow')) {
      return { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${snowImg})` };
    }
    if (desc.includes('rain')) {
      return { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${rainImg})` };
    }
    if (desc.includes('drizzle')) {
      return { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${drizzleImg})` };
    }

    return { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${cloudsImg})` };
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="three-body">
          <div className="three-body__dot" />
          <div className="three-body__dot" />
          <div className="three-body__dot" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="Details" style={background()}>
        <button type="button" onClick={() => navigate(-1)}>
          <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z" /></svg>
          <span>Back</span>
        </button>
        <div className="Details-text">
          <img src={country.flag} alt="flag" />
          <h2>{country.name}</h2>
          <p>
            Population:
            &nbsp;
            {Number(country.population).toLocaleString()}
          </p>
        </div>
        <div className="details-grid">
          <div className="details-info">
            <h2>Temperature:</h2>
            <h2>{`${(country.main.temp - 273.15).toFixed()}°C`}</h2>
          </div>
          <div className="details-info">
            <h2>Feels like:</h2>
            <h2>{`${(country.main.feels_like - 273.15).toFixed()}°C`}</h2>
          </div>
          <div className="details-info">
            <h2>Description:</h2>
            <h2>
              {country.weather[0].description}
            </h2>
          </div>
          <div className="details-info">
            <h2>Humidity:</h2>
            <h2>{`${country.main.humidity}%`}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;

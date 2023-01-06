import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { UilArrowCircleRight } from '@iconscout/react-unicons';
import { setSelectedCountry } from '../Home/countriesSlice';
import './Country.css';

const Country = ({ country }) => {
  const dispatch = useDispatch();

  const background = () => {
    if (country.id < 5) {
      if (country.id % 2 === 0) {
        return { backgroundColor: '#dd4883' };
      }

      return { backgroundColor: '#d1447a' };
    }

    if (country.id % 2 === 0) {
      return { backgroundColor: '#d1447a' };
    }

    return { backgroundColor: '#dd4883' };
  };

  const handleClick = () => {
    dispatch(setSelectedCountry(country));
  };

  return (
    <div className="Country" style={background()}>
      <Link to={`countries/${country.country}`} className="link" onClick={handleClick}><UilArrowCircleRight /></Link>
      <img src={country.countryInfo.flag} alt="nigeria" />
      <div>
        <h2>{country.country}</h2>
        <h3>
          Population:
          &nbsp;
          {Number(country.population).toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default Country;

Country.propTypes = {
  country: PropTypes.shape().isRequired,
};

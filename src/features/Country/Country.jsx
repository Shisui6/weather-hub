import PropTypes from 'prop-types';
import './Country.css';

const Country = ({ country }) => {
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

  return (
    <div className="Country" style={background()}>
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

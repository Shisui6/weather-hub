import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading, setSelectedCountry } from '../Home/countriesSlice';
import './Country.css';

const Country = ({ country }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setLoading());
    dispatch(setSelectedCountry(country));
  };

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-avatar">
          <img src={country.flag} alt="country" />
        </div>
        <div className="card-title">{country.name}</div>
        <div className="card-subtitle">
          Population:
          &nbsp;
          {Number(country.population).toLocaleString()}
        </div>
      </div>
      <div className="card-social">
        <Link to={`countries/${country.name}`} className="link" onClick={handleClick}>
          <button type="button">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
                </svg>
              </div>
            </div>
            <span>Details</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Country;

Country.propTypes = {
  country: PropTypes.shape().isRequired,
};

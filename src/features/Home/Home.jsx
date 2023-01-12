import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import africaImg from '../../images/africa.jpg';
import Country from '../Country/Country';
import './Home.css';
import { fetchCountries, selectFilteredCountry, setFilter } from './countriesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectFilteredCountry);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(setFilter(''));
  }, [dispatch]);

  return (
    <div className="Home">
      <div className="Home-intro">
        <img src={africaImg} alt="africa" />
        <div className="Home-text">
          <h2>Africa</h2>
          <p>58 countries</p>
        </div>
      </div>
      <div className="search">
        <input type="text" className="search__input" placeholder="Search Countries" onChange={(e) => { dispatch(setFilter(e.target.value)); }} />
        <button className="search__button" type="button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
        </button>
      </div>
      <div className="countries-grid">
        {countries.map((country) => <Country key={country.id} country={country} />)}
      </div>
    </div>
  );
};

export default Home;

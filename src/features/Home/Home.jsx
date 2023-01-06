import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import africaImg from '../../images/africa.png';
import Country from '../Country/Country';
import './Home.css';
import { fetchCountries, selectFilteredCountry, setFilter } from './countriesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectFilteredCountry);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <>
      <div className="Home">
        <img src={africaImg} alt="africa" />
        <div className="Home-text">
          <h2>Africa</h2>
          <p>58 countries</p>
        </div>
      </div>
      <select name="country" id="country" onChange={(e) => { dispatch(setFilter(e.target.value)); }}>
        <option value="All">Select a Country</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Kenya">Kenya</option>
        <option value="South Africa">South Africa</option>
        <option value="Ghana">Ghana</option>
        <option value="Morocco">Morocco</option>
        <option value="Egypt">Egypt</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Tanzania">Tanzania</option>
      </select>
      <div className="divider">Stats by country</div>
      <div className="countries-grid">
        {countries.map((country) => <Country key={country.id} country={country} />)}
      </div>
    </>
  );
};

export default Home;

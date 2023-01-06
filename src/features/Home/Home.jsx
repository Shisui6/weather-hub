import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import africaImg from '../../images/africa.png';
import Country from '../Country/Country';
import './Home.css';
import { fetchCountries, selectCountries } from './countriesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

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
      <div className="divider">Stats by country</div>
      <div className="countries-grid">
        {countries.map((country) => <Country key={country.id} country={country} />)}
      </div>
    </>
  );
};

export default Home;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  selectedCountry: '',
  countryWeather: '',
  filter: '',
  isLoading: true,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    let json = await response.json();
    json = json.filter((item) => item.continent === 'Africa');
    return json.map((obj) => ({
      // eslint-disable-next-line no-underscore-dangle
      id: obj.countryInfo._id,
      name: obj.country,
      population: obj.population,
      flag: obj.countryInfo.flag,
      lat: obj.countryInfo.lat,
      long: obj.countryInfo.long,
    }));
  },
);

export const fetchCountryWeather = createAsyncThunk(
  'countries/fetchCountryWeather',
  async (country) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.long}&appid=${process.env.REACT_APP_API_KEY}`);
    const json = await response.json();
    return {
      ...country,
      main: json.main,
      weather: json.weather,
    };
  },
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setFilter(state, action) {
      const state1 = state;
      state1.filter = action.payload;
    },
    setSelectedCountry(state, action) {
      const state1 = state;
      state1.selectedCountry = action.payload;
    },
    setLoading(state) {
      const state1 = state;
      state1.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        const state1 = state;
        state1.isLoading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        const state1 = state;
        state1.isLoading = false;
        state1.countries = action.payload;
      })
      .addCase(fetchCountryWeather.pending, (state) => {
        const state1 = state;
        state1.isLoading = true;
      })
      .addCase(fetchCountryWeather.fulfilled, (state, action) => {
        const state1 = state;
        state1.isLoading = false;
        state1.countryWeather = action.payload;
      });
  },
});

export const { setFilter, setSelectedCountry, setLoading } = countriesSlice.actions;

export const selectCountries = (state) => state.countries.countries;
export const selectIsLoading = (state) => state.countries.isLoading;
export const selectFilter = (state) => state.countries.filter;
export const selectSelectedCountry = (state) => state.countries.selectedCountry;
export const selectCountryWeather = (state) => state.countries.countryWeather;
export const selectFilteredCountry = (state) => {
  const countries = selectCountries(state);
  const filter = selectFilter(state);
  if (filter !== '') {
    return countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()));
  }

  return countries;
};

export default countriesSlice.reducer;

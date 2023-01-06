import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  selectedCountry: '',
  filter: 'All',
  status: 'idle',
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    let json = await response.json();
    json = json.filter((item) => item.country === 'Nigeria' || item.country === 'Kenya' || item.country === 'Ghana' || item.country === 'South Africa' || item.country === 'Morocco' || item.country === 'Egypt' || item.country === 'Tanzania' || item.country === 'Ethiopia');
    let i = 1;
    json.forEach((element) => {
      const element1 = element;
      element1.id = i;
      i += 1;
    });

    return json;
  },
);

export const fetchCountryWeather = createAsyncThunk(
  'countries/fetchCountryWeather',
  async (country) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.countryInfo.lat}&lon=${country.countryInfo.long}&appid=${process.env.REACT_APP_API_KEY}`);
    const json = await response.json();
    json.name = country.country;
    json.population = country.population;
    return json;
  },
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSelectedCountry(state, action) {
      const state1 = state;
      state1.selectedCountry = action.payload;
    },
    setFilter(state, action) {
      const state1 = state;
      state1.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        const state1 = state;
        state1.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        const state1 = state;
        state1.status = 'idle';
        state1.countries = action.payload;
      })
      .addCase(fetchCountryWeather.pending, (state) => {
        const state1 = state;
        state1.status = 'loading';
      })
      .addCase(fetchCountryWeather.fulfilled, (state, action) => {
        const state1 = state;
        state1.status = 'idle';
        state1.countries = state.countries.map((country) => {
          if (country.country === action.payload.name) {
            const country1 = country;
            country1.weather = action.payload.weather;
            country1.main = action.payload.main;
            return country1;
          }

          return country;
        });
        state1.selectedCountry = action.payload;
      });
  },
});

export const { setSelectedCountry, setFilter } = countriesSlice.actions;

export const selectCountries = (state) => state.countries.countries;
export const selectFilter = (state) => state.countries.filter;
export const selectSelectedCountry = (state) => state.countries.selectedCountry;
export const selectFilteredCountry = (state) => {
  const countries = selectCountries(state);
  const filter = selectFilter(state);
  if (filter !== 'All') {
    return countries.filter((country) => country.country.includes(filter));
  }

  return countries;
};

export default countriesSlice.reducer;

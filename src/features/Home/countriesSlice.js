import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  status: 'idle',
};

export const fetchCountryData = createAsyncThunk(
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

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryData.pending, (state) => {
        const state1 = state;
        state1.status = 'loading';
      })
      .addCase(fetchCountryData.fulfilled, (state, action) => {
        const state1 = state;
        state1.status = 'idle';
        state1.countries = action.payload;
      });
  },
});

export const selectCountries = (state) => state.countries.countries;

export default countriesSlice.reducer;

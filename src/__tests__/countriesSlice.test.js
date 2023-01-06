import countriesReducer, { setSelectedCountry } from '../features/Home/countriesSlice';

describe('countries reducer', () => {
  const initialState = {
    countries: [],
    selectedCountry: '',
    status: 'idle',
  };
  const payload = {
    name: 'Nigeria',
    population: '216,746,934',
  };
  it('should handle initial state', () => {
    expect(countriesReducer(undefined, { type: 'unknown' })).toEqual({
      countries: [],
      selectedCountry: '',
      status: 'idle',
    });
  });

  it('should handle setSelectedCountry', () => {
    const actual = countriesReducer(initialState, setSelectedCountry(payload));
    expect(actual.selectedCountry).toEqual(payload);
  });
});

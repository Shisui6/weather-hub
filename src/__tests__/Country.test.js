import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../app/store';
import Country from '../features/Country/Country';

test('renders correctly', () => {
  const data = {
    id: 1,
    country: 'Nigeria',
    countryInfo: {
      flag: 'flag',
    },
    population: '216,746,934',
  };

  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <Country country={data} />
      </Router>
    </Provider>,
  );

  expect(getByText(/Nigeria/i)).toBeInTheDocument();
});

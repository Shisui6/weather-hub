import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../app/store';
import Details from '../features/Details/Details';

test('renders correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <Details />
      </Router>
    </Provider>,
  );

  expect(getByText(/Temperature/i)).toBeInTheDocument();
});

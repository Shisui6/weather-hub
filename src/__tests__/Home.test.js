import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import Home from '../features/Home/Home';

test('renders correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );

  expect(getByText(/Africa/i)).toBeInTheDocument();
});

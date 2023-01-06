import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../features/Navbar/Navbar';

describe('Navbar', () => {
  it('renders Navbar component', async () => {
    const tree = render(<Router><Navbar /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('contains the text Continent', () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );

    expect(screen.getByText('Continent')).toBeInTheDocument();
  });
});

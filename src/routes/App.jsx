import { Outlet } from 'react-router-dom';
import Navbar from '../features/Navbar/Navbar';

const App = () => (
  <div className="App">
    <Navbar />

    <div id="detail">
      <Outlet />
    </div>
  </div>
);

export default App;

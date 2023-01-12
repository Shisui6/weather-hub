import { Outlet } from 'react-router-dom';

const App = () => (
  <div className="App">
    <div id="detail">
      <Outlet />
    </div>
  </div>
);

export default App;

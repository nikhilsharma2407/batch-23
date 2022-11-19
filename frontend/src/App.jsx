import logo from './logo.svg';
import './App.css';
import Users from './Users/Users';
import { useState } from 'react';

function App() {
  const [showUsers, setUserView] = useState(true);

  // have state for showUsers 
  const name = "Nikhil";
  return (
    <div className="App">
      <div>
        <button onClick={e => setUserView(!showUsers)}>{showUsers ? 'Hide component' : 'Show Component'} </button>
      </div>

      {showUsers ? <Users /> : null}
    </div>
  );
}

export default App;

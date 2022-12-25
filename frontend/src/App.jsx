import logo from './logo.svg';
import './App.css';
import Users from './Users/Users';
import { useEffect, useState } from 'react';
import Flexbox from './Flexbox/Flexbox';
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Routing from './Routing/Routing';
import MyNavBar from './MyNavbar';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import { loginWithCookieUtil } from './apiUtil';
import Counter from "./Counter/Counter";
import Toast from './Toast';
import { useDispatch } from 'react-redux';
import { loginWithCookieAction } from './reducers/userReducer';
function App() {
  const [showUsers, setUserView] = useState(true);
  const [loginData, setLoginData] = useState(null)

  const dispatch = useDispatch();
  // have state for showUsers 
  const name = "Nikhil";
  useEffect(() => {
      dispatch(loginWithCookieAction());
  }, [])


  return (
    <>
      <BrowserRouter>
        <Toast/>
        <MyNavBar user={loginData} />
        <Routes>
          <Route path='/' element={
            <div className="App">
              <div>
                <button onClick={e => setUserView(!showUsers)}>{showUsers ? 'Hide component' : 'Show Component'} </button>
              </div>
              {showUsers ? <Users user={loginData} /> : null}
            </div>
          } />
          <Route path='/FLEX' element={<Flexbox />} />
          <Route path='/count' element={<Counter />} />
          <Route path='/route/:id' element={<Routing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login handleLoginData={setLoginData} />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavBar from './MyNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithCookieAction } from './reducers/userReducer';

const Signup = lazy(() => import('./Signup/Signup'));
const Login = lazy(() => import('./Login/Login'));
const Counter = lazy(() => import("./Counter/Counter"));
const Toast = lazy(() => import('./Toast'));
const Flexbox = lazy(() => import('./Flexbox/Flexbox'));
const Users = lazy(() => import('./Users/Users.tsx'));
const Routing = lazy(() => import('./Routing/Routing'));

function App() {
  const [showUsers, setUserView] = useState(true);
  const [loginData, setLoginData] = useState(null)
  const { loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  // have state for showUsers 
  const name = "Nikhil";
  useEffect(() => {
    dispatch(loginWithCookieAction());
  }, [])


  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner animation="border" className='spinner' role="status"/>: null}
        <Toast />
        <MyNavBar user={loginData} />
        <Suspense fallback={<Spinner animation="border" className='spinner' role="status"/>}>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

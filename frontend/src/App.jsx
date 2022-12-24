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
function App() {
  const [showUsers, setUserView] = useState(true);
  const [loginData, setLoginData] = useState(null)

  // have state for showUsers 
  const name = "Nikhil";
  useEffect(() => {
    (async()=>{
      try {
        const data = (await loginWithCookieUtil())?.data;
        if(data){
          setLoginData(data);
          console.log(data);
          alert(data.message)
        }
      } catch (error) {
        console.log(error);
      }

    })()
  }, [])
  

  return (
    <>
      <BrowserRouter>
        <MyNavBar user = {loginData} />
        <Routes>
          <Route path='/' element={
            <div className="App">
              <div>
                <button onClick={e => setUserView(!showUsers)}>{showUsers ? 'Hide component' : 'Show Component'} </button>
              </div>
              {showUsers ? <Users user = {loginData} /> : null}
            </div>
          } />
          <Route path='/FLEX' element={<Flexbox />} />
          <Route path='/count' element={<Counter/>} />
          <Route path='/route/:id' element={<Routing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login handleLoginData = {setLoginData} />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;

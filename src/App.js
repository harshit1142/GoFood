
import './App.css';


import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './screens/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';

import MyOder from './screens/MyOder';
import Cancel from './components/Cancel';
import Success from './components/Success';
import { useDispathCart } from './components/ContextReducer';
import { useEffect } from 'react';


function App() {
  let dispath = useDispathCart();

  useEffect(() => {
    if (localStorage.getItem("Lastcart") !== null) {
      dispath({ type: "Update", data: JSON.parse(localStorage.getItem('Lastcart')) });
    }
  }, [])

  return (
    

  <Router>
     <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menu" element={<Navbar />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOder />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/cancel" element={<Cancel />} />
        </Routes>

     </div>
 
  </Router>
  
    
  );
}

export default App;

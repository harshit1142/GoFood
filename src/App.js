
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


function App() {
  return (
  <Router>
     <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menu" element={<Navbar />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
        </Routes>

     </div>
 
  </Router>
  );
}

export default App;

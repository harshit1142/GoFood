
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
import { CartProvider } from './components/ContextReducer';
import MyOder from './screens/MyOder';


function App() {
  return (
    <CartProvider>

  <Router>
     <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menu" element={<Navbar />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOder />} />
        </Routes>

     </div>
 
  </Router>
  
    </CartProvider>
  );
}

export default App;

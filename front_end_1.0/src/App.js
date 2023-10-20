import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserDashboard from "./components/user_define"
import ImageMapComponent from "./components/user_define"
import Login from "./components/user_login"
import SignUp from "./components/user_signup"
import WelcomePage from "./components/welcome_page"
import './App.css'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard/:email" element={<ImageMapComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

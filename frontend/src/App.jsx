import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Layout from './layout/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

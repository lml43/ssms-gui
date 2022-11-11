import '../style/App.scss';
import LoginForm from './LoginForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Management from './Management';
import Class from './Class';
import TutorDanceClass from './DanceClass';
import axios from 'axios';
import GlobalConfig from '../config';

const apiUrl = GlobalConfig.apiUrl;

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function App() {

  return (
    <Router>
      <div className="App">
        <header className='AppHeader'>
          <Routes>
            <Route path="/" exact element={<LoginForm />} />
            <Route path="/management" element={<Management />} />
            <Route path="/class" element={<Class />} />
            <Route path="/tutor" element={<TutorDanceClass />} />
          </Routes>
        </header>
      </div>
    </Router>

  )
}

export default App;
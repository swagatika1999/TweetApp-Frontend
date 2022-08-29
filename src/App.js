import logo from './logo.svg';
import './App.css';
import Login from './components/Login/login';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Users from './components/Users/Users';
import Usertweets from './components/UserTweets/Usertweets';
import UsertweetsUpdate from './components/UserTweets/UsertweetsUpdate';
import ParticularUsertweets from './components/Users/ParticularUsertweets/ParticularUsertweets';
import Comments from './components/Comments/Comments';
import Registration from './components/Registration/Registration';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';


function App() {
  
  
  return (
  
    <div className="App">
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/homepage/yourtweets" element={<Usertweets />} />
        <Route path="/homepage/users" element={<Users />} />
        <Route exact path="/:username/edit/:id"  element={<UsertweetsUpdate />} />
        <Route path="/displaytweets/:username" element={<ParticularUsertweets />} />
        <Route path="/Comments/:id" element={<Comments />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="/:username/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
    
  );
}

export default App;

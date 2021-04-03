import { Route, Switch } from 'react-router-dom';
import './App.css';
import { About } from './components/About/About';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header'
import LoginComponent from './components/Login/LoginComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import RegisterComponent from './components/Register';
import SampleComponent from './components/SampleComponent';
import SickDayComponent from './components/SickDay';
import VacationDay from './components/VacationDay';
import UserContextProvider from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header/>
        <Switch>
          <Route path='/home' exact component={SampleComponent} />
          <Route path='/sickDays' exact component={SickDayComponent} />
          <Route path='/vacationDays' exact component={VacationDay} />
          <Route path='/user/profile/someUser' exact component={ProfileComponent} />
          <Route path='/auth/register' exact component={SampleComponent} />
          <Route path='/auth/login' exact component={SampleComponent} />
          <Route path='/about' exact component={About} />
          <Route path='/login' exact component={LoginComponent} />
          <Route path='/register' exact component={RegisterComponent} />
        </Switch>
        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;

import { Route, Switch } from 'react-router-dom';
import './App.css';
import { About } from './components/About/About';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header'
import LoginComponent from './components/Login/LoginComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import RegisterComponent from './components/Register';
import HomeComponent from './components/Home/HomeComponent';
import SickDayComponent from './components/SickDay';
import VacationDay from './components/VacationDay';
import UserContextProvider from './contexts/UserContext';
import ErrorBoundary from './error/ErrorBoundary';
import AdminVacationDayComponent from './components/Admin/AdminVacationDayComponent';
import AdminSickDayComponent from './components/Admin/AdminSickDayComponent';
import NotFoundComponent from './components/404/NotFoundComponent';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <UserContextProvider>
          <Header />
          <Switch>
            <Route path='/home' exact component={HomeComponent} />
            <Route path='/' exact component={HomeComponent} />
            <Route path='/sickDays' exact component={SickDayComponent} />
            <Route path='/vacationDays' exact component={VacationDay} />
            <Route path='/user/profile/' component={ProfileComponent} />
            <Route path='/auth/register' exact component={HomeComponent} />
            <Route path='/auth/login' exact component={HomeComponent} />
            <Route path='/about' exact component={About} />
            <Route path='/login' exact component={LoginComponent} />
            <Route path='/register' exact component={RegisterComponent} />
            <Route path='/admin/vacationDays' exact component={AdminVacationDayComponent} />
            <Route path='/admin/sickDays' exact component={AdminSickDayComponent} />
            <Route path="*" component={NotFoundComponent}></Route>
            {/* <PrivateRoute path='/panel' exact component={ProfileComponent}/> */}
          </Switch>
          <Footer />
        </UserContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;

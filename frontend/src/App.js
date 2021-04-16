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
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import LogOutComponent from './components/LogOutComponent';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <UserContextProvider>
          <Header />
          <Switch>
            <PublicRoute path='/home' exact component={HomeComponent} />
            <PublicRoute path='/' exact component={HomeComponent} />
            <PrivateRoute path='/sickDays' exact component={SickDayComponent} />
            <PrivateRoute path='/vacationDays' exact component={VacationDay} />
            <PrivateRoute path='/user/profile/' component={ProfileComponent} />
            {/* <Route path='/auth/register' exact component={HomeComponent} />
            <Route path='/auth/login' exact component={HomeComponent} /> */}
            <PublicRoute path='/about' exact component={About} />
            <PublicRoute restricted={true} path='/login' exact component={LoginComponent} />
            <PublicRoute restricted={true} path='/register' exact component={RegisterComponent} />
            <PublicRoute restricted={true} path='/logout' exact component={LogOutComponent} />
            <PrivateRoute path='/admin/vacationDays' exact component={AdminVacationDayComponent} />
            <PrivateRoute path='/admin/sickDays' exact component={AdminSickDayComponent} />
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

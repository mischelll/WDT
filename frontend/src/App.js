import { Route, Switch } from 'react-router-dom';
import './App.css';
import { About } from './components/About/About';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header'
import LoginComponent from './components/Login/LoginComponent';
import RegisterComponent from './components/Register';
import SampleComponent from './components/SampleComponent';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/home' exact component={SampleComponent} />
        <Route path='/auth/register' exact component={SampleComponent} />
        <Route path='/auth/login' exact component={SampleComponent} />
        <Route path='/about' exact component={About} />
        <Route path='/login' exact component={LoginComponent} />
        <Route path='/register' exact component={RegisterComponent} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

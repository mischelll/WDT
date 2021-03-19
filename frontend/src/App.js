import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import SampleComponent from './components/SampleComponent';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/home' exact component={SampleComponent} />
      </Switch>
    </div>
  );
}

export default App;

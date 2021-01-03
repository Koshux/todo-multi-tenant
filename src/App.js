import logo from './logo.svg';
import './App.css';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/login" exact component={ Login } />
          <Route path="/register" exact component={ Register } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import './App.css'
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/protected-route'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute
            component={Home}
            exact
            path="/home"
          />
          <Route
            component={ Login }
            exact
            path="/"
          />
          <Route
            component={ Register }
            exact
            path="/register"
          />
          <Route
            path="*"
            component={() => "404 - Page Not Found"}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

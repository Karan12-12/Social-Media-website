import Signup from '../pages/Signup';
import { Home } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../pages/Login';
import { useAuth } from '../hooks';
import Settings from '../pages/Settings';
import { Navigate } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/register" element={<Signup />} />
          <Route
            exact
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import ApplicationViews from './components/ApplicationViews';
import { useEffect, useState } from 'react';
import { me, onLoginStatusChange } from './modules/authManager';
import { Spinner } from 'reactstrap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUser);
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} user={user} />
      <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
    </BrowserRouter>
  );
}

export default App;
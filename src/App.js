import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Token from './ContextApi/TokenApi';


function App() {
  const LoginStatUs = useContext(Token)
  return (

    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!LoginStatUs.token && <Route path='/auth'>
          <AuthPage />
        </Route>}
        <Route path='/profile'>
          {LoginStatUs.token &&<UserProfile />}
          {!LoginStatUs.token && <Redirect to="/auth"/>}
          </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

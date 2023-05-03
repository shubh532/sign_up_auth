import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import Token from '../../ContextApi/TokenApi';

const MainNavigation = () => {
  const TokenID = useContext(Token)

  const LogOutHandler = () => {
    TokenID.DeleteTokenId()
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>

          {!TokenID.token &&
            <li>
              <Link to='/auth'>Login</Link>
            </li>}


          {TokenID.token &&
            <li>
              <Link to='/auth'>Profile</Link>
            </li>}


          {TokenID.token &&
            <li>
              <button onClick={LogOutHandler} >Logout</button>
            </li>}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

import { useState, useRef,useContext } from 'react';
import Token from '../../ContextApi/TokenApi';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [SendRequest, SetSendRequest] = useState(false)
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const TokenID=useContext(Token)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    SetSendRequest(true)
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    if (isLogin) {

    } else {
      const Response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-Bn5PjUAaplAicPOLXy7tw2aCnLfXqZc", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecreToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (Response.ok) {
        alert("You Are Successfully Authencticate")
        SetSendRequest(false)
      } else {
        const ErrorRespnse = await Response.json()
        alert(ErrorRespnse.error.message)
        SetSendRequest(false)

      }
    }
  }
  const LoginHandler = async (event) => {
    event.preventDefault();
    SetSendRequest(true)
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    if (!isLogin) {

    } else {
      const Response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-Bn5PjUAaplAicPOLXy7tw2aCnLfXqZc", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecreToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      

      if (Response.ok) {
        const SuccessResponse=await Response.json()
        TokenID.StoreTokenId(SuccessResponse.idToken)
        SetSendRequest(false)
        
      } else {
        await Response.json()
        alert("Authentication Failled")
        SetSendRequest(false)

      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={isLogin?LoginHandler:submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {SendRequest ? <h1>Sending Request...</h1> : <button>{isLogin ? "Login" : "Create Account"}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

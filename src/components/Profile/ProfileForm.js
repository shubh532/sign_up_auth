import classes from './ProfileForm.module.css';
import { useRef,useState } from 'react';
import { useContext } from 'react';
import Token from '../../ContextApi/TokenApi';


const ProfileForm = () => {


  const [SendRequest, SetSendRequest] = useState(false)

  const  passwordInputRef=useRef()

  const tokenId=useContext(Token)


  const ResetPassWord = async (event) => {
    event.preventDefault();
    SetSendRequest(true)
    const enteredPassword = passwordInputRef.current.value

    const Response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-Bn5PjUAaplAicPOLXy7tw2aCnLfXqZc", {
      method: "POST",
      body: JSON.stringify({
        idToken:tokenId.token,
        password: enteredPassword,
        returnSecreToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (Response.ok) {
      alert("You Are Successfully Reset Password")
      SetSendRequest(false)
    } else {
      const ErrorRespnse = await Response.json()
      alert(ErrorRespnse.error.message)
      SetSendRequest(false)

    }
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' minLength="7" id='new-password' ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={ResetPassWord}>Change Password</button>
        {SendRequest&&<h3>Please Wait...</h3>}
      </div>
    </form>
  );
}

export default ProfileForm;

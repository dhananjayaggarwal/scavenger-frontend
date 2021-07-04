import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword, validateName } from "../common/formValidation";
// import { EMAIL, PASSWORD } from "../../constants";
import { useDispatch } from "react-redux";
// import { login } from "../../actions/index";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const LoginForm = ({isLoggedIn, setIsLoggedIn, userData, setUserData}) => {
  const USERNAME = "username";
const PHONE = "phone";
const PASSWORD = "password";
const PINCODE = "pincode";
const NAME = "name";
  const [username, setUsername] = useState({
    value: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
  });
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    console.log('loginFOrm check',isLoggedIn)
    if(isLoggedIn){
      history.push('/');
    }
  }, [isLoggedIn]);

  const validateAllFields = () => {
    return !validateName(username.value) && !validatePassword(password.value);
  };

  const handleChangeInput = (e) => {
    let { target } = e;
    switch (target.name) {
      case USERNAME:
        setUsername({ ...username, value: target.value });
        break;
      case PASSWORD:
        setPassword({ ...password, value: target.value });
        break;
      default:
      // error_modal("wrong input");
    }
  };

  const handleBlurInput = (e) => {
    const { target } = e;
    switch (target.name) {
      case USERNAME:
        setUsername({ ...username, error: validateName(username.value) });
        break;
      case PASSWORD:
        setPassword({
          ...password,
          error: validatePassword(password.value, "login"),
        });
        break;
      default:
      // error_modal("wrong input");
    }
  };

  /*
  
  {
    "success": "true",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJhZGxhcHVyIiwidXNlcklkIjoyLCJyb2xlIjoiQlJBTkNIIiwiYnJhbmNoSWQiOjEsImlhdCI6MTYyNTM5OTE0MiwiZXhwIjoxNjI1NDM1MTQyfQ.uylCu4L6Wj9-urY8jbsvq6LL0IKhG8YgrIX9Wt52-m8",
    "expiresIn": "36000",
    "userId": 2,
    "role": "BRANCH",
    "pendingNotifications": []
}
  
  
  */
  const submitForm = async (e) => {
    e.preventDefault();
    if (validateAllFields()) {
      let data = {
        username: username.value,
        password: password.value,
      };
      // const formData = new FormData();
      // formData.set(EMAIL, email.value);
      // formData.set(PASSWORD, password.value);
      // dispatch(login(data));
      console.log("process.env.REACT_APP_API_URL + ",process.env)
      const res = await axios.post(process.env.REACT_APP_API_URL + "/api/user/login", data)
      console.log('reached');
      console.log(res);
      if(res.data.success){
        
        window.localStorage.setItem("token",res.data.token);
        let d = {bid: res.data.bid, role:  res.data.role}
        setUserData(d);
        setIsLoggedIn(true);
        //battery khatam phone meet mic is on
      } else{
        console.log('aree');
        // show something went wrong
      }
      
      history.push("/");
    }
  };
  return (
    <div className="login-form">
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username: </label>
          <input
            className="form-input"
            name={USERNAME}
            value={username.value}
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
          />
          {username.error && <small className="error-msg">{username.error}</small>}
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            className="form-input"
            name={PASSWORD}
            value={password.value}
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
          />
          {password.error && (
            <small className="error-msg">{password.error}</small>
          )}
        </div>
        <button className="btn bnt-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
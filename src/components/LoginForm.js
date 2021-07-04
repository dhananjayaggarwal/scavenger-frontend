import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../common/formValidation";
import { EMAIL, PASSWORD } from "../../constants";
import { useDispatch } from "react-redux";
import { login } from "../../actions/index";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
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

  // useEffect(() => {
  //   dispatch(isLoggedIn());
  // }, [dispatch]);

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
  const submitForm = (e) => {
    e.preventDefault();
    if (validateAllFields()) {
      let data = {
        username: username.value,
        password: password.value,
      };
      // const formData = new FormData();
      // formData.set(EMAIL, email.value);
      // formData.set(PASSWORD, password.value);
      dispatch(login(data));
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
          {email.error && <small className="error-msg">{email.error}</small>}
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
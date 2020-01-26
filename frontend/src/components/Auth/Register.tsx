import React from "react";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import cookie from "js-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Alertify from "../../utils/alertify";

const INITIAL_USER = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

const INITIAL_ERROR = {
  usernameErr: "",
  emailErr: "",
  password: "",
  passwordConfirmation: ""
};

const Register: React.FC = () => {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [formError, setFormErr] = React.useState(INITIAL_USER);
  const [error, setError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const alertify = new Alertify();

  React.useEffect(() => {
    const formValid = Object.values(user).every(el => Boolean(el));

    formValid ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    // @ts-ignore
    event.preventDefault();

    try {
      setError("");
      const url = `${baseUrl}/auth/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);

      cookie.set("token", response.data.token);
      alertify.success(response["data"]["message"]);
      setRedirect(true);
    } catch (e) {
      alertify.error(e.response.data.message);
      console.error(e);
    }
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <div className="col-md-5">
          <h3 className="mb-4">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={user.email}
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="form-control"
              />
              <div>{formError.email}</div>
            </div>
            <div className="form-group">
              <input
                value={user.username}
                name="username"
                onChange={handleChange}
                placeholder="Username"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                value={user.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                value={user.passwordConfirmation}
                name="passwordConfirmation"
                onChange={handleChange}
                placeholder="Confirm the password"
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button
                disabled={disabled}
                type="submit"
                className="btn btn-success btn-block"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;

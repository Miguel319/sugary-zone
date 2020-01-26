import React, { Component } from "react";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import cookie from "js-cookie";
import Alertify from "../../utils/alertify";
import { Redirect } from "react-router-dom";

const INITIAL_USER = {
  email: "",
  password: ""
};

const Login: React.FC = () => {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [redirect, setRedirect] = React.useState(false);

  const alertify = new Alertify();

  React.useEffect(() => {
    const formValid = Object.values(user).every(val => Boolean(val));

    return formValid ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const url = `${baseUrl}/auth/signin`;
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
        <Redirect to="/"></Redirect>
      ) : (
        <div className="col-md-5">
          <h3 className="mb-4">Login</h3>
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

export default Login;

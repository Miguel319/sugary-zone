import React, { Component, ChangeEvent } from "react";
import baseUrl from "../../utils/baseUrl";
import axios, { AxiosResponse } from "axios";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import { Toast } from "../../utils/toast";
import User from "../../models/user";

const INITIAL_USER: User = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [user, setUser] = React.useState<User>(INITIAL_USER);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [redirect, setRedirect] = React.useState<boolean>(false);

  React.useEffect(() => {
    const formValid = Object.values(user).every((val) => Boolean(val));

    return formValid ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const url: string = `${baseUrl}/auth/signin`;
      const payload: Object = { ...user };

      const {
        data: { token, message },
      }: AxiosResponse<any> = await axios.post(url, payload);

      cookie.set("token", token);

      Toast.fire({
        icon: "success",
        title: message,
      });

      setTimeout(() => setRedirect(true), 1300);
    } catch (e) {
      console.log(e.response);

      Toast.fire({
        icon: "error",
        title: e.response.data.message,
      });
      console.error(e);
    }
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/"></Redirect>
      ) : (
        <div className="mt-3 container">
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
        </div>
      )}
    </>
  );
};

export default Login;

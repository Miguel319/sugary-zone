import React, { ChangeEvent } from "react";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import cookie from "js-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Toast } from "../../utils/toast";
import User from "../../models/user";

const INITIAL_USER: User = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const INITIAL_ERROR = {
  usernameErr: "",
  emailErr: "",
  password: "",
  passwordConfirmation: "",
};

const Register: React.FC = () => {
  const [user, setUser] = React.useState<User>(INITIAL_USER);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [formError, setFormErr] = React.useState(INITIAL_USER);
  const [error, setError] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);

  React.useEffect(() => {
    const formValid = Object.values(user).every((el) => Boolean(el));

    formValid ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (event: any): void => {
    const { name, value } = event.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (
    event: ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      setError("");
      const url = `${baseUrl}/auth/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);

      cookie.set("token", response.data.token);

      Toast.fire({
        icon: "success",
        title: response.data.message,
      });

      setTimeout(() => setRedirect(true), 1300);
    } catch (e) {
      Toast.fire({
        icon: "success",
        title: e.response.data.message,
      });
      setError(e.response.data.message);
      console.error(e);
    }
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <div className="mt-3 container">
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
        </div>
      )}
    </>
  );
};

export default Register;

import React, { Component } from "react";
import "./navbar.styles.css";
import { Link, Redirect } from "react-router-dom";
import cookie from "js-cookie";

export default class Navbar extends Component {
  state = {
    token: cookie.get("token"),
    loggedOut: false,
  };

  constructor(props: any) {
    super(props);

    this.signout = this.signout.bind(this);
  }

  private signout() {
    cookie.remove("token");

    this.setState({
      loggedOut: true,
    });
  }

  render() {
    return (
      <div>
        {this.state.loggedOut && <Link to="/"></Link>}
        <nav className="navbar navbar-expand-lg navbar-light nav-bg">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Sugary Zone
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/create">
                    Add recipe <span className="sr-only">(current)</span>
                  </Link>
                </li>
                {!this.state.token && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Signin
                    </Link>
                  </li>
                )}
                {!this.state.token && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                )}
                {this.state.token && (
                  <li className="nav-item nav-link" onClick={this.signout}>
                    Logout
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

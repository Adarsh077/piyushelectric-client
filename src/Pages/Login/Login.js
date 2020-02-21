import React, { Component } from "react";
import "./login.css";
import { Axios } from "../../Constants";
import { loginUser, isLoggedIn } from "../../utils";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      remember: false
    };
  }

  componentDidMount = () => isLoggedIn() && this.props.history.push("/");

  handleChange = value => this.setState({ password: value });

  handleRememberChange = () =>
    this.setState({ remember: !this.state.remember });

  handleSubmit = e => {
    e.preventDefault();
    const { remember, password } = this.state;

    Axios.post("/authenticate", { password })
      .then(res => {
        if (res.data) {
          loginUser(remember);
          this.props.history.replace("/");
        } else alert("Incorrect Password!");
      })
      .catch(err => console.log(err) && alert("An error Occurred!"));
  };

  render = () => {
    const { password } = this.state;
    return (
      <div className="login d-flex align-items-center bg-light">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-6 col-lg-4 m-auto">
              <div className="card card-signin">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="form-label-group">
                      <input
                        required
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={e => this.handleChange(e.target.value)}
                      />
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        id="rememberMe"
                        type="checkbox"
                        className="custom-control-input"
                        onChange={this.handleRememberChange}
                      />
                      <label
                        htmlFor="rememberMe"
                        className="custom-control-label"
                      >
                        Remember Me
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

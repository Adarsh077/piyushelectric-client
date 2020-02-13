import React, { Component } from "react";
import { Axios } from "../Constants";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      work: "",
      date: "",
      area: "",
      building: "",
      room: "",
      wing: "",
      mobile: ""
    };
  }

  handleChange = e => {
    const { value, name } = e.target;
    const newState = this.state;
    if (name === "mobile") {
      if (value.length < 11) {
        newState[name] = value;
        this.setState(newState);
      }
    } else {
      newState[name] = value;
      this.setState(newState);
    }
  };

  resetState = () => {
    this.setState({
      name: "",
      work: "",
      date: "",
      area: "",
      building: "",
      room: "",
      wing: "",
      mobile: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, area, building, mobile, date, work, wing, room } = this.state;
    if (mobile.length === 10) {
      Axios.post("/client", {
        name,
        mobile,
        date,
        address: { area, building, wing, room },
        work: [{ title: work, date }]
      })
        .then(
          ({ data }) =>
            alert("Client Added") || console.log(data) || this.resetState()
        )
        .catch(err => console.log(err));
    } else {
      alert("Mobile No is Incorret");
    }
  };

  render = () => {
    const { name, area, building, room, wing, mobile, work, date } = this.state;
    return (
      <div className="row container-fluid mt-5">
        <div className="col-12 col-md-6 col-lg-4 m-auto">
          <form className="card  px-1 py-3" onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="mobile"
                      value={mobile}
                      onChange={this.handleChange}
                      placeholder="Mobile"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="work"
                      value={work}
                      onChange={this.handleChange}
                      placeholder="Work"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="date"
                      value={date}
                      onChange={this.handleChange}
                      placeholder="Date"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="area"
                      value={area}
                      onChange={this.handleChange}
                      placeholder="Area"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="building"
                      value={building}
                      onChange={this.handleChange}
                      placeholder="Building"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="room"
                      value={room}
                      onChange={this.handleChange}
                      placeholder="Room"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="wing"
                      value={wing}
                      onChange={this.handleChange}
                      placeholder="Wing"
                    />
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block px-4"
                  >
                    Add Client
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

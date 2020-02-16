import React, { Component } from "react";
import uuid from "uuid/v4";
import { Axios, buildings } from "../Constants";
import Overlay from "../Components/Overlay/Overlay";

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
      mobile: "",
      isLoading: false
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
      mobile: "",
      isLoading: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, area, building, mobile, date, work, wing, room } = this.state;
    if (mobile.length !== 10) {
      alert("Mobile No is Incorret");
      return 0;
    }
    this.setState({ isLoading: true });
    Axios.post("/client", {
      name,
      mobile,
      date,
      address: { area, building, wing, room },
      work: [{ title: work, date }]
    })
      .then(_ => this.resetState())
      .catch(err => {
        this.setState({ isLoading: false });
        alert("An Error occured!");
        console.log(err);
      });
  };

  render = () => {
    const {
      name,
      area,
      building,
      room,
      wing,
      mobile,
      work,
      date,
      isLoading
    } = this.state;
    return (
      <div className="row container-fluid mt-5">
        {isLoading && <Overlay />}
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
                      list="buildingList"
                      placeholder="Building"
                    />
                    <datalist id="buildingList">
                      {buildings.map(item => (
                        <option value={item} key={uuid()} />
                      ))}
                    </datalist>
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

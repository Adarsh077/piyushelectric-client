import React, { Component } from "react";
import uuid from "uuid/v4";
import {
  Axios,
  buildings,
  areaList,
  initialClientState,
  workList,
  wingList
} from "../Constants";
import Overlay from "../Components/Overlay/Overlay";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      ...initialClientState,
      isLoading: false
    };
  }

  handleChange = (e, key1, key2) => {
    const { value } = e.target,
      state = this.state;

    if (key1 === "mobile") if (value.length >= 11) return;

    if (key2) state[key1][key2] = value;
    else state[key1] = value;

    this.setState(state);
  };

  initialState = () => {
    return {
      ...initialClientState,
      isLoading: false
    };
  };

  handleSubmit = e => {
    e.preventDefault();

    let client = this.state;
    client.work = { title: client.work, date: client.date };

    if (client.mobile && client.mobile.length !== 10) {
      alert("Mobile No is Incorrect");
      return 0;
    }

    this.setState({ isLoading: true });
    Axios.post("/client", client)
      .then(_ => this.setState(this.initialState))
      .catch(err => {
        this.setState({ isLoading: false });
        alert("An Error occured!");
        console.log(err);
      });
  };

  render = () => {
    const { name, mobile, date, work, isLoading } = this.state;
    const { room, wing, area, building } = this.state.address;

    return (
      <div className="row container-fluid mt-5">
        {isLoading && <Overlay />}
        <div className="col-12 col-md-6 col-lg-4 m-auto">
          <form className="card  px-1 py-3" onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Name: </label>
                    <input
                      name="name"
                      type="text"
                      value={name}
                      placeholder="Name"
                      className="form-control"
                      onChange={e => this.handleChange(e, "name")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Mobile: </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={mobile}
                      placeholder="Mobile"
                      className="form-control"
                      onChange={e => this.handleChange(e, "mobile")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Work: </label>
                    <input
                      type="text"
                      name="work"
                      value={work}
                      list="workList"
                      placeholder="Work"
                      className="form-control"
                      onChange={e => this.handleChange(e, "work")}
                    />
                    <datalist id="workList">
                      {workList.map(item => (
                        <option value={item} key={uuid()} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Date: </label>
                    <input
                      type="text"
                      name="date"
                      value={date}
                      placeholder="Date"
                      className="form-control"
                      onChange={e => this.handleChange(e, "date")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Area: </label>
                    <input
                      type="text"
                      name="area"
                      value={area}
                      list="areaList"
                      placeholder="Area"
                      className="form-control"
                      onChange={e => this.handleChange(e, "address", "area")}
                    />
                    <datalist id="areaList">
                      {areaList.map(item => (
                        <option value={item} key={uuid()} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Building: </label>
                    <input
                      type="text"
                      name="building"
                      value={building}
                      list="buildingList"
                      placeholder="Building"
                      className="form-control"
                      onChange={e =>
                        this.handleChange(e, "address", "building")
                      }
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
                    <label>Room: </label>
                    <input
                      type="text"
                      name="room"
                      value={room}
                      placeholder="Room"
                      className="form-control"
                      onChange={e => this.handleChange(e, "address", "room")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Wing: </label>
                    <input
                      type="text"
                      name="wing"
                      value={wing}
                      list="wingList"
                      placeholder="Wing"
                      className="form-control"
                      onChange={e => this.handleChange(e, "address", "wing")}
                    />
                    <datalist id="wingList">
                      {wingList.map(item => (
                        <option value={item} key={uuid()} />
                      ))}
                    </datalist>
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

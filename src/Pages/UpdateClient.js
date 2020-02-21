import React, { Component } from "react";
import uuid from "uuid/v4";
import {
  Axios,
  buildings,
  areaList,
  initialClientState,
  wingList
} from "../Constants";
import AddWork from "../Components/AddWork/AddWork";
import Overlay from "../Components/Overlay/Overlay";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      client: initialClientState,
      isUpdating: false,
      addWork: { title: "", date: "" }
    };
  }

  componentDidMount = () => this.reinitializeData();

  reinitializeData = () => {
    const client = localStorage.getItem("client");
    this.setState({ client: JSON.parse(client) });
  };

  handleChange = (e, key1, key2, key3) => {
    const { value } = e.target,
      state = this.state;

    if (key2 === "mobile") if (value.length >= 11) return;

    if (key3) state[key1][key2][key3] = value;
    else state[key1][key2] = value;

    this.setState(state);
  };

  handleSubmit = e => {
    if (e) e.preventDefault();

    const { client } = this.state;
    const { mobile } = client;

    if (mobile.toString().length > 10) {
      alert("Please enter corrent Mobile No.: ");
      return 0;
    }

    this.setState({ isUpdating: true });

    Axios.put(`/client/`, client)
      .then(({ data }) => {
        localStorage.setItem("client", JSON.stringify(data));
        this.setState({ isUpdating: !!0, client: data }, this.reinitializeData);
      })
      .catch(err => alert("An Error Occurred!") || console.log(err));
  };

  deleteClient = () => {
    if (window.confirm(`Delete ${this.state.client.name}'s data?`)) {
      this.setState({ isUpdating: true });
      Axios.delete(`/client/${this.state.client._id}`)
        .then(_ => {
          localStorage.removeItem("client");
          this.props.history.replace("/");
        })
        .catch(err => alert("An error occurred") || console.log(err));
    }
  };

  submitWork = () => {
    const { addWork, client } = this.state;
    const { title, date } = addWork;

    if (!title.trim() || !date.trim()) {
      alert("All Work feilds are required!");
      return 0;
    }

    client.work.push({ title, date });

    this.setState(
      { client, addWork: { title: "", date: "" } },
      this.handleSubmit
    );
  };

  deleteWork = idx => {
    const { client } = this.state;
    const work = client.work[idx];

    const confirm = window.confirm(`
    Delete ${client.name}'s work?

    ${work.title}   ${work.date}
    `);

    if (confirm) {
      client.work.splice(idx, 1);
      this.setState({ client }, this.handleSubmit);
    }
  };

  render = () => {
    const { addWork, isUpdating } = this.state;
    const { name, mobile, date, work } = this.state.client;
    const { wing, room, building, area } = this.state.client.address;

    return (
      <div className="row container-fluid mt-5">
        {isUpdating && <Overlay />}
        <div className="col-12 col-md-6 col-lg-4 mx-auto">
          <form className="card px-1 py-3" onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      value={name}
                      placeholder="Name"
                      className="form-control"
                      onChange={e => this.handleChange(e, "client", "name")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Mobile: </label>
                    <input
                      type="tel"
                      value={mobile}
                      placeholder="Mobile"
                      className="form-control"
                      onChange={e => this.handleChange(e, "client", "mobile")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Date: </label>
                    <input
                      type="text"
                      value={date}
                      placeholder="Date"
                      className="form-control"
                      onChange={e => this.handleChange(e, "client", "date")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Wing: </label>
                    <input
                      type="text"
                      value={wing}
                      placeholder="Wing"
                      list="wingList"
                      className="form-control"
                      onChange={e =>
                        this.handleChange(e, "client", "address", "wing")
                      }
                    />
                    <datalist id="wingList">
                      {wingList.map(item => (
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
                      value={room}
                      placeholder="Room"
                      onChange={e =>
                        this.handleChange(e, "client", "address", "room")
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Building: </label>
                    <input
                      type="text"
                      value={building}
                      className="form-control"
                      onChange={e =>
                        this.handleChange(e, "client", "address", "building")
                      }
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
                    <label>Area: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={area}
                      list="areaList"
                      onChange={e =>
                        this.handleChange(e, "client", "address", "area")
                      }
                      placeholder="Area"
                    />
                    <datalist id="areaList">
                      {areaList.map(item => (
                        <option value={item} key={uuid()} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block d-flex justify-content-center align-items-center mb-3 px-4"
                  >
                    <span className="ml-2">Update</span>
                  </button>
                  <hr />
                </div>
                <div className="col-12 text-center">
                  <input
                    type="button"
                    className="btn btn-danger btn-block px-2"
                    value={`Delete ${name}`}
                    onClick={this.deleteClient}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-12 col-md-6 col-lg-6 mx-auto">
          <div className="mb-3 mt-3 mt-md-0">
            <AddWork
              addWork={addWork}
              handleChange={this.handleChange}
              submitWork={this.submitWork}
            />
          </div>
          <hr />

          {work && (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Work</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {work.map(({ title, date }, idx) => (
                  <tr key={uuid()} onClick={this.deleteWork.bind(this, idx)}>
                    <td>{title}</td>
                    <td>
                      <div className="row">
                        <div className="col-10">{date}</div>
                        <div className="col-2">
                          <i className="fal fa-trash-alt text-danger"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };
}

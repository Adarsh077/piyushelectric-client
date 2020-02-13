import React, { Component } from "react";
import uuid from "uuid/v4";
import { Axios } from "../Constants";
import AddWork from "../Components/AddWork/AddWork";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      client: {},
      isUpdating: false,
      addWork: { title: "", date: "" }
    };
  }

  componentDidMount = () => this.reinitializeData();

  reinitializeData = () => {
    const client = localStorage.getItem("client");
    this.setState({ client: JSON.parse(client) }, () => {
      window.$("#work").DataTable();
    });
  };

  handleChange = (e, key1, key2, key3) => {
    const { value } = e.target,
      state = this.state;
    if (key2 === "mobile") if (value.length >= 11) return;
    if (key3) {
      state[key1][key2][key3] = value;
    } else {
      state[key1][key2] = value;
    }
    this.setState(state);
  };

  handleSubmit = e => {
    if (e) e.preventDefault();
    const { client } = this.state;
    const { mobile } = client;
    if (mobile.toString().length > 10) {
      alert("Incorrent   No.");
      return;
    }
    this.setState({ isUpdating: true });
    Axios.put(`/client/`, client)
      .then(_ => {
        localStorage.setItem("client", JSON.stringify(_.data));
        this.setState(
          { isUpdating: false, client: _.data },
          this.reinitializeData
        );
      })
      .catch(err => console.log(err));
  };

  deleteClient = () => {
    const { _id } = this.state.client;
    Axios.delete(`/client/${_id}`)
      .then(_ => this.props.history.push("/"))
      .catch(err => console.log(err));
  };

  submitWork = () => {
    const {
      addWork: { title, date },
      client
    } = this.state;

    const newWork = this.state.client.work.slice();
    newWork.push({ title, date });

    this.setState(
      {
        client: { ...client, work: newWork },
        addWork: { title: "", date: "" }
      },
      () => {
        this.handleSubmit();
      }
    );
  };

  deleteWork = idx => {
    let { client } = this.state;
    let newWork = client.work.slice();
    newWork.splice(idx, 1);
    this.setState({ client: { ...client, work: newWork } }, this.handleSubmit);
  };

  render = () => {
    const { client, addWork, isUpdating } = this.state;
    if (!client.name) return <div>Loading...</div>;
    const {
      name,
      mobile,
      date,
      work,
      address: { wing, room, building, area }
    } = client;
    return (
      <div className="row container-fluid mt-5">
        {isUpdating && <div className="spinner"></div>}
        <div className="col-12 col-md-6 col-lg-4 mx-auto">
          <form className="card px-1 py-3" onSubmit={this.handleSubmit}>
            <div className="card-body py-0">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={e => this.handleChange(e, "client", "name")}
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Mobile: </label>
                    <input
                      type="number"
                      className="form-control"
                      value={mobile}
                      onChange={e => this.handleChange(e, "client", "mobile")}
                      placeholder="Mobile"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Date: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={date}
                      onChange={e => this.handleChange(e, "client", "date")}
                      placeholder="Date"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Area: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={area}
                      onChange={e =>
                        this.handleChange(e, "client", "address", "area")
                      }
                      placeholder="Area"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Building: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={building}
                      onChange={e =>
                        this.handleChange(e, "client", "address", "building")
                      }
                      placeholder="Building"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Room: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={room}
                      onChange={e =>
                        this.handleChange(e, "client", "address", "room")
                      }
                      placeholder="Room"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Wing: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={wing}
                      onChange={e =>
                        this.handleChange(e, "client", "address", "wing")
                      }
                      placeholder="Wing"
                    />
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
            <table id="work" className="table table-hover">
              <thead>
                <tr>
                  <th>Work</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {work.map(({ title, date }, idx) => {
                  return (
                    <tr
                      key={uuid()}
                      style={{ cursor: "pointer" }}
                      onClick={() => {}}
                    >
                      <td>{title}</td>
                      <td>{date}</td>
                      <td onClick={this.deleteWork.bind(this, idx)}>
                        <i className="fal fa-trash-alt text-danger"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };
}

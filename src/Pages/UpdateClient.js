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
      addWork: { title: "", date: "" },
      deleteWork: { idx: "", title: "", date: "" }
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

  showDeleteModal = idx => {
    this.setState({ deleteWork: { ...this.state.client.work[idx], idx: idx } });
    window.$("#exampleModal").modal("show");
  };

  deleteWork = () => {
    let {
      client,
      deleteWork: { idx }
    } = this.state;
    let newWork = client.work.slice();
    window.$("#exampleModal").modal("hide");
    newWork.splice(idx, 1);
    this.setState(
      { client: { ...client, work: newWork }, deleteWork: "" },
      this.handleSubmit
    );
  };

  render = () => {
    const { client, addWork, isUpdating, deleteWork } = this.state;
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Work</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {work.map(({ title, date }, idx) => (
                  <tr
                    key={uuid()}
                    onClick={this.showDeleteModal.bind(this, idx)}
                  >
                    <td>{title}</td>
                    <td>{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="exampleModalLabel">
                  {`Delete ${name}'s Work?`}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Title: {deleteWork.title} <br />
                Date: {deleteWork.date}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  No
                </button>
                <button
                  onClick={this.deleteWork}
                  type="button"
                  className="btn btn-danger"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

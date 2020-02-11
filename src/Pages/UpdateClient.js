import React, { Component } from "react";
import uuid from "uuid/v4"
import Axios from "axios";

Axios.defaults.baseURL = "https://piyushelectronics.herokuapp.com/"

export default class extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      work: [],
      date: "",
      area: "",
      building: "",
      room: "",
      wing: "",
      mobile: "",
      editWorkTitle: "",
      editWorkDate: "",
      editIdx: "",
    }
  }

  componentDidMount = () => {
    const clientID = localStorage.getItem("clientID")
    Axios.get(`/client/${clientID}`)
      .then(({ data }) => {
        this.setState({ ...this.getClient(data) }, () => window.$('#work').DataTable())
      })
  }
  getClient = client => {
    const { _id, name, mobile, date, work, address: { area, building, wing, room } } = client;
    client = {
      id: _id,
      name: name,
      mobile: mobile,
      work: work,
      date: date,
      area: area,
      building: building,
      wing: wing,
      room: room
    }
    return client
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
  }

  handleSubmit = e => {
    if (e) e.preventDefault();
    const { name, area, building, mobile, date, work, wing, room, id } = this.state;
    if (mobile.toString().length !== 10) {
      alert("Incorrent Mobile No.");
      return;
    }
    Axios.put(`/client/${id}`, {
      name, mobile, date, work,
      address: { area, building, wing, room },
    })
      .then(_ => {
        if (e) {
          alert("Client Updated");
        }
      })
      .catch(err => console.log(err))
  }

  editWork = idx => {
    const work = this.state.work[idx];
    this.setState({ editWorkTitle: work.title, editWorkDate: work.date, editIdx: idx })
    window.$('#workModal').modal("show")
  }

  saveEditWork = () => {
    const { work, editIdx, editWorkTitle, editWorkDate } = this.state;
    const newWork = work.slice(0, work.length);
    newWork[editIdx] = {
      title: editWorkTitle,
      date: editWorkDate
    }
    this.setState({ work: newWork }, () => {
      window.$("#workModal").modal("hide");
      this.handleSubmit()
    })

  }

  render = () => {
    const { name, mobile, date, work, area, building, room, wing, editWorkTitle, editWorkDate } = this.state;
    return (
      <div className="row container-fluid mt-5">
        <div className="col-12 col-md-6 col-lg-4 m-auto">
          <form className="card px-1 py-3" onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
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
                  <button type="submit" className="btn btn-primary btn-block px-4">Add Client</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-6 col-lg-6 mx-auto">
          <table id="work" className="table table-hover">
            <thead>
              <tr>
                <th>Work</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {work.map(({ title, date }, idx) => {
                return (
                  <tr key={uuid()} style={{ cursor: "pointer" }} onClick={this.editWork.bind(this, idx)}>
                    <td>{title}</td>
                    <td>{date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="modal fade" id="workModal" tabIndex="-1" role="dialog" aria-labelledby="workModalLable" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="workModalLable">Edit Work</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="editWorkTitle"
                    value={editWorkTitle}
                    onChange={this.handleChange}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="editWorkDate"
                    value={editWorkDate}
                    onChange={this.handleChange}
                    placeholder="Date"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.saveEditWork}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
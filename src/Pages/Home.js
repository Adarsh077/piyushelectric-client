import React, { Component } from "react";
import Axios from "axios";
import uuid from "uuid/v4"

Axios.defaults.baseURL = "https://piyushelectronics.herokuapp.com/";

export default class extends Component {

  constructor() {
    super()
    this.state = {
      clients: []
    }
  }

  componentDidMount = () => {

    Axios.get("/client")
      .then(({ data }) =>
        this.setState({ clients: this.getClients(data) },
          () => window.$('#example').DataTable()
        )
      )
  }

  getClients = arr => {
    const clients = [];
    for (let client of arr) {
      const { _id, name, mobile, date, work, address: { area, building, wing, room } } = client;
      clients.push({
        id: _id,
        name: name,
        mobile: mobile,
        work: work,
        date: date,
        area: area,
        building: building,
        wing: wing,
        room: room
      })
    }
    return clients;
  }

  updateClient = idx => {
    const { clients } = this.state;
    localStorage.setItem("clientID", clients[idx].id);
    this.props.history.push('/updateclient')
  }

  render = () => {
    return (
      <div className="container mt-5">
        <table id="example" className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Date</th>
              <th className="d-none d-lg-table-cell">Address</th>
            </tr>
          </thead>
          <tbody>
            {this.state.clients.map((client, idx) => {
              const { name, mobile, date, area, wing, room, building } = client;
              return (
                <tr key={uuid()}
                  onClick={this.updateClient.bind(this, idx)}
                  style={{ cursor: "pointer" }}
                >
                  <td> {name} </td>
                  <td> {mobile} </td>
                  <td> {date} </td>
                  <td className="d-none d-lg-table-cell">
                    {`${wing}/${room}, ${building}, ${area}`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
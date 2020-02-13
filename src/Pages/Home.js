import React, { Component } from "react";
import uuid from "uuid/v4";
import { Axios } from "../Constants";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      clients: []
    };
  }

  componentDidMount = () => {
    Axios.get("/client").then(({ data }) =>
      this.setState({ clients: data }, () => window.$("#clients").DataTable())
    );
  };

  updateClient = idx => {
    const { clients } = this.state;
    localStorage.setItem("client", JSON.stringify(clients[idx]));
    this.props.history.push("/updateclient");
  };

  render = () => {
    return (
      <div className="container mt-5">
        <table id="clients" className="table table-hover">
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
              const {
                name,
                mobile,
                date,
                address: { area, wing, room, building }
              } = client;
              return (
                <tr
                  key={uuid()}
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
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
}

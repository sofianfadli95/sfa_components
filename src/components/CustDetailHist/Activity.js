import React, { Component } from "react";

export default class Activity extends Component {
  render() {
    const { date, status } = this.props;
    // console.log(items);
    return (
      <li
        className="list-group-item text-capitalize d-flex
            justify-content-between my-2"
      >
        <h6>{this.props.status}</h6>
        <h6>{this.props.date}</h6>
      </li>
    );
  }
}

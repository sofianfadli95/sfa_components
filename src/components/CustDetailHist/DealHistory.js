import React, { Component } from "react";

export default class DealHistory extends Component {
  render() {
    const { date, product_name, revenue } = this.props;
    // console.log(items);
    return (
      <li
        className="list-group-item text-capitalize d-flex
            justify-content-between my-2"
      >
        <h6>{this.props.date}</h6>
        <h6>{this.props.product_name + "Rp." + this.props.revenue + ",-"}</h6>
      </li>
    );
  }
}

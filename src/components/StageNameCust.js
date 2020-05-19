import React, { Component } from "react";

export default class StageNameCust extends Component {
  render() {
    const {
      id_transaction,
      id_customer,
      customer_name,
      onClickHandler,
    } = this.props;
    return (
      <li
        onClick={() =>
          this.props.onClickHandler(
            this.props.id_transaction,
            this.props.id_customer,
            this.props.customer_name
          )
        }
        className="list-group-item text-capitalize d-flex
            justify-content-between my-2"
      >
        {customer_name}
      </li>
    );
  }
}

import React, { Component } from "react";
import StageNameCust from "./StageNameCust";
import CustDetailHist from "./CustDetailHist/CustDetailHist";

export default class StageNameCustList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      id_sales: 0,
      id_status: 0,
      status: "",
      id_transaction: 0,
      id_customer: 0,
      customer_name: "",
      showCustDetailHist: false,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentWillMount() {
    this.getListData();
  }

  async getListData() {
    let status = "";
    const api_url =
      "https://sales-force-automation-2.herokuapp.com/sales/get/stg_customer_name/id_sales=" +
      this.props.id_sales +
      "/id_status=" +
      this.props.id_status;
    if (this.props.id_status === 1) {
      status = "Initial";
    } else if (this.props.id_status === 2) {
      status = "Identified";
    } else if (this.props.id_status === 3) {
      status = "Offering";
    } else if (this.props.id_status === 4) {
      status = "Negotiation";
    } else if (this.props.id_status === 5) {
      status = "Goal";
    } else {
      status = "Drop";
    }
    const response = await fetch(api_url);
    const all_data = await response.json();
    // customers = [...all_data];
    this.setState({
      customers: all_data,
      status: status,
    });
    // console.log(this.state.customers);
  }

  onClickHandler(id_transaction, id_customer, customer_name) {
    console.log(id_transaction);
    console.log(id_customer);
    console.log(customer_name);
    this.setState({
      id_transaction: id_transaction,
      id_customer: id_customer,
      customer_name: customer_name,
      showCustDetailHist: !this.state.showCustDetailHist,
    });
  }

  render() {
    const newCustomers = this.state.customers;
    return (
      <div>
        <ul className="list-group my-5">
          <h3 className="text-capitalize text-center">{this.state.status}</h3>
          {newCustomers.map((item) => {
            return (
              <StageNameCust
                key={item.id_transaction}
                id_transaction={item.id_transaction}
                id_customer={item.id_customer}
                customer_name={item.customer_name}
                onClickHandler={this.onClickHandler}
              />
            );
          })}
        </ul>
        {this.state.showCustDetailHist ? (
          <CustDetailHist
            id_customer={this.state.id_customer}
            id_transaction={this.state.id_transaction}
            cust_name={this.state.customer_name}
          />
        ) : null}
      </div>
    );
  }
}

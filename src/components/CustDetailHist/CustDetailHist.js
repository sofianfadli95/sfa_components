import React, { Component } from "react";
import Activity from "./Activity";
import DealHistory from "./DealHistory";

export default class CustDetailHist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id_customer: 0,
      id_transaction: 0,
      cust_name: "",
      activity: [],
      deal_history: [],
    };
  }

  componentWillMount() {
    this.getListData();
  }

  async getListData() {
    const api_url =
      "https://sales-force-automation-2.herokuapp.com/sales/get/customer_detail_history/id_customer=" +
      this.props.id_customer +
      "/id_transaction=" +
      this.props.id_transaction;
    const response = await fetch(api_url);
    const all_data = await response.json();
    // customers = [...all_data];
    // console.log(all_data.activity);
    this.setState({
      data: all_data,
      cust_name: this.props.cust_name,
      activity: all_data.activity,
      deal_history: all_data.deal_history,
    });
    // console.log(this.state.customers);
  }

  render() {
    const newData = this.state.data;
    const activity = this.state.activity;
    const deal_history = this.state.deal_history;
    return (
      <div className="App text-left">
        <h3 className="text-capitalize text-center">{this.state.cust_name}</h3>
        <p>
          CROSS SALES: <strong>{newData.cross_sales}</strong>
        </p>
        <p>
          PRODUCT PROSPECT: <strong>{newData.product_prospect}</strong>
        </p>
        <p>ACTIVITY</p>
        {activity.map((item) => {
          return <Activity date={item.date} status={item.status} />;
        })}
        <p>DEAL HISTORY</p>
        {deal_history.map((item) => {
          return (
            <DealHistory
              date={item.date}
              product_name={item.product_name}
              revenue={item.revenue}
            />
          );
        })}
      </div>
    );
  }
}

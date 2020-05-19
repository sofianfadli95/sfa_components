import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import StageNameCustList from "./StageNameCustList";

class CustomersStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      id_sales: 0,
      id_status: [],
      showStgNameCust: false,
      index_bar: 0,
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  async getChartData() {
    const id_status = [];
    const amount = [];
    const status = [];
    const api_url =
      "https://sales-force-automation-2.herokuapp.com/sales/dashboard/cust_stg_by_sales/id_sales=" +
      this.props.id_sales;
    const response = await fetch(api_url);
    const all_data = await response.json();
    for (let data of all_data) {
      // console.log(data);
      id_status.push(data.id_status);
      amount.push(parseFloat(data.amount));
      status.push(data.status);
    }
    this.setState({
      id_sales: this.props.id_sales,
      id_status: id_status,
      chartData: {
        labels: status,
        datasets: [
          {
            label: "Stage Prospects",
            backgroundColor: [
              "rgba(255, 99 , 132, 0.6)",
              "rgba(54, 162 , 235, 0.6)",
              "rgba(255, 206 , 86, 0.6)",
              "rgba(75, 192 , 192, 0.6)",
              "rgba(153, 102 , 255, 0.6)",
              "rgba(204, 69 , 164, 0.6)",
            ],
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: amount,
          },
        ],
      },
    });
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };

  render() {
    const index_bar = this.state.index_bar;
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          onElementsClick={(elements) => {
            let id_status = "";
            // console.log(elements[0]._index);
            const index = elements[0]._index;
            this.setState({
              showStgNameCust: !this.state.showStgNameCust,
              index_bar: index,
            });
          }}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Amount Customers in Each Stage",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
              labels: {
                fontColor: "#000",
              },
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Amount",
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Stage",
                  },
                },
              ],
            },
          }}
        />
        {this.state.showStgNameCust ? (
          <StageNameCustList
            id_sales={this.state.id_sales}
            id_status={this.state.id_status[index_bar]}
          />
        ) : null}
      </div>
    );
  }
}

export default CustomersStage;

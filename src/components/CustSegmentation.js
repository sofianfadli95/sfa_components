import React, { Component } from "react";
import { Bubble } from "react-chartjs-2";

class CustSegmentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      id_sales: 0,
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  async getChartData() {
    const id_cust_low = [];
    const num_of_purchase_low = [];
    const low_coordinate = [];

    const id_cust_medium = [];
    const num_of_purchase_medium = [];
    const medium_coordinate = [];

    const id_cust_high = [];
    const num_of_purchase_high = [];
    const high_coordinate = [];

    const api_url =
      "https://sales-force-automation-2.herokuapp.com/sales/dashboard/cust_own_by_sales/id_sales=" +
      this.props.id_sales;
    const response = await fetch(api_url);
    const all_data = await response.json();
    for (let data of all_data) {
      //console.log(data);
      if (data.segment === "low demand") {
        id_cust_low.push(data.id_cust);
        num_of_purchase_low.push(data.num_of_purchase);
        low_coordinate.push({ x: data.min_purchase, y: data.income });
      } else if (data.segment === "medium demand") {
        id_cust_medium.push(data.id_cust);
        num_of_purchase_medium.push(data.num_of_purchase);
        medium_coordinate.push({ x: data.min_purchase, y: data.income });
      } else {
        id_cust_high.push(data.id_cust);
        num_of_purchase_high.push(data.num_of_purchase);
        high_coordinate.push({ x: data.min_purchase, y: data.income });
      }
    }
    this.setState({
      chartData: {
        labels: "Customer Segmentation",
        datasets: [
          {
            label: "Low Segmentation",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: low_coordinate,
          },
          {
            label: "Medium Segmentation",
            fill: false,
            backgroundColor: "rgba(124,252,0,0.4)",
            pointBorderColor: "rgba(124,252,0,0.4)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(124,252,0,0.4)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: medium_coordinate,
          },
          {
            label: "High Segmentation",
            fill: false,
            backgroundColor: "rgba(255,215,0,0.4)",
            pointBorderColor: "rgba(255,215,0,0.4)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,215,0,0.4)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: high_coordinate,
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
    return (
      <div className="chart">
        <Bubble
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Number of Products Sold",
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
                    labelString: "Income",
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Min. Purchase",
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default CustSegmentation;

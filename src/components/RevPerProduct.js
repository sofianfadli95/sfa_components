import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class RevPredictProducts extends Component {
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
    const products_name_rev = [];
    const products_rev = [];
    const api_url_rev =
      "https://sales-force-automation-2.herokuapp.com/sales/dashboard/rev_per_sales/id_sales=" +
      this.props.id_sales;
    const response_rev = await fetch(api_url_rev);
    const all_data_rev = await response_rev.json();
    for (let data of all_data_rev) {
      // console.log(data);
      products_name_rev.push(data.product_name);
      products_rev.push(data.total_revenue);
    }
    const products_predict = [];
    const api_url_predict =
      "https://sales-force-automation-2.herokuapp.com/sales/dashboard/predicted_per_sales/id_sales=" +
      this.props.id_sales;
    const response_predict = await fetch(api_url_predict);
    const all_data_predict = await response_predict.json();
    for (let data of all_data_predict) {
      // console.log(data);
      products_predict.push(data.total_predict_rev);
    }
    this.setState({
      chartData: {
        labels: products_name_rev,
        datasets: [
          {
            label: "Product Sales Profits",
            data: products_rev,
            backgroundColor: [
              "rgba(255, 99 , 132, 0.6)",
              "rgba(54, 162 , 235, 0.6)",
              "rgba(255, 206 , 86, 0.6)",
              "rgba(75, 192 , 192, 0.6)",
              "rgba(153, 102 , 255, 0.6)",
              "rgba(204, 69 , 164, 0.6)",
              "rgba(173, 255 , 47, 0.6)",
              "rgba(218, 112 , 214, 0.6)",
              "rgba(255, 165 , 0, 0.6)",
              "rgba(50, 205 , 50, 0.6)",
              "rgba(255, 160 , 122, 0.6)",
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
          {
            label: "Product Predict Profits",
            data: products_predict,
            backgroundColor: [
              "rgba(255, 99 , 132, 0.6)",
              "rgba(54, 162 , 235, 0.6)",
              "rgba(255, 206 , 86, 0.6)",
              "rgba(75, 192 , 192, 0.6)",
              "rgba(153, 102 , 255, 0.6)",
              "rgba(204, 69 , 164, 0.6)",
              "rgba(173, 255 , 47, 0.6)",
              "rgba(218, 112 , 214, 0.6)",
              "rgba(255, 165 , 0, 0.6)",
              "rgba(50, 205 , 50, 0.6)",
              "rgba(255, 160 , 122, 0.6)",
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
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
        <Bar
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
                    labelString: "Profit",
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

export default RevPredictProducts;

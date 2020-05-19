import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

class ProductToCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      id_product: 0,
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  async getChartData() {
    const segmentation = [];
    const percentage = [];
    const api_url =
      "https://sales-force-automation-2.herokuapp.com/sales/dashboard/product_cust_segment/id_product=" +
      this.props.id_product;
    const response = await fetch(api_url);
    const all_data = await response.json();
    for (let data of all_data) {
      // console.log(data);
      segmentation.push(data.segmentation);
      percentage.push(parseFloat(data.percentage));
    }
    this.setState({
      chartData: {
        labels: segmentation,
        datasets: [
          {
            label: "Customer Segmentation",
            backgroundColor: [
              "rgba(255,215,0,0.4)",
              "rgba(75,192,192,0.4)",
              "rgba(124,252,0,0.4)",
            ],
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: percentage,
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
        <HorizontalBar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Product Sales to Each Customer Segmentation",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
              labels: {
                fontColor: "#000",
              },
            },
          }}
        />
      </div>
    );
  }
}

export default ProductToCustomer;

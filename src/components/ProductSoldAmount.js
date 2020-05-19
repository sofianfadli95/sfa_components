import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class ProductSoldAmount extends Component {
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
    const products_name = [];
    const products_amount = [];
    const api_url =
      "https://sales-force-automation-2.herokuapp.com/sales/dashboard/amount_products/id_sales=" +
      this.props.id_sales;
    const response = await fetch(api_url);
    const all_data = await response.json();
    for (let data of all_data) {
      //console.log(data);
      products_name.push(data.product_name);
      products_amount.push(data.amounts);
    }
    console.log(products_name);
    console.log(products_amount);
    this.setState({
      chartData: {
        labels: products_name,
        datasets: [
          {
            label: "Number of Products Sold",
            data: products_amount,
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
        <Pie
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
          }}
        />
      </div>
    );
  }
}

export default ProductSoldAmount;

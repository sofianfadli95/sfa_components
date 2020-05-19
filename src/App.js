import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductSoldAmount from "./components/ProductSoldAmount";
import RevPredictProducts from "./components/RevPerProduct";
import CustSegmentation from "./components/CustSegmentation";
import ProductToCustomer from "./components/ProductToCustomer";
import CustomersStage from "./components/CustomersStage";
import StageNameCustList from "./components/StageNameCustList";
import CustDetailHist from "./components/CustDetailHist/CustDetailHist";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <ProductSoldAmount id_sales={5} />
          <RevPredictProducts id_sales={5} />
          <CustSegmentation id_sales={5} />
          <ProductToCustomer id_product={2} />
          <CustomersStage id_sales={2} />
        </p>
      </div>
    );
  }
}

export default App;

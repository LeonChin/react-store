import React, { Component } from "react";
import Products from "../../components/Products/Products";
import { Layout } from "../../utility/Layout";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Products />
      </Layout>
    );
  }
}

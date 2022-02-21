import { React, useEffect, useState } from "react";
import { ToolBox } from "../ToolBox/ToolBox";
import { Product } from "../Product/Product";
import axios from "../../utility/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Panel } from "../Panel/Panel";
import "./style.scss";
import PubSub from "pubsub-js";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [shoes, setShoes] = useState([]);
  const [sourceShoes, setSourceShoes] = useState([]);
  // const url = "http://localhost:3004/products";
  const [rerender, setRerender] = useState(false);
  const [cartNum, setCartNum] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/products");
      setLoading(false);
      setShoes(response.data);
      setSourceShoes(response.data);
      updateCartNum();
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const myToken = (msg, data) => {
    switch (msg) {
      case "rerender":
        setRerender(data);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    PubSub.subscribe("rerender", myToken);
  });

  if (rerender) {
    fetchData();
    setRerender(false);
  }

  const search = (text) => {
    let _products = [...sourceShoes];

    let newProducts = _products.filter((p) => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return !!matchArray;
    });

    setShoes(newProducts);
  };

  const toAdd = () => {
    PubSub.publish("open", true);
  };

  const updateCartNum = async () => {
    const cartNum = await initCartNum();
    setCartNum(cartNum);
    console.log(cartNum);
  };

  const initCartNum = async () => {
    const response = await axios.get("/carts");
    const carts = response.data || [];
    const carNum = carts
      .map((cart) => cart.mount)
      .reduce((a, value) => a + value, 0);
    return carNum;
  };

  return (
    <div>
      <ToolBox search={search} cartNum={cartNum} />
      <div className="products">
        <div className="columns is-multiline is-desktop">
          <TransitionGroup component={null}>
            {shoes.map((shoe) => {
              return (
                <CSSTransition
                  classNames="product-fade"
                  timeout={300}
                  key={shoe.id}
                >
                  <div key={shoe.id} className="colum is-3">
                    <Product {...shoe} updateCartNum={updateCartNum} />
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
        {(global.auth.getUser() || {}).type === 1 && (
          <button className="button is-primary add-btn" onClick={toAdd}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
